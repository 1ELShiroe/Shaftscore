import styled from "styled-components";
import colors from "../../assets/colors/color";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
`;

export const SubHeader = styled.div`
  display: flex;
  justify-content: space-between;

  background-color: var(--bg-gray-300);
  flex-wrap: wrap;
  padding: 1rem;
  border-radius: 10px;
  .react-datepicker-wrapper {
    max-width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    input {
      max-width: 100px;
      padding: 0.25rem 0.75rem;
      border-radius: 10px;
      background-color: var(--bg-blue);
      color: white;
      font-weight: 500;
    }
  }
  span {
    padding: 0.3rem 0.5rem;
    border-radius: 10px;

    &.actived,
    &:hover {
      background-color: var(--bg-blue);
      padding: 0.3rem 0.5rem;
      color: white;
      border-radius: 10px;
      cursor: pointer;
    }
  }
`;
