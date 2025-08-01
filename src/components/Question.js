import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { FormControl, Select, MenuItem, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';

const QuestionContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 80px; 
    align-self: stretch; 
    flex-direction: row;
    
    @media (max-width: 480px) {
        margin: 2% 5%;
        width: 100%;
        flex-direction: column;
    }
`;

const QuestionLabel = styled.p`
    color: var(--Dark-100, #333);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.32px; 
    margin-top: 2%;
    flex: 1 0 0; 
    width: 100%;
    max-width: 100%;
    text-align: ${props => props.type === "INFORMATION" ? "center" : ""};
    @media (max-width: 480px) {
        margin-top: -2%;
        margin-bottom: -19%;
        margin-left: 1%;
    }
    
`;

const Placeholder = styled.em`
    color: var(--Dark-100, #333);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.32px; 
`;

const StyledInput = styled.input`
    border-radius: 8px;
    border: 1px solid var(--Tertiary-100, #C7B299);
    background: var(--Tertiary-10, rgba(199, 178, 153, 0.10));
    height: 48px;
    padding: 8px 16px;
    color: var(--Text-60, rgba(51, 51, 51, 0.60));
    text-align: right;
    font-family: Montserrat;
    font-size: 16px;
    font-style: italic;
    font-weight: 400;
    line-height: 18.4px; 
    letter-spacing: 0.32px;
    width: 258px;

`;

const Question = ({ questionId, label, question_type, multiple, responses = [], onResponseChange, error, preSelected = [] }) => {
    const [selectedResponses, setSelectedResponses] = useState(preSelected);
    const [inputValue, setInputValue] = useState(preSelected[0] || ''); // Initialize input value with preSelected if available

    useEffect(() => {
        if (question_type === "INPUT" && selectedResponses.length > 0) {
            setInputValue(selectedResponses[0]); // Sync inputValue with the first selectedResponse for INPUT
        }
    }, [selectedResponses, question_type]);

    const handleChange = (event) => {
        const { target: { value } } = event;

        if (question_type === "INPUT") {
            setInputValue(value); // Update inputValue and selectedResponses for "INPUT" type
            setSelectedResponses([value]); // Ensure selectedResponses is updated for INPUT
            onResponseChange(questionId, [value]);
        } else {
            const newValue = typeof value === 'string' ? value.split(',') : value;
            setSelectedResponses(newValue);
            onResponseChange(questionId, newValue);
        }
    };

    const getStyles = (name) => {
        const isSelected = selectedResponses.indexOf(name) !== -1;
        return {
            color: 'var(--Dark-100, #333)',
            fontFamily: 'Montserrat',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: 'normal',
            letterSpacing: '0.32px',
            background: 'var(--Primary-100, #FFF)',
            borderLeft: isSelected ? '3px solid #03C' : 'none',
            maxWidth: '90%',
        };
    };

    return (
        <QuestionContainer>
            <QuestionLabel type={question_type}>{label}</QuestionLabel>
            {question_type === "DROPDOWN" ? (
                <FormControl sx={{ width: 258, maxWidth: 258}}>
                    <Select
                        multiple={multiple}
                        displayEmpty
                        value={selectedResponses}
                        onChange={handleChange}
                        MenuProps={{
                            disableScrollLock: true,
                          }}
                        input={
                            <OutlinedInput
                                sx={{
                                    borderRadius: '8px',
                                    border: '1px solid var(--Secondary-20, rgba(0, 51, 204, 0.20))',
                                    width: '265px',
                                    maxWidth: '265px',
                                    color: 'var(--Dark-100, #333)',
                                    fontFamily: 'Montserrat',
                                    fontSize: '16px',
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: 'normal',
                                    letterSpacing: '0.32px',
                                    background: 'var(--Primary-100, #FFF)',
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'grey',
                                    }
                                }}
                            />
                        }
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <Placeholder>Sélectionner une option</Placeholder>;
                            }
                            return selected.join(', ');
                        }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        disableScrollLock={true}
                    >
                        {responses && Array.isArray(responses) && responses.map((name) => (
                            <MenuItem
                            disableScrollLock={true}

                                key={name.id || name}
                                value={name}
                                style={getStyles(name)}
                            >
                                {name}
                            </MenuItem>
                        ))}
                    </Select>{
                        error && <Typography color="error">{error}</Typography>
                    }
                </FormControl>
            ) : question_type === "INPUT" ? (
                <div>
                    <StyledInput 
                        value={inputValue} 
                        type="number"
                        onChange={handleChange} 
                    />
                    {
                        error && <Typography color="error">{error}</Typography>
                    }
                </div>
            ): question_type === "INFORMATION" ? (
                <div>

                </div> 
            ) : null}
        </QuestionContainer>
    );
};

export default Question;
