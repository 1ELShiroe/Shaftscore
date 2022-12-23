import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import color from "../assets/colors/color";
import { Cartao, Gol } from "../assets/svgs";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-gray-300);
  border-radius: 10px;
  padding: 0.8rem;
  justify-content: flex-end;
  align-items: ${(props) => (props.house ? "end" : "start")};
`;

const Icon = styled.div`
  display: flex;
  gap: 1rem;
`;
const Description = styled.p`
  font-size: 20px;
  font-weight: 800;
`;
const Comment = styled.p`
  font-size: 16px;
  color: var(--bg-blue);
`;

const Relato = ({ player, time, description, cartao, gol, house }) => {
  useEffect(() => {}, [cartao, gol]);
  return (
    <Container house={house}>
      <Icon>
        <Description>{time}'</Description>
        {cartao != null ? (
          cartao === "vermelho" ? (
            <Cartao width={20} color="red" />
          ) : (
            <Cartao width={20} color="yellow" />
          )
        ) : null}

        {gol != null ? (
          gol === true ? (
            <Gol width={20} color="green" />
          ) : (
            <Gol width={20} color="red" />
          )
        ) : (
          ""
        )}

        <Description>{player}</Description>
      </Icon>
      <Comment>{description}</Comment>
    </Container>
  );
};

export default Relato;
