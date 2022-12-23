import styled from "styled-components";
import color from "../../assets/colors/color";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 100%;
`;
export const SubHeader = styled.div`
  background-color: var(--bg-gray-300);
  border-radius: 10px 10px 0 0;
  padding: 1rem;
`;
export const SubHeaderOptions = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: var(--bg-gray-300);

  padding: 1rem;
  border-radius: 0px 0px 10px 10px;
  span {
    padding: 0.3rem 0.5rem;
    border-radius: 10px;

    &.actived,
    &:hover {
      background-color: var(--bg-blue);
      padding: 0.3rem 0.5rem;
      color: ${color.WHITE};
      border-radius: 10px;
      cursor: pointer;
    }
  }
`;

export const Title = styled.p`
  text-align: center;
  font-size: 1.4rem;
  font-weight: 800;
  margin-top: 1rem;
`;

export const Description = styled.p`
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
`;

export const Confronto = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .board {
    font-weight: 800;
    font-size: 36px;
  }
  .time {
    font-size: 16px;
    span {
      color: var(--white);
      font-weight: 800;
      background-color: var(--color-red);
      padding: 0 0.75rem;
      border-radius: 8px;
    }
  }

  @media (max-width: 350px) {
    p {
      font-size: 16px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoJogo = styled.img`
  width: 100px;
  @media (max-width: 350px) {
    width: 30px;
  }
`;

export const Details = styled.div`
  width: 100%;
  margin-top: 1rem;
  p {
    border-radius: 6px;
    background-color: var(--bg-blue);
    color: var(--white);
    font-size: 16px;
  }

  .warning {
    font-weight: 800;
    text-align: end;
    display: flex;
  }

  img {
    max-width: 30px;
    width: 100%;
    object-fit: contain;
  }
`;
export const DetailsConttent = styled.div`
  width: 100%;
  display: flex;
  gap: 0.5rem;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1rem 0;
  }
`;

export const ContentEscalacao = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
export const Information = styled.div`
  display: flex;
  flex-direction: column;
  > div {
    display: flex;
    justify-content: space-around;
  }

  span {
    font-weight: 800;
    font-size: 26px;
  }
`;

export const ContentTitulares = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid var(--bg-gray-300);
`;

export const Titular = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--bg-gray-300);
  > span {
    font-size: 26px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: var(--color-red);
    color: var(--white);
  }
  div {
    p {
      max-width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span {
      font-size: 16px;
    }
  }
`;

export const ContentEstatisticas = styled.div`
  margin-top: 1rem;
  width: 100%;
  .Gols_obtidos {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
    margin-top: 1rem;
    > div {
      display: flex;
      width: 100%;
      justify-content: center;
      > div {
        display: flex;
        flex-direction: column;
      }
    }
    img {
      max-width: 50px;
      object-fit: contain;
    }
  }

  table {
    margin-top: 2rem;
    > thead {
      background-color: #bdbdbd;
    }
  }
`;

export const GraficGame = styled.div`
  width: 350px;
  height: 20px;
  background-color: ${color.BACKGROUND_GRAY_300};
  border-radius: 5px;
  > div {
    width: ${(props) =>
      props.percent && props.percent >= 100
        ? +"100%"
        : props.percent + "%"} !important;
    display: flex;
    height: 20px;
    border-radius: 5px;
    background-color: var(--color-red);
  }
`;

export const HeaderOptions = styled.div`
  margin: 1rem 0;
  min-height: 40px;
  width: 100%;
  border-radius: 2px;
  background-color: var(--bg-blue);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.25rem;
  span {
    color: ${color.WHITE};
    font-weight: 800;
    padding: 0.5rem 2rem;
    text-align: center;
    cursor: pointer;
    transition: 500ms;
    &:hover {
      border-radius: 5px;
      background-color: var(--white);
      color: var(--bg-blue);
    }
  }
  .actived {
    border-radius: 5px;
    background-color: var(--white);
    color: var(--bg-blue);
  }
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: var(--bg-gray-300);
    tr {
      font-size: 12px;
      gap: 10rem;
      th {
        font-weight: 400;
        padding: 0.25rem;
      }
    }
  }
  tbody {
    tr {
      /* background-color: ${color.BACKGROUND_GRAY_300}; */
      td {
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .bold {
      font-weight: 800;
    }
  }
  /* @media (max-width: 700px) {
    width: 700px;
    overflow-x: scroll;
  } */
`;

export const Canto = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  > div {
    align-items: center;
    display: flex;
    justify-content: center;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;

      span {
        font-size: 26px;
        font-weight: 800;
      }
    }
  }
  img {
    max-width: 50px;
    object-fit: contain;
  }
`;
