import styled from 'styled-components'

const GlobalLoaderStyled = styled.div`
    & {
        background: whitesmoke;
        opacity: 80%;
        z-index: 2;
        color: black;
        position: fixed;
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
                stroke: whitesmoke;
            }
            40% {
                stroke: purple;
            }
            66% {
                stroke: whitesmoke;
            }
            90% {
                stroke: purple;
            }
        }
    }

`;

export { GlobalLoaderStyled };