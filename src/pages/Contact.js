import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import SideBar from "../components/SideBar";
import ToggleButton from "../components/ToggleButton";


// Keyframes for animations
const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 88vh; /* This allows the container to grow with content */
`;

const EnvelopeImage = styled.img`
  height: 23rem;
  margin-right: 8rem;
  animation: ${float} 2s ease-in-out infinite;
`;

const Form = styled.form`
  min-width: 25rem;
`;

const Title = styled.h1`
  font-family: 'Pacifico', cursive;
  color: #212529;
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 5rem;
`;

const Par= styled.h1`
  color: #212529;
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 5rem;
  width: 170%;
`;


// Main Component
const ContactForm = () => {

  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
        <SideBar isOpen={isSideBarOpen} />
        <Container>
          <EnvelopeImage id="envelope" src="images/contact.svg" alt="contact" />
          <Form>
            <Title>Nous Contacter </Title>
            <Par>Si vous avez des questions, des problèmes ou des retours à nous faire, merci de nous contacter à l'adresse ci-dessous :</Par>

            <div className="text-center">
              <h1>ahmedmarouani232@gmail.com</h1>
            </div>
          </Form>
        </Container>
    </>

  );
};

export default ContactForm;
