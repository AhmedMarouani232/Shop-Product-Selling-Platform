import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTimeSlot } from "../app/reducers/praxedoReducer";

const CreneauContainer = styled.div`
    display: flex;
    padding: 16px;
    justify-content: center;
    align-items: center;
    gap: 8px; 
    border-radius: 8px;
    background: var(--Secondary-Light-100, #F5F7FF); 
    color: var(--Secondary-80, rgba(0, 51, 204, 0.80));
    /* Titre / H5 */
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.4px; 
    text-decoration : none;
    cursor: pointer;
    &:hover {
        background: linear-gradient(0deg, var(--Secondary-10, rgba(0, 51, 204, 0.10)) 0%, var(--Secondary-10, rgba(0, 51, 204, 0.10)) 100%), #F5F7FF;
    }
`;

const Creneau = ({ date, start, end }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Corrected: pass NavigatetoRDV function without invoking it
    const NavigatetoRDV = () => {
        const selectedTimeSlot = {start: `${date} ${start}`, end: `${date} ${end}`};
        dispatch(setTimeSlot(selectedTimeSlot));
        navigate("/rdv");
    };

    return (
        <CreneauContainer onClick={NavigatetoRDV}>
            {start} - {end}
        </CreneauContainer>
    );
};

export default Creneau;
