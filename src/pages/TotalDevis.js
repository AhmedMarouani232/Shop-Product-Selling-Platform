import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "../components/SideBar";
import ButtonField from "../components/Button";
import { useNavigate } from "react-router-dom";
import verifyAuth from "../components/VerifyAuth";
import ToggleButton from "../components/ToggleButton";
import { useDispatch, useSelector } from 'react-redux';
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
const Title = styled.p`
    color: var(--Tertiary-100, #C7B299);
    /* Titre / H3 */
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.44px; 
    margin-left: 10%
    text-align: center;

    @media (max-width: 1025px) {
        margin-left: 15%;
    }
`

const UnderTitle = styled.p`
    color: var(--Dark-60, rgba(51, 51, 51, 0.60));
    /* Body Regular / +1 */
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21.8px; /* 121.111% */
    letter-spacing: 0.36px; 
    margin-top: -5%;
`
const Arrow = styled.a`
    margin-left: -12%;
    margin-top: -2%;
    @media (max-width: 1025px) {
        margin-left: -5%;
    }
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
const BorneFrame = styled.div`
    display: flex;
    justify-content: center;
    gap : 40px;
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`

const TextContainer = styled.div`
    display: flex;
    padding: 0px 40px;
    flex-direction: column;
    align-items: center;
    flex: 1 0 0; 
    @media (max-width: 1025px) {
        margin-top: 50px;
        gap: 10px;
    }
`

const OutlineButton = styled.button`
    display: flex;
    height: 68px;
    padding: 24px;
    justify-content: center;
    align-items: center;
    gap: 16px; 
    color: var(--Secondary-100, #03C);
    /* CTA/Big */
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.48px; 
    border: 2px solid var(--Secondary-100, #03C); 
    border-radius: 8px; 
    background: var(--Secondary-1, rgba(0, 51, 204, 0.01)); 
`
const BorneTextContainer = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 1025px) {
        flex-direction: column;
    }
`

const Text = styled.p`
    color: var(--Dark-100, #333);
    /* Body Regular / +2 */
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.4px; 
    text-align: center;
    margin-bottom: 8px;
`
const Price = styled.p`
    color: var(--Dark-100, #333);
    /* Titre / H6 */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.32px; 
    text-align: center;
    margin-bottom: 4px;

`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
`
const Big = styled.span`
    color: var(--Dark-100, #333);
    /* Titre / H3 */
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.44px; 
    margin-left : 10px;
    text-align: center;

`
const UnderPrice = styled.p`
    color: var(--Dark-100, #333);
    text-align: center;
    /* Body Regular / 0 */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 18.4px; /* 115% */
    letter-spacing: 0.32px; 
    text-align: center;
    margin-bottom: 1%;
`
const SmallText = styled.p`
    color: var(--Dark-100, #333);
    /* Body Regular / -3 */
    font-family: Montserrat;
    font-size: 10px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0.2px; 
    text-align: center;
`
const DevisContent = styled.p`
    color: #000;
    /* Body Regular / -1 */
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 114.286% */
    letter-spacing: 0.28px; 
    margin-bottom : 8px;
`
const DevisContainer = styled.div`
    width: 371px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10%;
`

function TotalDevis(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const quizResponse = useSelector((state) => state.questions.quizResponse?.data);
    const BorneType = useSelector((state) => state.borneType.BorneType);
    
    // Add safety checks for quizResponse and devis_data
    if (!quizResponse || !quizResponse.devis_data) {
        console.warn('Quiz response or devis_data is not available:', quizResponse);
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>Chargement en cours...</h2>
                <p>Veuillez patienter pendant que nous calculons votre devis.</p>
            </div>
        );
    }
    
    // Add safety check for BorneType
    if (!BorneType) {
        console.warn('BorneType is not available:', BorneType);
    }
    console.log('TotalDevis - BorneType:', BorneType);
    console.log('TotalDevis - quizResponse:', quizResponse);
    
    const montant_ttc = parseFloat(quizResponse.devis_data.montant_ttc.toFixed(2));
    const ttc_reduit = parseFloat(montant_ttc) + parseFloat(quizResponse.devis_data.montant_cibre.toFixed(2));

    const onsubmit = () => {
        navigate("/choixrdv");
    }

    const onSubmitPrint = () => {
        if (quizResponse.devis_data && quizResponse.devis_data.devis_ref) {
            dispatch(getDevisPdf(quizResponse.devis_data.devis_ref));
        } else {
            console.warn('Devis reference not available for PDF generation');
        }
    }


    let src = "images/Qobox_mini_cable.png";

    if(BorneType === "Câble attaché" || BorneType === "Qobox mini Câble attaché"){
        src="images/Qobox_mini_cable.png";
    }else if(BorneType === "Prise T2S" || BorneType === "Qobox mini Prise T2S"){
        src="images/Qobox_mini.png";
    }else{
        // Default to cable image if BorneType is undefined or unknown
        src="images/Qobox_mini_cable.png";
    }
    return (
        <>
          <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
          <Container>
            <SideBar isOpen={isSideBarOpen} />
            <TitleContainer>
                <Arrow href="/emplacementBorne"><img src="images/Arrow.svg"></img></Arrow>
                <Title>Total de votre estimation</Title>
            </TitleContainer>
            <UnderTitle>Sous réserve de confirmation lors de votre rendez-vous téléphonique</UnderTitle>
            <BorneTextContainer>
                <BorneFrame>
                    <BorneContainer>
                        <img alt="avec_cable" src={src}/>
                        <BorneTitle>{BorneType}</BorneTitle>
                    </BorneContainer>
                </BorneFrame>
                <TextContainer>
                    <Text>  {montant_ttc.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €
                         <span style={{fontSize: "12px" }}> TTC</span></Text>
                    <Price>
                        soit <Big>{ttc_reduit.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</Big> TTC
                        </Price>    
                     <UnderPrice>CIBRE déduit </UnderPrice>
                    <SmallText>Crédit d'impôt pour l'acquisition et la pose d'un système de charge pour véhicule électrique (sous réserve d'éligibilité)</SmallText>
                    <DevisContainer>
                        <ul>
                        {quizResponse.line_devis_data && Array.isArray(quizResponse.line_devis_data) && quizResponse.line_devis_data.map((article) => (
                                <li key={article.id}>
                                    <DevisContent >{article.quantite} x {article.description_article} </DevisContent>
                                </li>
                            ))}
                        </ul>
                    </DevisContainer>
                </TextContainer>
            </BorneTextContainer>
            <ButtonContainer>
                <OutlineButton onClick={onSubmitPrint} className="btn btn-outline-primary"> Imprimer</OutlineButton>
                <ButtonField onClick={onsubmit} type="submit" variant="primary" >Continuer</ButtonField>
            </ButtonContainer>
        </Container>
        </>
    )
}
export default verifyAuth(TotalDevis);