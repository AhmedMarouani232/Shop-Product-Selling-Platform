import React from "react";
import { styled } from "styled-components";
import CircularProgress from '@mui/material/CircularProgress';

const Button = styled.button`
    display: flex;
    height:  ${props => props.variant === 'logout' ? '35px': '68px'};
    ${props => props.variant === 'logout' ? '': 'padding: 24px'} ;
    ${props => props.variant === 'logout' ? '': 'font-size: 24px'};
    justify-content: center;
    align-items: center;
    gap: 16px; 
    border-radius: 8px;
    background: ${props => props.variant === 'secondary' ? '' : 'var(--Secondary-100, #03C)'};
    color: var(--White, #FFF);
    /* CTA/Big */
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.48px;
    &:hover {
        ${props => props.variant === 'logout' && 'background: var(--Secondary-100, #03C)'};
        ${props => props.variant === 'logout' && 'color: white'};
    }
`

const ButtonField = ({type= 'button', id, onClick, children, variant, disabled, isLoading}) =>{
    const buttonClasses = `btn btn-${variant} ${disabled ? 'disabled' : ''}`;
    return(
        <Button 
            type={type} 
            id={id} 
            onClick={!disabled && !isLoading ? onClick : null} 
            className={buttonClasses}
            disabled={disabled}
            variant={variant}
        >
            {isLoading ? (
                <div className="loading-spinner">
                    <CircularProgress />
                </div>
            ) : (
                children
            )}
        </Button>

    )
}
ButtonField.defaultProps = {
    isLoading: false,
};

export default ButtonField;