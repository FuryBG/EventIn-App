import { styled } from 'styled-components';

const StyledRegister = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    .aside {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30%;
        background-color: purple;
        box-shadow: 0.125rem 0.125rem 0.125rem rgba(0,0,0,.1);
        .aside-information {
            padding: 1rem;
            text-align: center;
            color: white;
        }
        .aside-footer {
            color: white;
            position: fixed;
            width: 30%;
            bottom: 2rem;
            left: 0;
        }
    }
    .login-container {
        width: 70%;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        .form-container {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            >span {
                font-size: 26px;
            }
            align-items: center;
            width: 25rem;
            height: 25rem;
            background-color: whitesmoke;
            box-shadow: 0.125rem 0.125rem 0.125rem rgba(0,0,0,.1);
            border-radius: 0.2rem;
            form {
            text-align: end;
            >.error {
                color: red;
            }
            .input-container {
                display: flex;
                align-items: baseline;
                label {
                    width: 8rem;
                    text-align: start;
                }
            }
        }
        }
    }
    @media (max-width: 700px) {
        flex-direction: column;
        .aside {
            width: 100%;
        }
        .login-container {
            width: 100%;
            .form-container {
                width: 100%;
            }
        }
    }
`;

export { StyledRegister };