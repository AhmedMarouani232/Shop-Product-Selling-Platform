// src/components/ToggleButton.js
import React from 'react';
import styled from 'styled-components';

const StyledToggleButton = styled.button`
  position: fixed;
  top: 20px;
  left: 20px;
  background: var(--Primary-100, #FFF);
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1000;

  @media (min-width: 1025px) {
    display: none;
  }
`;

const ToggleButton = ({ onClick }) => {
  return (
    <StyledToggleButton onClick={onClick}>
      ☰
    </StyledToggleButton>
  );
};

export default ToggleButton;
