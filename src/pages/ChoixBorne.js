import React, { useState } from "react";
import styled, { css } from "styled-components";
import ButtonField from "../components/Button";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import verifyAuth from "../components/VerifyAuth";
import ToggleButton from "../components/ToggleButton"; // Import the new component
import { BorneType } from "../app/services/QuestionService";

import { useDispatch } from 'react-redux';


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
    flex: 1 0 0; 
    border-radius: 8px;
    background: var(--Light-Shadow-100, #F5F6FA);
    /* Bax Shadow +1 */
    box-shadow: 4px 4px 16px 0px rgba(0, 17, 68, 0.25); 
    cursor: pointer;
    ${({active}) => active && css`
        border: 2px solid var(--Secondary-80, rgba(0, 51, 204, 0.80)); 
    `
    }

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
    @media (max-width: 1025px) {
        flex-direction: column;
    }
`
const BorneImage = styled.img`
    display: flex;
    justify-content: center;
    align-items: center; 
    padding : 62px 0px ;
`
const Arrow = styled.a`
    margin-right: 95%;
    margin-top: -13%;
`;

const ChoixBorne = () => {
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onsubmit = () =>{
        dispatch(BorneType(indexx));

        navigate("/emplacementBorne")
    }

    const [indexx, setIndexx] = useState();

    const handleClick = (index)=>{
        setIndexx(index);
    }
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    return (
        <>
          <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
          <Container>
            <SideBar isOpen={isSideBarOpen} />
            <Title>Choix du modèle de borne</Title>
            <Arrow href="/adressecomplete"><img src="images/Arrow.svg" alt="Arrow" /></Arrow>

            <BorneFrame>
                <BorneContainer active={indexx ===0} onClick={()=>{handleClick(0)}}>
                    <img alt="avec_cable" src="images/Qobox_mini_cable.png"/>
                    <BorneTitle>Qobox mini avec câble attaché</BorneTitle>
                </BorneContainer>
                <BorneContainer active={indexx ===1} onClick={()=>{handleClick(1)}}>
                    <BorneImage alt="sans_cable" src="images/Qobox_mini.png" />
                    <BorneTitle>Qobox mini avec prise T2S</BorneTitle>
                </BorneContainer>
            </BorneFrame>
            <ButtonField onClick={onsubmit} type="submit" variant="primary" >Suivant</ButtonField>
        </Container>
        </>
    )
}

export default verifyAuth(ChoixBorne);