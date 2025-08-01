import React from "react";
import styled from "styled-components";
import ButtonField from "../components/Button";
import SideBar from "../components/SideBar";
import Question from "../components/Question";
import { useNavigate } from "react-router-dom";
import verifyAuth from "../components/VerifyAuth";

const Container = styled.div`
    display: flex;
    width: 190%;
    padding: 40px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 64px;
    flex-shrink: 0;
    align-self: stretch; 
    border-radius: 16px;
    background: var(--White, #FFF);
    /* Box shadow */
    box-shadow: 2px 2px 16px 0px rgba(0, 51, 204, 0.08); 
    margin-left : -15%;
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
    margin-left: 30%
`
const Arrow = styled.a`
    margin-left: -40%;
    margin-top: -11%;

`
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`

function Internet(){
   
    const navigate = useNavigate();
    const onsubmit = () =>{
        navigate("/emplacementBorne")
    }
    const responses = [
        "Oui",
        "Non"
    ]

    return(
        <Container>
            <SideBar></SideBar>
            <TitleContainer>
                <Arrow href="/choixBorne"><img alt="borne" src="images/Arrow.svg"></img></Arrow>
                <Title>Connexion internet</Title>
            </TitleContainer>
            <Question label={"Est-ce que votre Wifi porte au niveau de l'emplacement souhaité de votre borne ?"}
                multiple={"multiple"}
                responses={responses}
                question_type={"DROPDOWN"}
            ></Question>
            <ButtonField onClick={onsubmit} type="submit" variant="primary" >Suivant</ButtonField>
        </Container>
    )
}

export default verifyAuth(Internet);