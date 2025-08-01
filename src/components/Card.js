import React from "react";
import { styled } from "styled-components";

const InfoContainer = styled.div`
    display: flex;
    width: 223px;
    padding: 16px;
    margin : 16px 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px; 
    border-radius: 8px;
    border: 1px solid var(--Secondary-10, rgba(0, 51, 204, 0.10));
    background: var(--White, #FFF);
    /* Box shadow */
    box-shadow: 2px 2px 16px 0px rgba(0, 51, 204, 0.08); 
`
const Title = styled.p`
    color: var(--Dark-80, rgba(51, 51, 51, 0.80));
    /* Titre / H5 */
    font-family: Montserrat;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.4px; 
`;
const SubTitle = styled.p`
    color: var(--Dark-60, rgba(51, 51, 51, 0.60));
    /* Body Regular / 0 */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 18.4px; /* 115% */
    letter-spacing: 0.32px; 
`;
const Number = styled.p`
    color: var(--Dark-100, #333);
    /* Titre / H3 */
    font-family: Montserrat;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 1.44px; 
`;

const Card = ({title, subTitle, number})=>{
    return(
        <InfoContainer class="card">
            <div class="card-body">
                <Title class="card-title">{title}</Title>
                <SubTitle class="card-subtitle mb-2 text-body-secondary">{subTitle}</SubTitle>
                <Number class="card-text">{number}</Number>
            </div>
        </InfoContainer>
    )
}

export default Card;