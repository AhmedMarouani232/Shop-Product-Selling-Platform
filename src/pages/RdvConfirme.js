import React, { useState} from "react";
import SideBar from "../components/SideBar";
import ButtonField from "../components/Button";
import styled from "styled-components";
import verifyAuth from "../components/VerifyAuth";
import { useSelector } from 'react-redux';
import ToggleButton from "../components/ToggleButton"; // Import the new component
import { convertTimeRange } from "../utils";
import { getDevisSummary } from "../app/services/DevisServices";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaClipboard } from 'react-icons/fa'; // Import clipboard icon

import { getDevisPdf } from "../app/services/DevisServices";

const Container = styled.div`
    display: flex;
    width: 190%;
    padding: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    flex-shrink: 0;
    align-self: stretch; 
    border-radius: 16px;
    background: var(--White, #FFF);
    /* Box shadow */
    box-shadow: 2px 2px 16px 0px rgba(0, 51, 204, 0.08); 
    margin-left : -15%;
    @media (max-width: 1025px) {
        margin: 1% 2%;
        width: 100%;
        flex-direction: column;
    }
    FaClipboard {
        margin-left: 8px;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    FaClipboard:hover {
        color: #007bff;
    }

`
const TitleContainer = styled.div`
    display: flex;
    gap: 24px; 
    align-items: center;
`
const Title = styled.p`
    color: var(--Valid-100, #45BC06);
    /* Titre / H3 */
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.44px; 
    margin-top: 2%;

`
const TitleIcon = styled.img`
    border-radius: 72px;
    background: var(--Valid-100, #45BC06); 
    padding: 12px; 
    gap: 12px; 
`
const RdvContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  margin-top: -3%;
  margin-bottom: -3%;
