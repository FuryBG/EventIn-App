import styled from 'styled-components'

const InputWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    margin-bottom: 0.2rem;
    input {
        border: solid 1.5px gray;
        border-radius: 0.2rem;
        padding: 0.5rem;
        &.error {
            border-color: red;
        }
        &:focus {
            outline-color: purple;
        }
    }

    span {
        font-size: 12px;
        text-align: start;
        &.error {
            color: red;
        }
    }
`;

export { InputWrapper };