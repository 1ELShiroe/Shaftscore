import React, { useEffect, useState } from "react";
import styled from "styled-components";
import color from "../assets/colors/color";
import moment from "moment";

const Container = styled.div`
  width: 95%;
  position: relative;
  margin: 0 auto;
  margin-bottom: 10px;
  background-color: var(--bg-gray-300);
  padding: 1rem;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
const Informations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Win = styled.h2`
  font-weight: 400;
  span {
    font-weight: 800;
    color: var(--green);
  }
`;
const Confronto = styled.div`
  display: flex;
  flex-direction: column;
  span:nth-child(1) {
    font-size: 12px;
    font-weight: 400;
  }
  span:nth-child(2) {
    font-size: 20px;
    font-weight: 600;
  }
`;
const League = styled.div`
  display: flex;
  flex-direction: column;
  span:nth-child(1) {
    font-size: 12px;
    font-weight: 400;
  }
  span:nth-child(2) {
    font-size: 16px;
    font-weight: 600;
    background-color: var(--white);
    padding: 0.25rem 0.5rem;
    border-radius: 10px;
  }
`;
const Date = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2%;
  span:nth-child(1) {
    font-size: 14px;
    font-weight: 600;
  }
  span:nth-child(2) {
    font-size: 16px;
    font-weight: 600;
    color: ${color.WHITE};
    background-color: var(--green);
    padding: 0.25rem 0.5rem;
    border-radius: 10px;
  }
`;
const OddsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  > span {
    font-size: 14px;
  }
  .percent {
    border: 1px solid var(--green);
    width: 100%;
    display: flex;
    border-radius: 10px;
    position: relative;

    justify-content: center;
    span {
      text-align: center;
      font-weight: 800;
      display: flex;
      z-index: 10;
    }
    .background {
      z-index: 2;
      width: 100%;
      margin: 0;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
    }
  }
`;
const Percentual = styled.span`
  background-color: var(--green);
  width: ${(props) => (props.percent ? `${props.percent}` : "0")};
  height: 25px;
`;

const Odds = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
  span:nth-child(1) {
    font-size: 16px;
    font-weight: 800;
    text-align: center;
    width: 100%;
    padding: 0.25rem 0.5rem;
    color: ${color.WHITE};
    background-color: var(--color-red);
    border-radius: 10px 10px 0 0;
  }
  span:nth-child(2) {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    width: 100%;
    background-color: var(--white);
    padding: 0.25rem 0.5rem;
    border-radius: 0 0 10px 10px;
  }
`;

const CardTable = ({ data }) => {
  moment().locale("pt-br");
  return (
    <Container>
      {data && (
        <>
          <Informations>
            <Win>
              Vencedor: <span>{data.guesses}</span>
            </Win>
            <Confronto>
              <span>Confronto</span>
              <span>
                {data.teamTwo} x {data.teamOne}
              </span>
            </Confronto>
            <League>
              <span>Campeonato</span>
              <span>{data.league}</span>
            </League>
            <Date>
              <span>{moment(data.date).format("LL")}</span>
            </Date>
          </Informations>
          <OddsWrapper>
            <Odds>
              <span>{data.odds}</span>
              <span>Odd</span>
            </Odds>
            <span>{data.tips}</span>
            <div className="percent">
              <span className="background">
                <Percentual percent={data.percentage + "%"}></Percentual>
              </span>
              <span>{`${data.percentage}%`}</span>
            </div>
          </OddsWrapper>
        </>
      )}
    </Container>
  );
};

export default CardTable;
