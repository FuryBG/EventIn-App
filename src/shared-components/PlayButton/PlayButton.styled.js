import styled from 'styled-components'

const PlayButtonStyled = styled.span`
    &::before {
        font-family: var(--icon-family);
        content: var(--icon-play);
        color: white;
        background-color: #008001;
        padding: 0.5rem;
        border-radius: 0.3rem;
        cursor: pointer;
    }
    &:hover::before {
        background-color: #00cc01;
    }
`;

export { PlayButtonStyled };