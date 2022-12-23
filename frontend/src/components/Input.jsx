import styled from "styled-components";
import COLORS from "../assets/colors/color";

export const Input = styled.input`
  padding: 0.5rem 0.75rem;
  &::placeholder {
    color: var(--bg-placeholder);
  }
  background-color: ${(props) =>
    props.background ? props.background : "transparent"};
  color: var(--white);

  @media screen and (max-width: 525px) {
    width: 80vw;
  }
`;
