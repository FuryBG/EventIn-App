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
        >div {
            margin: 1rem;
            border-radius: 0.5rem;
            overflow: hidden;
            :hover {
                    background-color: #2b2b2b;
                }
            >div {
                padding: 1rem;
                :nth-child(1) {
                    padding-right: 1rem;
                }
            }
        }
    }
`;

export { ViewPollStyled };