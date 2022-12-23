import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import color from "../assets/colors/color";
import img404 from "../assets/images/shaftlogo.png";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--bg-gray-300);
  padding: 0.2rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const GameMatch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 540px) {
      flex-direction: column;
    }
  }
  @media (max-width: 540px) {
    flex-direction: column;
  }
`;

const Date = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  max-width: 100px;

  p {
    font-size: 12px;
    font-weight: 400;
  }
`;
const Times = styled.div`
  display: flex;
  width: 60%;
  margin-right: 10px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1030px) {
    width: 40%;
  }
  @media (max-width: 750px) {
    width: 60%;
  }
  @media (max-width: 540px) {
    width: 90%;
  }
`;
const House = styled.div`
  span {
    display: flex;
    gap: 5px;
    img {
      max-width: 20px;
      object-fit: contain;
    }
  }
  p {
    font-weight: 400;
  }
`;
const Placa = styled.div`
  display: inline-flex;
  flex-direction: column;
  p {
    font-weight: 800;
  }
`;
const Odds = styled.div`
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  div {
    padding: 0.2rem 0.7rem;
    min-width: 70px;
    border-radius: 10px;
    display: flex;
    gap: 1rem;
    background-color: var(--bg-blue);
    span,
    p {
      color: white;
    }
  }

  @media (max-width: 750px) {
    flex-direction: column;
  }
  @media (max-width: 540px) {
    flex-direction: row;
  }
  @media (max-width: 540px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Aposte = styled.a`
  width: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  margin-top: 5px;
  cursor: pointer;
  transition: 500ms;
  &:hover {
    border-radius: 5px;
    background: var(--green);
    color: var(--white);
  }
`;
const Game = ({ data, type, leagueName, leagueID }) => {
  const [awayLogo404, setAwayLogo404] = useState(false);
  const [homeLogo404, setHomeLogo404] = useState(false);
  const date = new window.Date(data.date_unix * 1000);
  const away_logo = awayLogo404
    ? img404
    : `https://cdn.footystats.org/img/${data.away_image}`;
  const home_logo = homeLogo404
    ? img404
    : `https://cdn.footystats.org/img/${data.home_image}`;
  const stringTrade = (name) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ +/g, "-")
      .replace("/", "-")
      .replace(".", "")
      .replace("'", "")
      .replace(":", "")
      .replace(/ı+/g, "i")
      .replace(/-{2,}/g, "-");
  };
  if (type == "Domestic League") type = "liga";
  else type = "international";
  return (
    <>
      <Wrapper>
        <Link
          to={`/jogo/${type}/${stringTrade(leagueName)}/${`${stringTrade(
            data.home_name
          )}-vs-${stringTrade(data.away_name)}`}/${data.id}/${leagueID}`}
        >
          <GameMatch>
            <Date>
              <p>
                {new Intl.DateTimeFormat("pt-BR", {
                  hour: "numeric",
                  minute: "numeric",
                }).format(date)}
              </p>
              <p>
                {" "}
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "short",
                }).format(date)}
              </p>
            </Date>
            <div>
              <Times>
                <House>
                  <span>
                    <img
                      src={home_logo}
                      alt={`logo do time ${data.home_name}`}
                      onError={({ currentTarget }) => setHomeLogo404(true)}
                    />
                    <p>{data.home_name}</p>
                  </span>
                  <span>
                    <img
                      src={away_logo}
                      onError={({ currentTarget }) => setAwayLogo404(true)}
                      alt={`logo do time ${data.away_name}`}
                    />
                    <p>{data.away_name}</p>
                  </span>
                </House>
                <Placa>
                  <p>{data.awayGoalCount}</p>
                  <p>{data.homeGoalCount}</p>
                </Placa>
              </Times>
              <Odds>
                <div>
                  <p>{data["odds_ft_1"]}</p>
                </div>
                <div>
                  <p>{data["odds_ft_x"]}</p>
                </div>
                <div>
                  <p>{data["odds_ft_2"]}</p>
                </div>
              </Odds>
            </div>
          </GameMatch>
        </Link>
      </Wrapper>
    </>
  );
};

export default Game;
