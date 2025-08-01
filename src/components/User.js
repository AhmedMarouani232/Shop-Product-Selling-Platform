// UserComponent.js
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';


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

const UserComponent = () => {
  // Access the username from the Redux store
  const first_name = useSelector((state) => state.user.first_name);
  const last_name = useSelector((state) => state.user.last_name);

  return (
    <div>
      <Title>Bonjour, {first_name} {last_name}!</Title>
    </div>
  );
};

export default UserComponent;
