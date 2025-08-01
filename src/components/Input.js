import React from "react";
import styled from 'styled-components';

const InputContainer = styled.div`
    margin-bottom: 5%;
`

const Label = styled.label`
    color: var(--Text-100, #333);
    /* Form/Label */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.32px; 
    margin-left: 6%

`
const InputField = styled.input`
    border-radius: 8px;
    border: 1px solid var(--Tertiary-100, #C7B299);
    background: var(--Tertiary-10, rgba(199, 178, 153, 0.10));
    display: flex;
    height: 48px; 
    padding: 8px 16px;
    color: var(--Text-60, rgba(51, 51, 51, 0.60));
    /* Form / Placeholder Italic */
    font-family: Montserrat;
    font-size: 16px;
    font-style: italic;
    font-weight: 400;
    line-height: 18.4px; /* 115% */
    letter-spacing: 0.32px; 
    width: 120%;
    align-items: center;
    align-self: stretch; 
    margin-left: 6%
`


const Input = ({label, type, value, onChange, placeholder, name, id}) =>{
    return(
        <InputContainer>
            <Label htmlFor={id}>{label}</Label>
            <InputField id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} name={name}></InputField>
        </InputContainer>
    )
}
export default Input;