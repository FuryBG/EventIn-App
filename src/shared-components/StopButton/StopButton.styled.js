import styled from 'styled-components'

const StopButtonStyled = styled.span`
    &::before {
        font-family: var(--icon-family);
        content: var(--icon-stop);
        color: white;
        background-color: #cc382d;
        padding: 0.5rem;
        border-radius: 0.3rem;
        cursor: pointer;
    }
    &:hover::before {
        background-color: #f44336;
    }
`;

export { StopButtonStyled };