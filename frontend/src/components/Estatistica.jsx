import React from "react";
import { useEffect } from "react";
// import { useState } from "react";
import styled from "styled-components";
import color, { BACKGROUND_GRAY } from "../assets/colors/color";

const Container = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const PercentWrapper = styled.div``;

const PercentInfomartion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Descriptions = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Description = styled.p`
  font-weight: 800;
  color: var(--bg-blue);
`;

const PercentContent = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
`;
const Percent = styled.div`
  width: 50%;
  background-color: var(--bg-gray-300);
  height: 15px;
  border-radius: 5px;
  z-index: 0;
  display: flex;
  justify-content: ${(props) => (props.right ? "flex-start" : "flex-end")};
`;

const Background = styled.div`
  width: ${(props) => props.percentual && props.percentual + "%"};
  height: 100%;
  background-color: var(--color-red);
  z-index: 10;
  transition: all 0.2s ease;
`;

const Estatistica = ({ data }) => {
  return (
    <Container>
      {data && (
        <PercentWrapper>
          {/* Posse de Bola */}
          <PercentInfomartion>
            <Descriptions>
              <Description>
                {data.team_a_possession == "-1" ? 0 : data.team_a_possession}
              </Description>
              <Description>Posse de bola</Description>
              <Description>
                {data.team_b_possession == "-1" ? 0 : data.team_b_possession}
              </Description>
            </Descriptions>
            <PercentContent>
              <Percent>
                <Background percentual={data.team_a_possession} />
              </Percent>
              <Percent right>
                <Background percentual={data.team_b_possession} />
              </Percent>
            </PercentContent>
          </PercentInfomartion>
          {/* Escanteios */}
          <PercentInfomartion>
            <Descriptions>
              <Description>
                {data.team_a_corners == "-1" ? 0 : data.team_a_corners}
              </Description>
              <Description>Escanteios</Description>
              <Description>
                {data.team_b_corners == "-1" ? 0 : data.team_b_corners}
              </Description>
            </Descriptions>
            <PercentContent>
              <Percent>
                <Background percentual={data.team_a_corners} />
              </Percent>
              <Percent right>
                <Background percentual={data.team_b_corners} />
              </Percent>
            </PercentContent>
          </PercentInfomartion>
          {/* Total de chutes  */}
          <PercentInfomartion>
            <Descriptions>
              <Description>
                {data.team_a_shots == "-1" ? 0 : data.team_a_shots}
              </Description>
              <Description>Total de chutes</Description>
              <Description>
                {data.team_b_shots == "-1" ? 0 : data.team_b_shots}
              </Description>
            </Descriptions>
            <PercentContent>
              <Percent>
                <Background percentual={data.team_a_shots} />
              </Percent>
              <Percent right>
                <Background percentual={data.team_b_shots} />
              </Percent>
            </PercentContent>
          </PercentInfomartion>
          {/* Chutes fora  */}
          <PercentInfomartion>
            <Descriptions>
              <Description>
                {data.team_a_shotsOnTarget == "-1"
                  ? 0
                  : data.team_a_shotsOnTarget}
              </Description>
              <Description>Chutes fora</Description>
              <Description>
                {data.team_b_shotsOnTarget == "-1"
                  ? 0
                  : data.team_b_shotsOnTarget}
              </Description>
            </Descriptions>
            <PercentContent>
              <Percent>
                <Background percentual={data.team_a_shotsOnTarget} />
              </Percent>
              <Percent right>
                <Background percentual={data.team_b_shotsOnTarget} />
              </Percent>
            </PercentContent>
          </PercentInfomartion>
          {/* Impedimentos  */}
          <PercentInfomartion>
            <Descriptions>
              <Description>
                {data && data.team_a_offsides == "-1"
                  ? 0
                  : data.team_a_offsides}
              </Description>
              <Description>Impedimentos</Description>
              <Description>
                {data && data.team_b_offsides == "-1"
                  ? 0
                  : data.team_b_offsides}
              </Description>
            </Descriptions>
            <PercentContent>
              <Percent>
                <Background percentual={data.team_a_offsides} />
              </Percent>
              <Percent right>
                <Background percentual={data.team_b_offsides} />
              </Percent>
            </PercentContent>
          </PercentInfomartion>
          {/* Faltas  */}
          <PercentInfomartion>
            <Descriptions>
              <Description>
                {data && data.team_a_fouls == "-1" ? 0 : data.team_a_fouls}
              </Description>
              <Description>Faltas</Description>
              <Description>
                {data && data.team_b_fouls == "-1" ? 0 : data.team_b_fouls}
              </Description>
            </Descriptions>
            <PercentContent>
              <Percent>
                <Background percentual={data.team_a_fouls} />
              </Percent>
              <Percent right>
                <Background percentual={data.team_b_fouls} />
              </Percent>
            </PercentContent>
          </PercentInfomartion>
          {/* Cartões vermelho  */}
          <PercentInfomartion>
            <Descriptions>
              <Description>
                {data && data.team_a_red_cards == "-1"
                  ? 0
                  : data.team_a_red_cards}
              </Description>
              <Description>Cartões Vermelho</Description>
              <Description>
                {data && data.team_b_red_cards == "-1"
                  ? 0
                  : data.team_b_red_cards}
              </Description>
            </Descriptions>
            <PercentContent>
              <Percent>
                <Background percentual={data.team_a_red_cards} />
              </Percent>
              <Percent right>
                <Background percentual={data.team_b_red_cards} />
              </Percent>
            </PercentContent>
          </PercentInfomartion>
          {/* Cartões amarelo  */}
          <PercentInfomartion>
            <Descriptions>
              <Description>
                {data.team_a_yellow_cards == "-1"
                  ? 0
                  : data.team_a_yellow_cards}
              </Description>
              <Description>Cartões Amarelo</Description>
              <Description>
                {data.team_b_yellow_cards == "-1"
                  ? 0
                  : data.team_b_yellow_cards}
              </Description>
            </Descriptions>
            <PercentContent>
              <Percent>
                <Background percentual={data.team_a_yellow_cards / 2} />
              </Percent>
              <Percent right>
                <Background percentual={data.team_b_yellow_cards / 2} />
              </Percent>
            </PercentContent>
          </PercentInfomartion>
        </PercentWrapper>
      )}
    </Container>
  );
};

export default Estatistica;
