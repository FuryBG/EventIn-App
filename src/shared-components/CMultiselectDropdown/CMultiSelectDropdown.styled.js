import styled from 'styled-components'

const StyledCMultiSelectDropdown = styled.div`
    & {
        display: flex;
        flex-direction: column;
    }

    &.error {
        border-color: red;
    }
    ~.error {
        ${props => props.haveError ? { color : 'red' } : null};
        border-color:${props => props.haveError ? 'red' : 'red'};
    }
    .rs__control {
        border-color:${props => props.haveError ? 'red' : null};
    }
    span {
        ${props => props.haveError ? { color : 'red' } : null};
    }
`;

export { StyledCMultiSelectDropdown };