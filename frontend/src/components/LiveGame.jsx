import React from "react";
import styled from "styled-components";
import { Gol, Substituicao, Cartao } from "../assets/svgs/index";
import Relato from "../components/Relato";

const LiveGame = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;
const Legend = styled.div`
  display: flex;
  width: 100%;
  gap: 1rem;
  margin-top: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 50px;
    justify-content: space-between;
    p {
      font-size: 12px;
    }
  }
`;

const ContentRelato = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const Live = ({ data, home }) => {
  return (
    <LiveGame>
      <Legend>
        <div>
          <Gol width={20} color="green" />
          <p>Gol</p>
        </div>
        <div>
          <Gol width={20} color="red" />
          <p>Gol contra</p>
        </div>
        <div>
          <div>
            <Substituicao width={10} color="green" />
            <Substituicao width={10} color="red" />
          </div>
          <p>Substituição</p>
        </div>
        <div>
          <div>
            <Cartao width={10} color="yellow" />
          </div>
          <p>Cartão Amarelo</p>
        </div>
        <div>
          <div>
            <Cartao width={10} color="red" />
          </div>
          <p>Cartão Vermelho</p>
        </div>
      </Legend>
      <ContentRelato>
        {data &&
          data.map((event) => (
            <Relato
              house
              // type={event.type}
              // detail={event.detail}
              player={event.player.name}
              time={event.time.elapsed}
              description={"Por jogar muito bem"}
            />
          ))}
      </ContentRelato>
    </LiveGame>
  );
};

export default Live;