`;

const RdvDate = styled.p`
  color: var(--Dark-100, #333);
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.48px; 
`;

const BorneTextContainer = styled.div`
    display: flex;
    margin-top: 10%;
    justify-content: center;
    @media (max-width: 1025px) {
        flex-direction: column;
        margin-top : 46%;
    }
    @media (max-width: 480px) {
        margin-top : 96%;
    }

`
const BorneFrame = styled.div`
    display: flex;
    justify-content: center;
    gap : 40px;
    margin-bottom: 30px;
`

const BorneContainer = styled.div`
    display: flex;
    height: 388px;
    padding: 16px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    border-radius: 8px;
    background: var(--Light-Shadow-100, #F5F6FA);
    /* Bax Shadow +1 */
    box-shadow: 4px 4px 16px 0px rgba(0, 17, 68, 0.25); 
    width:72%;
`

const BorneTitle = styled.p`
    color: var(--Dark-100, #333);
    text-align: center;
    /* Titre / H5 */
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.4px; 
`

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1 0 0; 
`
const Paragraph = styled.p`
    color: var(--Dark-80, rgba(51, 51, 51, 0.80));
    /* Body Regular / +1 */
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21.8px; /* 121.111% */
    letter-spacing: 0.36px; 
`
const Informations = styled.p`
    color: var(--Dark-80, rgba(51, 51, 51, 0.80));
    /* Titre / H3 */
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.44px; 
    display: flex;
    align-self: stretch; 
`

const Label = styled.p`
    color: var(--Dark-80, rgba(51, 51, 51, 0.80));
    /* Body Bold / +1 */
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.36px; 
`
const Value = styled.p`
    color: var(--Dark-80, rgba(51, 51, 51, 0.80));
    /* Body Regular / +1 */
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21.8px;
    letter-spacing: 0.36px; 
`
const InfoContainer = styled.div`
    display: flex;
    align-self: stretch; 
`
const ButtonContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    gap : 40px;

`;


const RdvConfirme = () => {
    const dispatch = useDispatch();
    const selectedTimeSlot = useSelector((state) => state.timeSlots.selectedTimeSlot);
    const quizResponse = useSelector((state) => state.questions.quizResponse?.data);
    const devisRef = quizResponse?.devis_data?.devis_ref;
    const client = useSelector((state) => state.client);
    const BorneType = useSelector((state) => state.borneType.BorneType);

    const startTime = selectedTimeSlot.start;
    const endTime = selectedTimeSlot.end;

    const formattedTimeRange = convertTimeRange(startTime, endTime);

    let src = "images/Qobox_mini_cable.png";
    let image_type = "Qobox_mini";
    let image_title = "Qobox mini avec cable atachée";
    if(BorneType === "Câble attaché" || BorneType === "Qobox mini Câble attaché"){
        image_type = "Qobox_mini_cable";
        src="images/Qobox_mini_cable.png";
        image_title = "Qobox mini Cable ataché";
    }else if(BorneType === "Prise T2S" || BorneType === "Qobox mini Prise T2S"){
        image_type = "Qobox_mini";
        src="images/Qobox_mini.png";
        image_title = "Qobox mini Prise T2S";
    }else{
        // Default to cable image if BorneType is undefined or unknown
        image_type = "Qobox_mini_cable";
        src="images/Qobox_mini_cable.png";
        image_title = "Qobox mini Cable ataché";
    }    
    const navigate = useNavigate();

    const onSubmit = () => {
        if (devisRef) {
            let data = {
                devisRef : devisRef ,
                image_type : image_type
            }
            dispatch(getDevisSummary( data )); 
        } else {
            console.warn('Devis reference not available for summary generation');
        }
    };
    const onPrintEstimation = () => {
        if (devisRef) {
            dispatch(getDevisPdf( devisRef )); 
        } else {
            console.warn('Devis reference not available for PDF generation');
        }
    };
    const onSubmitt = () => {
        navigate("/dashboard");

    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert("Estimation reference copied to clipboard!");
        }, () => {
            alert("Failed to copy");
        });
    };

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    return (
        <>
        <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
        <Container>
          <SideBar isOpen={isSideBarOpen} />
            <TitleContainer>
                <TitleIcon src="images/Valider.svg"></TitleIcon>
                <Title>Rendez-vous confirmé</Title>
            </TitleContainer>

            <RdvContainer>
                <RdvDate>{formattedTimeRange}</RdvDate>
            </RdvContainer>

            <BorneTextContainer>
                <BorneFrame>
                    <BorneContainer>
                    <img alt="avec_cable" src={src}/>
                    <BorneTitle>{image_title}</BorneTitle>
                    </BorneContainer>
                </BorneFrame>
                <TextContainer>
                    <Paragraph>
                        Une confirmation par email vous a été envoyée. Vous recevrez un appel d'un partenaire Ahmed pendant le créneau horaire convenu 
                        afin d'effectuer le rendez-vous téléphonique.
                    </Paragraph>
                    <Informations>
                        Informations :
                    </Informations>
                    <InfoContainer>
                        <Label>Estimation&nbsp;:&nbsp; </Label>
                        <Value>{devisRef}</Value>
                        <FaClipboard 
                            style={{ cursor: 'pointer', marginLeft: '8px' }} 
                            onClick={() => copyToClipboard(devisRef)} 
                            title="Copy to clipboard" 
                        />
                    </InfoContainer>
                    <InfoContainer>
                        <Label>Nom et prénom&nbsp;:&nbsp;</Label>
                        <Value>{client.firstName} {client.lastName}</Value>
                    </InfoContainer>
                    <InfoContainer>
                        <Label>Email&nbsp;:&nbsp;</Label>
                        <Value>{client.email}</Value>
                    </InfoContainer>
                    <InfoContainer>
                        <Label>Téléphone&nbsp;:&nbsp;</Label>
                        <Value>{client.phoneNumber}</Value>
                    </InfoContainer>
                    <InfoContainer>
                        <Label>Adresse&nbsp;:&nbsp;</Label>
                        <Value>{client.address} {client.postcode} {client.city}</Value>
                    </InfoContainer>
                </TextContainer>
            </BorneTextContainer>
            <ButtonContainer>
                <ButtonField onClick={onSubmit} type="submit" variant="primary" >Imprimer le récapitulatif</ButtonField>
            </ButtonContainer>
            <ButtonField onClick={onSubmitt} type="submit" variant="secondary" >Terminer</ButtonField>

        </Container>
        </>
    )
}
export default verifyAuth(RdvConfirme);