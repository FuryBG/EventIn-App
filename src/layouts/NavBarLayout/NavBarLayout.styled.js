import { styled } from "styled-components";

const StyledNavBar = styled.nav`
        display: flex;
        justify-content: space-around;
        position: sticky;
        z-index: 1;
        top: 0;
        min-height: 4rem;
        box-shadow: 0 0.125rem 0.125rem rgba(0,0,0,.1);
        align-items: center;
        >div {
            display: flex;
            gap: 1rem;
            >a {
                text-decoration: none;
                color: black;
                &:hover {
                    text-decoration: underline;
                }
                img {
                    width: 8rem;
                    height: 2rem;
                }
            }
        }
        .hamburger-container {
            position: fixed;
            left: 2rem;
            display: none;
        }
        .hamburger-menu:before {
            font-family: var(--icon-family);
            content: var(--icon-hamburger);
            cursor: pointer;
        }
        .exit-container {
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
        .exit-menu:before {
            font-family: var(--icon-family);
            content: var(--icon-exit);
            cursor: pointer;
        }
        .mobile-menu {
            box-shadow: 0.125rem 0.125rem 0.125rem rgba(0,0,0,.1);
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: -110%;
            transition: 0.5s;
            z-index: 1;
            background-color: white;
            >.mobile-menu-container {
                width: 100%;
                padding: 5rem;
                text-align: center;
                >.link-container {
                    >a {
                        color: black;
                    }
                }
            }
            .footer {
                border-top: 1px solid whitesmoke;
                position: absolute;
                display: flex;
                gap: 1rem;
                justify-content: center;
                width: 100%;
                left: 0;
                bottom: 0;
                padding: 1rem 0;
                .facebook::before {
                    font-family: var(--icon-family);
                    content: var(--icon-facebook);
                    font-size: 20px;
                    color: #0866ff;
                }
            }
        }
        .mobile-active {
            transition: 0.5s;
            left: 0;
        }
        @media (max-width: 600px) {
            .main-menu, .user-menu {
                display: none;
            }
            .hamburger-container {
                display: block;
            }
        }
`;

export { StyledNavBar };