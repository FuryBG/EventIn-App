import styled from "styled-components";

const CRadioButtonStyled = styled.span`
    vertical-align: middle;
    input[type='radio'] {
        appearance: none;
        width:20px;
        height:20px;
        border:3px solid purple;
        border-radius:50%;
        outline:none;
        cursor: pointer;
    }

    input[type='radio']:before {
        content:'';
        display:block;
        width:60%;
        height:60%;
        margin: 20% auto;    
        border-radius:50%;    
    }
    input[type='radio']:checked:before {
        background:purple;
    }

    .error {
        appearance: none;
        width:20px;
        height:20px;
        border:3px solid red !important;
        border-radius:50%;
        outline:none;
        cursor: pointer;
    }
`;

export { CRadioButtonStyled };