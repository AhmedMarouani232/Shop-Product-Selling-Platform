import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ButtonField from '../components/Button';
import SideBar from '../components/SideBar';
import verifyAuth from "../components/VerifyAuth";
import ToggleButton from "../components/ToggleButton"; // Import the new component
import { intervention } from "../app/services/PraxedoServices";
import { useDispatch, useSelector } from 'react-redux';
import { convertTimeRange } from '../utils';


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
  box-shadow: 2px 2px 16px 0px rgba(0, 51, 204, 0.08); 
  margin-left: -15%;
  @media (max-width: 1025px) {
    margin: 1% 2%;
    width: 100%;
    flex-direction: column;
  }
`;

const Title = styled.p`
  color: var(--Tertiary-100, #C7B299);
  font-family: Montserrat;
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.44px; 
  text-align: center;
`;

const AllContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
  align-self: stretch; 
  margin-top: 10%;
  @media (max-width: 480px) {
    margin-top : 35%;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex: 1 0 0; 
  width: 363px;
`;


const RdvDate = styled.p`
  color: var(--Dark-100, #333);
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.48px; 
  @media (max-width: 480px) {
    text-align: center;
  }
`;

const Prepare = styled.div`
  display: flex;
  padding: 0px 40px;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  align-self: stretch; 
  text-align: center;
`;

const RdvContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
`;

const PrepareTitle = styled.p`
  color: var(--Dark-100, #333);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.4px; 
  text-align: center;

`;

const PrepareSubTitle = styled.p`
  color: var(--Dark-100, #333);
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 18.4px;
  letter-spacing: 0.32px; 
`;


const Arrow = styled.a`
    display : flex;
    align-items: center; 
    justify-content: left;
    margin-right: 100%;
    margin-top : -15%;
      @media (max-width: 480px) {
            margin-top : -60%;
      }
`;
const UnderTitle = styled.p`
    color: var(--Dark-60, rgba(51, 51, 51, 0.60));
    /* Body Regular / +1 */
    font-family: Montserrat;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 21.8px; /* 121.111% */
    letter-spacing: 0.36px; 
    margin-top: 1%;
    margin-bottom: -5%;
    text-align: center;
`


function RDV() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedTimeSlot = useSelector((state) => state.timeSlots.selectedTimeSlot);
    const quizResponse = useSelector((state) => state.questions.quizResponse?.data);
    const devisId = quizResponse?.devis_data?.devis_id;
    const devis_reference = quizResponse?.devis_data?.devis_ref;

    const startTime = selectedTimeSlot.start;
    const endTime = selectedTimeSlot.end;

    const formattedTimeRange = convertTimeRange(startTime, endTime);

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const praxedoVariables = {
      from_time : startTime,
      to_time: endTime
    }

    const onsubmit = () => {
      if (devisId && devis_reference) {
        dispatch(intervention({id: devisId, praxedoVariables: praxedoVariables, devis_reference: devis_reference}));
        navigate("/rdvConfirme");
      } else {
        console.warn('Devis ID or reference not available');
      }
    }

    return (
    <>
    <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
    <Container>
      <SideBar isOpen={isSideBarOpen} />

      <Title>Votre rendez-vous téléphonique</Title>
      <Arrow href="/choixRdv"><img src="images/Arrow.svg" alt="Arrow" /></Arrow>
                      <UnderTitle>un partenaire Ahmed vous contactera le jour et pendant le créneau horaire suivant </UnderTitle>

      <AllContainer>
        <LeftContainer>
          <RdvContainer>
            <RdvDate>{formattedTimeRange}</RdvDate>
          </RdvContainer>
          <Prepare>
            <PrepareTitle>Comment préparer votre rendez-vous ?</PrepareTitle>
            <PrepareSubTitle>
            Lors de votre rendez-vous téléphonique, assurez-vous d'être présent sur le lieu d'installation et d'avoir accès à votre compteur Linky            </PrepareSubTitle>
          </Prepare>
        </LeftContainer>
      </AllContainer>
      <ButtonField onClick={onsubmit} type="submit" variant="primary" >Je confirme ce créneau</ButtonField>
    </Container>
    </>
  );
}

export default verifyAuth(RDV);
