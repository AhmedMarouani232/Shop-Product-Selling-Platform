import React from "react";
import Input from "../components/Input";
import ButtonField from "../components/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import verifyAuth from "../components/VerifyAuth";



const StyledInputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row; 
    align-items: center; 
    justify-content: center;
    input {
        width: 593px;
    }
`;
const ButtonContainer = styled.div`
    margin-bottom : 30%;
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
    text-align : center;
    margin-top : 20%;
`
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
`
function RechercheCompteur(){
    const nav = useNavigate()
    const onsubmit = () =>{
        nav("/choixBorne");
    }

    return(
        <Container className="d-flex justify-content-center">
            <SideBar></SideBar>
            <Title>Saisir votre adresse</Title>
            <StyledInputWrapper>
                <Input type="text" placeholder="123 rue de la paix, 75001 Paris" name="nom" required label="Adresse" />
            </StyledInputWrapper>
            <ButtonContainer>
                <ButtonField onClick={onsubmit} type="submit" variant="secondary">Adresse introuvable </ButtonField>
            </ButtonContainer>
        </Container>
    )
}

export default verifyAuth(RechercheCompteur);