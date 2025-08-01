import React from "react";
import styled from 'styled-components';

const SelectField = styled.select`
    display: flex;
    height: 48px;
    padding: 8px 16px;
    align-items: center;
    align-self: stretch; 
    border-radius: 8px;
    border: 1px solid var(--Tertiary-100, #C7B299);
    background: var(--Tertiary-10, rgba(199, 178, 153, 0.10)); 
    width : 100%;
    color: var(--Text-60, rgba(51, 51, 51, 0.60));
    /* Form / Placeholder Italic */
    font-family: Montserrat;
    font-size: 16px;
    font-style: italic;
    font-weight: 400;
    line-height: 18.4px; /* 115% */
    letter-spacing: 0.32px; 
        option {
        font-size: 14px;
        font-family: Montserrat;
        font-style: italic;
        font-weight: 400;
        color: var(--Text-60, rgba(51, 51, 51, 0.60));
    }
    `;

const Label = styled.label`
    color: var(--Text-100, #333);
    /* Form/Label */
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.32px; 
    margin-bottom : 8px;
`;



const Select = ({placeholder, value, name, label, onChange, defaultOption, options }) =>{
    return(
        <div>
            <Label>{label}</Label>
            <SelectField placeholder={placeholder} value={value} name={name} onChange={onChange}>
                <option value="" disabled>
                    {defaultOption}
                </option>
                {options.map((option, index) =>{
                    return(
                        <option value={option.store_id} key={index}>
                            {option.store_name}
                        </option>
                    )
                })}
            </SelectField>
        </div>
    )
}
export default Select;