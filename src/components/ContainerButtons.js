import React from "react";
import styled from "styled-components";

const StyledContainerButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1.629vh 1.058vw;
    width: 100%;

    & .buttonsRight,
    & .buttonsLeft {
        position: relative;
        width: fit-content;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 1.629vh;
    }

    & .buttonsRight {
        margin-left: auto
    }
`


function ContainerButtons({children}) {
    return (
        <StyledContainerButton>
            {children}
        </StyledContainerButton>
    )
}

export default ContainerButtons;