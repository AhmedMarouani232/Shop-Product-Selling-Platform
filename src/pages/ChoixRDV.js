import React, { useState, useEffect, useMemo } from "react";
import SideBar from "../components/SideBar";
import styled from 'styled-components'
import Creneau from "../components/Creneaux";
import verifyAuth from "../components/VerifyAuth";
import ToggleButton from "../components/ToggleButton"; // Import the new component
import { getTimeslots } from "../app/services/PraxedoServices";
import { useDispatch, useSelector } from 'react-redux';



const Container = styled.div`
    display: flex;
    width: 220%;
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
    margin-left : -30%;
    @media (max-width: 1025px) {
        margin: 1% 2%;
        width: 100%;
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
    text-align : center;
    width: 80%;
`
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
            @media (max-width: 1025px) {
          text-align: center;
    }
`
const CreneauContainer = styled.div`
    display: flex;
    justify-content: flex-start; 
    align-items: center;
    gap: 16px; 
    width: 100%; 
    margin-top: -32px;
        @media (max-width: 1025px) {
          flex-direction: column;
          text-align: center;
    }

`
const Arrow = styled.a`
    margin-right: 85%;
    margin-top: -11%;
    padding-bottom: 50px;
`;


const formatDate = (dateString) => {
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  
    const date = new Date(dateString);
    const dayName = days[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();
  
    return `${dayName} ${day} ${monthName} ${year}`;
  };

  function ChoixRDV(){
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const dispatch = useDispatch();
    const stateTimeSlots = useSelector((state) => state.timeSlots.timeSlots);
    console.log("stateTimeSlots:", stateTimeSlots); 

    const timeSlots = useMemo(() => stateTimeSlots, [stateTimeSlots]);
    console.log("Time slots data:", timeSlots); 

    useEffect(() => {
      dispatch(getTimeslots());
      console.log("Time slots data:", timeSlots); 
    }, [dispatch]);

    // Function to group time slots by day and only take the first 3 days
    const groupedTimeSlots = () => {
      if (!timeSlots || !timeSlots?.data || timeSlots?.data?.length === 0) return [];
    
      const grouped = timeSlots.data.reduce((acc, slot) => {
        const date = slot.start.split(" ")[0]; // Get date part from start time
        if (!acc[date]) acc[date] = [];
        acc[date].push(slot);
        return acc;
      }, {});
    
      const sortedDates = Object.keys(grouped).sort();
      return sortedDates.slice(0, 10).map(date => ({ date, slots: grouped[date] }));
    };
  
    const displaySlots = groupedTimeSlots();
    return (
        <>
          <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
          <Container>
            <SideBar isOpen={isSideBarOpen} />
            <Title>Prise de rendez-vous téléphonique</Title>
            <Arrow href="/totalDevis"><img src="images/Arrow.svg" alt="Arrow" /></Arrow>
            {displaySlots.map(({ date, slots }) => (
              <div key={date} style={{ width: "100%" }}>
                <CrenauxLable style={{marginBottom: "45px"}}>{formatDate(date)}</CrenauxLable>
                <CreneauContainer>
                  {slots.map((slot, index) => (
                    <Creneau 
                      date={date} 
                      key={index} 
                      start={slot.start.split(" ")[1]} 
                      end={slot.end.split(" ")[1]} 
                    />
                  ))}
                </CreneauContainer>
              </div>
            ))}
        </Container>
        </>
    )
}

export default verifyAuth(ChoixRDV);