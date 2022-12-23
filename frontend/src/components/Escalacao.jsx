import React from "react";
import styled from "styled-components";
import { Player } from "../assets/svgs";
import Campo from "../assets/svgs/campo.png";

const Container = styled.div`
  width: 100%;
  position: relative;
  /* max-height: 900px; */
  svg {
    width: 110px !important;
  }
  img {
    max-width: 100%;
    z-index: -1;
  }
  @media (max-width: 1200px) {
    transform: rotate(90deg);
    margin: 12rem 0;
  }
  @media (max-width: 1000px) {
    svg {
      width: 80px !important;
    }
  }
  @media (max-width: 800px) {
    svg {
      width: 60px !important;
    }
  }

  @media (max-width: 600px) {
    svg {
      width: 40px !important;
    }
  }
`;

const Wrapper = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  padding: 1.2% 4.5%;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Team = styled.div`
  z-index: 3;
  display: flex;
  justify-content: space-between;
  width: 49%;
  align-items: center;
  height: 100%;

  div {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const Escalacao = () => {
  var WIDTH = 100;
  var house = "red";
  var fora = "yellow";

  return (
    <Container>
      <img src={Campo} />
      <Wrapper>
        <Team>
          {/* Goleiro */}
          <div>
            <Player width={WIDTH} color={house} />
          </div>
          <div
            style={{
              flexDirection: "column",
            }}
          >
            <Player width={WIDTH} color={house} />
            <Player width={WIDTH} color={house} />
            <Player width={WIDTH} color={house} />
            <Player width={WIDTH} color={house} />
          </div>
          <div
            style={{
              flexDirection: "column",
            }}
          >
            <Player width={WIDTH} color={house} />
            <Player width={WIDTH} color={house} />
          </div>
          <div
            style={{
              flexDirection: "column",
            }}
          >
            <Player width={WIDTH} color={house} />
            <Player width={WIDTH} color={house} />
            <Player width={WIDTH} color={house} />
          </div>
          <div
            style={{
              flexDirection: "column",
            }}
          >
            <Player width={100} color="red" />
          </div>
        </Team>

        <Team style={{ flexDirection: "column-revese" }}>
          <div>
            <Player width={WIDTH} color={fora} />
          </div>
          <div
            style={{
              flexDirection: "column",
            }}
          >
            <Player width={WIDTH} color={fora} />
            <Player width={WIDTH} color={fora} />
            <Player width={WIDTH} color={fora} />
            <Player width={WIDTH} color={fora} />
          </div>
          <div
            style={{
              flexDirection: "column",
            }}
          >
            <Player width={WIDTH} color={fora} />
            <Player width={WIDTH} color={fora} />
          </div>
          <div
            style={{
              flexDirection: "column",
            }}
          >
            <Player width={WIDTH} color={fora} />
            <Player width={WIDTH} color={fora} />
            <Player width={WIDTH} color={fora} />
          </div>
          <div
            style={{
              flexDirection: "column",
            }}
          >
            <Player width={100} color={fora} />
          </div>
        </Team>
      </Wrapper>
    </Container>
  );
};

export default Escalacao;
