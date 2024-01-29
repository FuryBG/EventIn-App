import styled from "styled-components";


const InvitePollModalStyled = styled.div`
    display: flex;
    justify-content: space-around;
    >.content-container {
        >div {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid whitesmoke;
            >label {
                font-weight: bold;
            }
            .copy-icon {
                text-decoration: none;
                &::before {
                    font-family: var(--icon-family);
                    content: var(--icon-copy);
                    font-size: 18px;
                    color: #6c757d;
                    cursor: pointer;
                }
            }
        }
        >span {
            display: block;
            white-space: nowrap;
            overflow: hidden;
            max-width: 14rem;
        }
    }
`;

export { InvitePollModalStyled };