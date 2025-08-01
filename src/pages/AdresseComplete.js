import React, { useState } from "react";
import SideBar from "../components/SideBar";
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import ButtonField from '../components/Button';
import Input from '../components/Input';
import verifyAuth from "../components/VerifyAuth";
import ToggleButton from "../components/ToggleButton"; // Import the new component
import { useDispatch, useSelector } from 'react-redux';
import { userPending } from "../app/services/QuestionService";
import { useFormik } from "formik";
import { setClient } from "../app/reducers/ClientReducer"; 



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
    margin-right: 15%;
    height: 100%;


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
    justify-content: center;

    
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
        margin-right: 35%;
        margin-top: 13%;
    }

    @media (max-width: 1025px) {
          margin-right: 35%;
          margin-top: 13%;
    }
`;
const Form = styled.form`
  display: flex;

`
const Arrow = styled.a`
    margin-right: 95%;
    margin-top: -14%;

    @media (max-width: 1025px) {
        margin-top: -120px;
    }
    @media (max-width: 480px) {
        margin-top: -45%;
    }

`;

const ErrorMessage = styled.div`
  color: red;
  font-family: Montserrat;
  font-size: 14px;
  margin-top: -20px;
  text-align: left;
  width: 100%;
  margin-left: 14%;
`;

function AdresseComplete(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const clientData = useSelector((state) => state.client);
    // dispatch(userPending(clientData.email));

    const validate = values =>{
        const errors = {};

        if(!values.address){
            errors.address = "L'addresse est requise"
        };
        if(!values.postcode){
            errors.postcode = "Le code postal est requis"
        }else if(values.postcode.length !== 5){
            errors.postcode = "Le code postal doit contenir 5 caractères"
        }
        if(!values.city){
            errors.city = "La ville est requise"
        };

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            address: clientData.address ||'',
            postcode:clientData.postcode ||'',
            city: clientData.city ||'',
        },
        validate,
        onSubmit: values => {
            const client = {
                firstName: clientData.firstName,
                lastName: clientData.lastName,
                email: clientData.email,
                phoneNumber: clientData.phoneNumber,
                address: values.address,
                postcode: values.postcode,
                city: values.city
            }
          dispatch(userPending( client));
          dispatch(setClient(values));

          navigate("/choixBorne");
          },
      });
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    return (
        <>
          <ToggleButton onClick={() => setIsSideBarOpen(!isSideBarOpen)} />
          <Container>
            <SideBar isOpen={isSideBarOpen} />
            <Title>Adresse d'installation</Title>
            <Arrow href="/infoUtilisateur"><img src="images/Arrow.svg" alt="Arrow" /></Arrow>

            <Form onSubmit={formik.handleSubmit}>

            <InputContainer>
                <Input label="N° et Nom de voie " type="text" name="address" onChange={formik.handleChange} value={formik.values.address} required />
                {formik.errors.address && formik.touched.address ? <ErrorMessage>{formik.errors.address}</ErrorMessage> : null}

                <Input label="Code postal" type="text" name="postcode" onChange={formik.handleChange} value={formik.values.postcode} required />
                {formik.errors.postcode && formik.touched.postcode ? <ErrorMessage>{formik.errors.postcode}</ErrorMessage> : null}

                <Input label="Ville" type="text" name="city" onChange={formik.handleChange} value={formik.values.city} required />
                {formik.errors.city && formik.touched.city ? <ErrorMessage>{formik.errors.city}</ErrorMessage> : null}
            </InputContainer>
            </Form>

            <ButtonField onClick={formik.handleSubmit}  type="submit" variant="primary" >Je confirme cette adresse</ButtonField>
        </Container>
        </>

    )
}

export default verifyAuth(AdresseComplete);