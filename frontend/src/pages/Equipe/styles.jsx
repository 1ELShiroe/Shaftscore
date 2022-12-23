import styled from "styled-components";
import COLORS from "../../assets/colors/color";
export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
`;
export const Title = styled.div`
  font-size: 30px;
  text-align: center;
  font-weight: 800;
`;
export const Description = styled.div`
  font-size: 20px;
  margin: 1rem 0;
  text-align: center;
`;

export const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2%;
  width: 100%;
  justify-content: center;
`;
export const Left = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Logo = styled.img`
  max-width: 50%;
`;
export const Match = styled.div`
  margin-top: 2rem;
  width: 100%;
`;
export const LastResult = styled.div`
  width: 100%;
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    background-color: var(--bg-blue);
    tr {
      font-size: 12px;
      gap: 10rem;
      th {
        font-weight: 400;
        padding: 0.25rem;
        color: ${COLORS.WHITE};
        span.white {
          color: var(--bg-blue);
          font-size: 12px;
          font-weight: 400;
          padding: 0.1rem;
          width: 10px;
          border-radius: 5px;
          background-color: var(--white);
        }
      }
    }
  }
  tbody {
    gap: 1rem;
    tr {
      border-top: 5px solid var(--white);
      margin-top: 1rem;
      td {
        text-align: center;
        background-color: var(--bg-gray-300);
        > div {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          width: 100%;
          align-items: center;
          div {
            display: flex;
            gap: 5px;
          }
        }
        img {
          max-width: 25px;
        }
      }
      span.loss {
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        font-weight: 800;
        padding: 0.1rem 0.2rem;
        color: var(--white);
        border-radius: 5px;
        background-color: var(--color-red);
      }
      span.victory {
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        font-weight: 800;
        padding: 0.1rem 0.2rem;
        color: ${COLORS.WHITE};
        border-radius: 5px;
        background-color: var(--green);
      }
      span.atie {
        text-align: center;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-size: 26px;
        font-weight: 800;
        padding: 0.1rem 0.2rem;
        color: var(--white);
        border-radius: 5px;
        background-color: var(--bg-gray);
      }
    }
  }
`;
export const FirstMatch = styled.div`
  margin-top: 2rem;
`;
export const Aposte = styled.a`
  background-color: var(--green);
  padding: 0.1rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  color: var(--white);
`;

export const Content = styled.div`
  margin-top: 1.5rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;
export const ContentHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin-bottom: 1rem;
  @media screen {
  }
  div {
    flex: 1;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  p {
    font-size: 16px;
    text-align: center;
  }
  .bold {
    font-weight: 800;
    font-size: 20px;
  }
`;
