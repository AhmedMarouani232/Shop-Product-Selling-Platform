// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import SideBar from "../components/SideBar";
import styled from 'styled-components';
import Card from "../components/Card";
import verifyAuth from "../components/VerifyAuth";
import ToggleButton from "../components/ToggleButton"; // Import the new component
import { getDevisStats, getDevis } from "../app/services/DevisServices";

const Container = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 1025px) {
    flex-direction: row;
  }
`;

const InfoContainer = styled.div`
  margin-left: -36%;

  padding: 20px;
  @media (max-width: 1025px) {
    margin-left: 0;
    padding: 10px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  @media (max-width: 1025px) {
    flex-direction: column;
  }
`;
const Title = styled.p`
    color: var(--Dark-60, rgba(51, 51, 51, 0.60));
    /* Titre / H5 */
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.4px; 
    margin-bottom : 40px;
    margin-left : 1%
`

const Dashboard = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(getDevisStats());
  },[dispatch])

  useEffect(() => {
    dispatch(getDevis());
  }, [dispatch]);
  
  const devisStats = useSelector((state) => state.devis.devisStats?.data?.statistics);

  return (
    <>
      <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
      <Container>
        <SideBar isOpen={isSideBarOpen} />
        <InfoContainer>
                    <Title>Interface commande Ahmed x Darty </Title >
          <CardContainer>
            <Card title={"Estimations"} subTitle={"Ce mois-ci"} number={devisStats?.total_month_devis || 9 }  />
            <Card title={"Estimations"} subTitle={"Cette année"} number={devisStats?.total_year_devis || 22} />
          </CardContainer>
          <CardContainer>
            <Card title={"Ventes"} subTitle={"Ce mois-ci"} number={devisStats?.total_month_sales || 5} />
            <Card title={"Ventes"} subTitle={"Cette année"} number={devisStats?.total_year_sales|| 14} />
          </CardContainer>
          <CardContainer>
            <Card title={"Installations"} subTitle={"Ce mois-ci"} number={devisStats?.total_month_installations|| 4} />
            <Card title={"Installations"} subTitle={"Cette année"} number={devisStats?.total_year_installations|| 13} />
          </CardContainer>
        </InfoContainer>
      </Container>
    </>
  );
}

export default verifyAuth(Dashboard);
