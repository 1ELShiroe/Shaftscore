import React from "react";
import styled from "styled-components";
import GameVersus from "./GameVersus";
const Container = styled.div`
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
`;
const Title = styled.p`
  font-size: 30px;
  text-align: center;
  font-weight: 800;
  margin-top: 1rem;
`;

const Match = ({ data }) => {
  return (
    <div style={{ width: "100%" }}>
      <Title style={{ color: "white" }}>Partidas anteriores</Title>

      {data?.map((p, index) => (
        <Container>
          <h6 style={{ color: "white" }}>Partida {index + 1}</h6>
          {p?.map((g) => (
            <GameVersus data={g} />
          ))}
        </Container>
      ))}
    </div>
  );
};

export default Match;
