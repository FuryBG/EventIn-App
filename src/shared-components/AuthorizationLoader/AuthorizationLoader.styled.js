import styled from 'styled-components'

const AuthorizationLoaderStyled = styled.div`
    & {
        background-color: purple;
        color: white;
        height: 100%;
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
            text-align: center;
        }
        @keyframes p-progress-spinner-color {
            0% {
                stroke: white;
            }
            40% {
                stroke: white;
            }
            66% {
                stroke: white;
            }
            90% {
                stroke: white;
            }
        }
    }

`;

export { AuthorizationLoaderStyled };