import { styled } from 'styled-components';

const EditPollModalStyled = styled.div`
    >form {
        >.options-input-container {
            padding-left: 3rem;
            display: flex;
            gap: 0.3rem;
            align-items: baseline;
            .delete-icon {
                &::before {
                    font-family: var(--icon-family);
                    content: var(--icon-exit);
                    font-size: 12px;
                    color: #6c757d;
                    cursor: pointer;
                }
            }
        }
        >.footer-buttons {
            display: flex;
            gap: 1rem;
            justify-content: end;
        }
    }
`;

export { EditPollModalStyled };