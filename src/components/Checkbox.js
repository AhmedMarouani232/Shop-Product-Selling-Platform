import React from "react";
import SideBar from "../components/SideBar";
import styled from 'styled-components'
import Creneau from "../components/Creneau";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
`;

const Title = styled.p`
    color: var(--Tertiary-100, #C7B299);
    /* Titre / H3 */
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.44px; 
    text-align : center;
`;

const CrenauxLable = styled.p`
    display: flex;
    padding: 4px 0px;
    align-items: center;
    gap: 8px;
    align-self: stretch; 
    border-bottom: 1px solid var(--Secondary-20, rgba(0, 51, 204, 0.20)); 
    color: var(--Dark-100, #333);
    /* Titre / H4 */
    font-family: Montserrat;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.48px; 
`;

const CreneauContainer = styled.div`
    display: flex;
    justify-content: flex-start; 
    align-items: center;
    gap: 16px; 
    width: 100%; 
    margin-top: -32px;
`;

function ChoixRDV() {
    const navigate = useNavigate(); // Initialize useNavigate

    return (
        <Container>
            <SideBar></SideBar>
            <Title>Prise de rendez-vous pour la visite technique virtuelle</Title>
            <CrenauxLable>Lundi 27 mai 2024</CrenauxLable>
            <CreneauContainer>
                <Creneau start={"08:00"} end={'12:00'}></Creneau>
                <Creneau start={'10:00'} end={'15:00'}></Creneau>
                <Creneau start={'12:00'} end={'18:00'}></Creneau>
            </CreneauContainer>
            <CrenauxLable>Lundi 27 mai 2024</CrenauxLable>
            <CreneauContainer>
                <Creneau start={"08:00"} end={'12:00'}></Creneau>
                <Creneau start={'10:00'} end={'15:00'}></Creneau>
                <Creneau start={'12:00'} end={'18:00'}></Creneau>
            </CreneauContainer>
            <CrenauxLable>Lundi 27 mai 2024</CrenauxLable>
            <CreneauContainer>
                <Creneau start={"08:00"} end={'12:00'}></Creneau>
                <Creneau start={'10:00'} end={'15:00'}></Creneau>
                <Creneau start={'12:00'} end={'18:00'}></Creneau>
            </CreneauContainer>
        </Container>
    );
}

export default ChoixRDV;
