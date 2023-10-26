import styled from "styled-components";


const ViewPollStyled = styled.div`
    width: 100%;
    height: 100%;
    background-color: #1f1f1f;
    color: white;
    padding: 1.5rem;
    >div {
        >header {
            display: flex;
            justify-content: space-between;
            border-bottom:  1px solid grey;
        }
        >form {
            margin: 1rem;
            >.option-container {
                padding: 1rem 0;
                margin: 1rem 0;
                border-radius: 0.5rem;
                overflow: hidden;
                &:hover {
                background-color: #2b2b2b;
                }
            }
        }
        .result {
            >.option-percentage {
                height: 1.2rem;
                >.percentage-bar-container {
                    display: flex;
                    height: inherit;
                    align-items: center;
                    >.bar {
                        display: block;
                        height: inherit;
                        background-color: purple;
                        border-radius: 1rem;
                        transition: width 1s;
                    }
                    h5 {
                        padding: 0 0.5rem;
                    }
                }
            }
        }
        .buttons-container {
            span {
                padding: 0 1rem;
                text-decoration: underline;
                cursor: pointer;
            }
            text-align: center;
        }
    }
`;

export { ViewPollStyled };