import styled from 'styled-components'

const CButtonStyled = styled.button`
    & {
        background-color: purple;
        color: white;
        padding: 0.5rem;
        box-shadow: 0.125rem 0.125rem 0.125rem rgba(0,0,0,.1);
        border: none;
        cursor: pointer;
    }

`;

export { CButtonStyled };