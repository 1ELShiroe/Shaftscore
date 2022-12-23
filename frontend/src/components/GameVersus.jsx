import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
export const Games = styled.div`
  width: 250px;
  width: 100%;

  display: flex;
  background-color: var(--white);
  padding: 0.5rem;
  border-radius: 0.2rem;
  flex-direction: column;
  img {
    width: 20px;
    object-fit: contain;
  }
  .match {
    justify-content: space-between;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    p {
      color: var(--black);
    }
  }
  .game {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    p {
      max-width: 150px;
      height: 25px;
      width: 80%;
      display: flex;
      color: var(--black);
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .placar {
    display: flex;
    width: 30px;
    justify-content: space-between;
    align-items: center;
    p {
      text-align: center;
      width: 30px;
    }
  }
`;

const GameVersus = ({ data, champions }) => {
  return (
    <>
      {champions ? (
        <Games key={data.id}>
          <div className="match">
            <div className="game">
              {/* <img src={data.home.img} alt={data.home.name} /> */}
              <p style={{ width: "300px" }}>{data[0].home_name}</p>
            </div>
            <div className="placar">
              <p>{data[0].homeGoalCount ? data.homeGoalCount : "-"}</p>
              <p>{data[0].awayGoalCount ? data.awayGoalCount : "-"}</p>
            </div>
          </div>
          <div className="match">
            <div className="game">
              {/* <img src={data.away.img} alt={data.away.name} /> */}
              <p style={{ width: "300px" }}>{data[0].away_name}</p>
            </div>
            <div className="placar">
              <p>{data[0].awayGoalCount ? data.awayGoalCount : "-"}</p>
              <p>{data[1].homeGoalCount ? data.homeGoalCount : "-"}</p>
            </div>
          </div>
        </Games>
      ) : (
        <Games key={data.id}>
          <div className="match">
            <div className="game">
              <img src={data.home.img} alt={data.home.name} />
              <p>{data.home.name}</p>
            </div>
            <div className="placar">
              <p>{data.home.goals.length}</p>
            </div>
          </div>
          <div className="match">
            <div className="game">
              <img src={data.away.img} alt={data.away.name} />
              <p>{data.away.name}</p>
            </div>
            <div className="placar">
              <p>{data.away.goals.length}</p>
            </div>
          </div>
        </Games>
      )}
    </>
  );
};

export default GameVersus;
