import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import Logout from "./Logout";
import { resetUserPending } from '../app/reducers/userPendingReducer';
import { clearClient } from '../app/reducers/ClientReducer';
import { clearQuiz } from '../app/reducers/quizDataReducer';
import { getCurrentStore } from "../app/services/MagasinServices"


const Container = styled.div`
  display: flex;
  width: 16%;
  padding: 48px 16px;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  background: var(--Primary-100, #FFF);
  box-shadow: 2px 2px 16px 0px rgba(0, 51, 204, 0.08);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  transition: transform 0.3s ease-in-out;
  z-index: 1000; /* Ensures it's on top */
  @media (max-width: 1025px) {
    width: 40%;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
  @media (max-width: 480px) {
    width: 90%;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  }
`;

const Logo = styled.img`
  display: flex;
  width: 100%;
  height: 144px;
  padding: 31.5px 37.734px 31.5px 37.748px;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
`;

const Menu = styled.div`
  display: flex;
  padding: 16px 0px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-bottom: 1px solid var(--Light-grey-3, #E5EBFA);
    @media (max-width: 1025px) {
      align-self: center;
      width: 100%;
  }
`;

const DevisMenue = styled.div`
  display: flex;
  margin-top: 40%;
  height: 100%;
  flex-direction: column;
  justify-content: center; 
  gap: 8px;
  align-self: stretch;
  margin-bottom: 31%;
  @media (max-width: 1025px) {
    margin-bottom: -21%;
    
  }
`;

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch; 
    
`;

const PaddedImage = styled.img`
  padding-left : 13%;
  padding-right : 3%;

`;
const PaddedMagasinImage = styled.img`
  width: 25px;
  height: 25px;
  padding-top : 1%;
  padding-bottom: 1%;
  margin-left : 15%;
  margin-right : 5%;
  margin-top : 3%;
  margin-bottom: 3%;
`;
const PaddedImages = styled.img`
  padding-left : 13%;
  padding-right : 6%;
  color: var(--Tertiary-100, #C7B299);
`;
const ButtonContainer = styled.div`
    border-radius: 8px;
`;
const DevisButton = styled.a`
    color: var(--Dark-100, #333);
    /* Menu/Item/Normal */
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal; 
    text-decoration: none;
    cursor : pointer;
`;

const UserInfoContainer = styled.div`
    display : flex;
    gap : 8px;
    margin-top : -15%;
    align-items: center;
`;

const UserName = styled.span`
    color: var(--Dark-100, #333);
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.56px; 
`;
const UserEmail = styled.span`
    color: var(--Dark-100, #333);
    font-family: Montserrat;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.2px; 
    margin-bottom: 10%;
`;
const UserInfo = styled.div`
    display : flex;
    flex-direction: column;
    text-align: center;
`;
const ToggleButton = styled.button`
  position: absolute;
  top: 5px;
  right: -40px; 
  background-color: var(--Primary-100, #FFF);
  border: none;
  cursor: pointer;
  font-size: 24px;
  z-index: 1001; 
  @media (max-width: 1025px) {
    right: 16px; 
  }
`;

const SideBar = ({ isOpen }) => {
  const dispatch = useDispatch();
  const currentStore = useSelector((state) => state.Stores?.currentStore?.store_name || state.Stores?.selectedStore?.label || []);

  useEffect(() => {
    dispatch(getCurrentStore());
    setIsSideBarOpen(isOpen);
  }, [isOpen, dispatch]);



  const first_name = useSelector((state) => state.user.first_name);
  const last_name = useSelector((state) => state.user.last_name);
  const email = useSelector((state) => state.user.email);

  const [isSideBarOpen, setIsSideBarOpen] = useState(isOpen);


  const handleToggle = () => {
    setIsSideBarOpen(prev => !prev);
  };

  const handleNouveauDevis = () => {
    dispatch(resetUserPending());
    dispatch(clearClient());
    dispatch(clearQuiz());

    window.location.href = '/infoUtilisateur'; // Optional navigation
  };

  const handleNavigateMagasin = () => {
    dispatch(resetUserPending());
    dispatch(clearClient());
    dispatch(clearQuiz());

    window.location.href = '/magasin'; // Optional navigation
  };

  const removeHyphen = (inputString) => {
    if (inputString.includes('-')) {
      return inputString.split('-')[0].trim();
    }
    return inputString
  }

  return (
    <Container isOpen={isSideBarOpen}> {/* Use local state here */}
      {isSideBarOpen && (
        <ToggleButton onClick={handleToggle}>✖</ToggleButton>
      )}
      <Logo src="images/Darty.svg" alt="logo_ahmed" />
      <UserInfoContainer>
        <UserInfo>
          <UserName>{first_name} {last_name}</UserName>
          <UserEmail>{email}</UserEmail>
          <UserName>{removeHyphen(currentStore)}</UserName>
        </UserInfo>
      </UserInfoContainer>

      <Menu>
        <DevisMenue>
          <ItemContainer>
            <PaddedImage src="images/Whitelist.svg" alt="devis" />
            <DevisButton href='/mesDevis'>Mes Estimations</DevisButton>
          </ItemContainer>

          <ButtonContainer>
            <PaddedImage src="images/Navigation.svg" alt="plus" />
            <DevisButton onClick={handleNouveauDevis}>Nouvelle Estimation</DevisButton>
          </ButtonContainer>

          <ButtonContainer>
            <PaddedMagasinImage src="images/change_mag.png" alt="plus"  />
            <DevisButton onClick={handleNavigateMagasin}>Changer de Magasin</DevisButton>
          </ButtonContainer>
        </DevisMenue>

        <ItemContainer style={{ marginTop: "20%" }}>
          <PaddedImage src="images/Home_2.png" alt="settings" />
          <DevisButton href='/dashboard'>Accueil</DevisButton>
        </ItemContainer>
        <ItemContainer>
            <PaddedImages src="images/send.svg" alt="devis" />
            <DevisButton href='/contactForm'>Contact </DevisButton>
          </ItemContainer>
      </Menu>

      <Logout />
    </Container>
  );
};

export default SideBar;
