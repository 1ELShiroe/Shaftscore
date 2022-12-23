import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import color from "../assets/colors/color";

const Container = styled.div`
  width: 90%;
  position: relative;
  margin: 0 auto;
  margin-bottom: 10px;
`;
const Header = styled.div`
  border-radius: 10px 10px 0 0;
  background-color: var(--bg-blue);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-weight: 600;
    font-size: 20px;
    color: ${color.WHITE};
  }
`;
const Main = styled.div`
  border-radius: 0 0 10px 10px;
  background-color: var(--bg-gray-300);
  padding: 1rem;
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;
const Item = styled.div`
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--bg-blue);
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
const Win = styled.p`
  font-weight: 600;
  font-size: 20px;
`;
const Odd = styled.p`
  font-weight: 600;
  font-size: 20px;
`;
const Info = styled.p`
  font-weight: 400;
  font-size: 16px;
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    gap: 10px;
  }
  span {
    font-size: 20px;
    font-weight: 800;
  }
  div:nth-child(2) span:nth-child(2) {
    color: var(--green);
  }
`;
const Bilhete = ({ multiple }) => {
  return (
    <Container>
      <Header>
        <span>Bilhete Pronto</span>
        <span>ODDS</span>
      </Header>
      <Main>
        {multiple &&
          multiple?.games.map((item) => (
            <Item>
              <Content>
                <Win>{item.guesses}</Win>
                <Info>{item.confront}</Info>
              </Content>
              <Odd>{item.odds}</Odd>
            </Item>
          ))}
        <Footer>
          <div>
            <span>Valor:</span>
            <span>{multiple.value}</span>
          </div>
          <div>
            <span>Retorno:</span>
            <span>{multiple.profit}</span>
          </div>
        </Footer>
      </Main>
    </Container>
  );
};

export default Bilhete;
