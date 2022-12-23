import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
  margin-bottom: 2rem;
`;
export const Title = styled.p`
  font-size: 30px;
  text-align: center;
  font-weight: 800;
  margin-top: 1rem;
`;

export const SubHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem;
  img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
  }
`;

export const LastResult = styled.div`
  width: 100%;
  background-color: var(--bg-blue);
  margin: 1rem 0;
  border-radius: 0.2rem;
  padding: 1rem;

  > p {
    color: var(--white);
  }

  > div {
    display: flex;
    gap: 0.2rem;
    width: 100%;
    overflow-x: scroll;
    margin-bottom: 1rem;
    ::-webkit-scrollbar {
      height: 4px; /* width of the entire scrollbar */
    }

    ::-webkit-scrollbar-track {
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--white);
      border-radius: 10px;
    }
  }
`;

export const Math = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;

  h6 {
    font-size: 14px;
    font-weight: 500;
    color: var(--white);
  }
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const Heatmap = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  margin-top: 1rem;

  .color {
    width: 100%;
    /* height: 30px; */
    display: inline-flex;
    padding: 1rem;
    border-radius: 5px;
    justify-content: center;

    p {
      font-weight: 800;
      color: var(--black);
    }
  }
  .green {
    background-color: var(--green);
  }
  .yellow {
    background-color: #d6d662;
  }
  .red {
    background-color: var(--color-red);
  }
  @media (max-width: 580px) {
    flex-direction: column;
  }
`;
export const Over = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  @media (max-width: 580px) {
    width: 100%;
  }
  > p {
    text-align: center;
    background-color: var(--bg-gray-300);
    font-weight: 800;
    border-radius: 5px;
  }

  div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--bg-gray-300);
    p {
      background-color: transparent;
    }
    span {
      font-weight: 800;
    }
  }
`;

export const Gol = styled.div`
  width: 50%;

  display: flex;
  flex-direction: column;

  @media (max-width: 580px) {
    width: 100%;
  }
  > p {
    text-align: center;
    background-color: var(--bg-gray-300);
    font-weight: 800;
    border-radius: 5px;
  }
  > div {
    display: flex;
    gap: 0.1rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      flex-direction: column;

      p {
        vertical-align: middle;
        text-align: center;
      }
    }
  }
  .graficWrapper {
    height: 220px;
    display: flex;
    align-items: flex-end;
  }
`;

export const Percent = styled.div`
  display: flex;

  height: ${(props) =>
    props.percent ? (props.percent / 100) * 220 + "%" : null};
  width: 15px;
  background: linear-gradient(0deg, #ba0000 0, #e0b747 100px, #2e8b57 200px);
`;

export const Estatistica = styled.div`
  width: 100%;
  > p {
    text-align: center;
    background-color: var(--bg-gray-300);
    font-weight: 800;
    border-radius: 5px;
  }

  span {
    font-weight: 800;
  }
  div {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--bg-gray-300);
  }
`;
export const Canto = styled.div`
  width: 100%;
  > p {
    text-align: center;
    background-color: var(--bg-gray-300);
    font-weight: 800;
    border-radius: 5px;
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .wrapper {
      display: flex;
      flex-direction: column;
      .subHeader {
        text-align: center;
        span {
          font-weight: 800;
          font-size: 16px;
        }
        p {
          font-weight: 500;
          font-size: 14px;
        }
      }

      > div:nth-child(2) {
        display: flex;
        gap: 1rem;
        .content {
          text-align: center;
          span,
          p {
            font-weight: 600;
            font-size: 14px;
          }
        }
      }
    }
  }
`;

export const GPP = styled.div`
  width: 100%;

  > div {
    display: flex;
    gap: 0.5rem;
    @media (max-width: 580px) {
      flex-direction: column;
    }
  }
`;

export const Frequencia = styled.div`
  > p {
    text-align: center;
    background-color: var(--bg-gray-300);
    font-weight: 800;
    border-radius: 5px;
  }
  > div {
    overflow-y: scroll;
    height: 150px;

    ::-webkit-scrollbar {
      width: 4px; /* width of the entire scrollbar */
    }

    ::-webkit-scrollbar-track {
      margin-top: 10px;
      background: var(--bg-gray-300);
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--bg-gray-300);
      border-radius: 10px;
    }

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.25rem;
      > div {
        width: 300px;
      }
    }
  }
`;

export const Grafic = styled.div`
  height: 20px;
  width: ${(props) => props.percent && props.percent * 3 + "%"};
  display: flex;
  border-radius: 2px;
  background-color: var(--green);
  z-index: 2;
`;

export const EstatísticasJogador = styled.div`
  width: 100%;
  .header {
    background-color: var(--bg-blue);
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.5rem;
    p {
      font-weight: 800;
      font-size: 16px;
      color: white;
    }
  }

  .body {
    overflow-y: scroll;
    height: 150px;

    ::-webkit-scrollbar {
      width: 4px; /* width of the entire scrollbar */
    }

    ::-webkit-scrollbar-track {
      margin-top: 10px;
      background: var(--bg-gray-300);
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--bg-gray);
      border-radius: 10px;
    }
    div {
      display: flex;
      justify-content: space-between;

      p,
      span {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
`;

export const EstatísticasClub = styled.div`
  width: 100%;
  .header {
    background-color: var(--bg-blue);
    border-radius: 5px;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.5rem;
    p {
      font-weight: 800;
      font-size: 16px;
      color: white;
    }
  }

  .body {
    > div {
      display: flex;
      justify-content: space-between;
      > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        img {
          max-width: 20px;
          object-fit: contain;
        }
      }
      p,
      span {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
`;
export const Golos = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  > div {
    display: flex;
    align-items: center;
    flex-direction: column;

    p {
      font-size: 14px;
    }
  }

  span {
    font-weight: 800;
    font-size: 20px;
  }
`;
export const Informations = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;

  width: 100%;

  gap: 1rem;

  a {
    color: var(--black);
    text-decoration: underline;
  }
`;
