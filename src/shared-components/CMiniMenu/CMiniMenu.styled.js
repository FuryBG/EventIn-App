import styled from 'styled-components'

const CMiniMenuStyled = styled.div`
    & {
        .dots-menu::before {
            font-family: var(--icon-family);
            content: var(--icon-kebab);
        }
        .dots-menu:hover {
            cursor: pointer;
        }
    }
`;

export { CMiniMenuStyled };