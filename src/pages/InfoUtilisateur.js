import React, { useState } from "react";
import SideBar from "../components/SideBar";
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import ButtonField from '../components/Button';
import Input from '../components/Input';
import { Link } from "@mui/material";
import verifyAuth from "../components/VerifyAuth";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from "formik";
import ToggleButton from "../components/ToggleButton";
import { setClient } from "../app/reducers/ClientReducer";

const Container = styled.div`
    display: flex;
    width: 850px;
    padding: 10%;
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
    margin-right : 15%;
    height: 100%;
    button{
        margin-top: 15%;
    }
    @media (max-width: 1025px) {
        margin: 1% 2%;
        width: 100%;
    }
    @media (max-width: 480px) {
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
`
const InputContainer = styled.div`
    display: flex;
    padding: 0px 80px;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-right: 10%;

    input {
        width : 593px;
        margin-bottom: -1%;
        &[type="number"] {
            -moz-appearance: textfield;
        }

        @media (max-width: 1025px) {
          margin: auto;
          width : 160%;
          margin-bottom: -1%;
        }
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    label {
        @media (max-width: 1025px) {
          margin: auto;
        }
    }
    @media (max-width: 480px) {
          margin-right: 25%;

    }

    @media (max-width: 1025px) {
          margin-right: 25%;
    }
`;
const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  & + label {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 30px;
    border: 1px solid ${({ hasError }) => hasError ? 'red' : 'var(--Tertiary-100, #C7B299)'};
    border-radius: 4px;
    background-color: var(--Tertiary-10, rgba(199, 178, 153, 0.10));
    cursor: pointer;
    margin-left : 6%;
    margin-bottom: 20px; 
    @media (max-width: 1025px) {
      width: 100px;
      margin-bottom: 15%;
    }

  }

  & + label::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 12px;
    background-image: url('data:image/svg+xml;utf8,<svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.2448 0.581448C15.6486 0.958282 15.6704 1.59107 15.2936 1.99482L6.54356 11.3698C6.35851 11.5681 6.10089 11.6827 5.82973 11.6874C5.55858 11.692 5.29716 11.5864 5.10539 11.3946L0.730393 7.01961C0.339869 6.62909 0.339869 5.99592 0.730393 5.6054C1.12092 5.21487 1.75408 5.21487 2.14461 5.6054L5.7877 9.24849L13.8314 0.630185C14.2083 0.226435 14.8411 0.204614 15.2448 0.581448Z" fill="%23C7B299"/></svg>');
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:checked + label::after {
    opacity: 1;
  }
`;

const CheckBoxText = styled.p`
  color: var(--Text-80, rgba(51, 51, 51, 0.80));
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21.8px;
  letter-spacing: 0.28px; 
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  align-items: center; 
  @media (max-width: 1025px) {
    margin-left: 9%;
  }
    @media (max-width: 480px) {
      width: 200px;
      margin-bottom: 55%;
      margin-left: 50%;
    }
`;

const Form = styled.form`
  display: flex;
  width: 100%;
`
const ErrorMessage = styled.div`
  color: red;
  font-family: Montserrat;
  font-size: 14px;
  margin-top: -20px;
  text-align: left;
  width: 100%;
  margin-left: 14%;
  @media (max-width: 1025px) {
    margin-left: 32%;
    margin-top: -2%;
  }

`;


function InfoUtilisateur(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const client = useSelector((state) => state.client);

    const validate = values => {
      const errors = {};
    
      // First name validation
      if (!values.firstName) {
        errors.firstName = 'Le nom est requis';
      }
    
      // Last name validation
      if (!values.lastName) {
        errors.lastName = 'Le prénom est requis';
      }
    
      // Email validation
      if (!values.email) {
        errors.email = 'L\'email est requis';
      } else if (!values.email.includes('@')) {
        errors.email = 'Adresse email invalide';
      }
    
      // Phone number validation
      if (!values.phoneNumber) {
        errors.phoneNumber = 'Le numéro de téléphone est requis';
      } else if (!/^\d+$/.test(values.phoneNumber)) {  // Ensure only digits are allowed
        errors.phoneNumber = 'Le numéro de téléphone doit contenir uniquement des chiffres';
      }else if (values.phoneNumber.length !== 10){
        errors.phoneNumber = 'Le numéro de téléphone doit contenir 10 chiffres';
      }
    
      if (!values.checkbox) {
        errors.checkbox = 'Vous devez accepter la politique de confidentialité';
      }
      return errors;
    };
    

    const formik = useFormik({
      initialValues: {
        firstName: client.firstName ||'',
        lastName: client.lastName ||'',
        email: client.email ||'',
        phoneNumber: client.phoneNumber ||'',
        checkbox: false,  // Add checkbox to initial values
      },
      validate,
      onSubmit: values => {
        dispatch(setClient(values));
        navigate("/adressecomplete");
        },
    });

    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    return (
      <>
        <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
        <Container>
          <SideBar isOpen={isSideBarOpen} />
            <Title>Informations personnelles</Title>
            <Form onSubmit={formik.handleSubmit}>
              <InputContainer>
                <Input label="Prénom" type="text" name="firstName" required onChange={formik.handleChange} value={ formik.values.firstName} />
                {formik.errors.firstName && formik.touched.firstName ? <ErrorMessage>{formik.errors.firstName}</ErrorMessage> : null}
                <Input label="Nom" type="text" name="lastName" required onChange={formik.handleChange} value={ formik.values.lastName}/>
                {formik.errors.lastName && formik.touched.lastName ? <ErrorMessage>{formik.errors.lastName}</ErrorMessage> : null}
                <Input label="Votre adresse e-mail" type="email" name="email" required onChange={formik.handleChange} value={formik.values.email}/>
                {formik.errors.email && formik.touched.email ? <ErrorMessage>{formik.errors.email}</ErrorMessage> : null}
                <Input label="Votre numéro de téléphone" type="text" name="phoneNumber" required onChange={formik.handleChange} value={formik.values.phoneNumber} />
                {formik.errors.phoneNumber && formik.touched.phoneNumber ? <ErrorMessage>{formik.errors.phoneNumber}</ErrorMessage> : null}

                <CheckboxContainer>
                    <StyledCheckbox 
                    id="checkbox" 
                    onChange={formik.handleChange}
                    checked={formik.values.checkbox}
                    hasError={formik.errors.checkbox && formik.touched.checkbox} // Pass hasError prop-+-
                    />
                    <label htmlFor="checkbox"></label>
                    <CheckBoxText>
                    J'ai lu et j'accepte <Link href="https://cdn.ahmed.com/RGPD_VF.pdf" target="_blank" > la politique de confidentialité d'Ahmed </Link>  et j'accepte d'être contacté par Ahmed par téléphone ou par mail
                    </CheckBoxText>
                </CheckboxContainer>
                {/* {formik.errors.checkbox && formik.touched.checkbox ? <ErrorMessage>{formik.errors.checkbox}</ErrorMessage> : null} */}
              </InputContainer>
            </Form>
            <ButtonField onClick={formik.handleSubmit} type="submit" variant="primary" >Suivant</ButtonField>
        </Container>
        </>

    )
}

export default verifyAuth(InfoUtilisateur);
