import styled from "styled-components";


const NotFoundStyled = styled.div`
    display: flex;
    padding: 1rem;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap-reverse;
    .image-container {
        width: 20rem;
        height: 25rem;
        img {
            width: 100%;
            height: 100%;
            border-radius: 2%;
        }
    }
    .error-container {

    }
`;

export { NotFoundStyled };