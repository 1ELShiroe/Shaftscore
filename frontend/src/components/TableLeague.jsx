import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { leagueLegends } from "../Ultils/Utils";

export const Content = styled.div`
  width: 100%;

  ::-webkit-scrollbar {
    height: 4px;
  }

  ::-webkit-scrollbar-track {
    margin-top: 10px;
    background: var(--bg-gray-300);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--bg-gray);
    border-radius: 10px;
  }
  @media (max-width: 700px) {
    overflow-x: scroll;
  }
`;
export const TableLeagueComponent = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 700px) {
    width: 700px;
    overflow-x: scroll;
  }
  thead {
    background-color: var(--bg-blue);
    tr {
      th {
        color: white;
      }
      th:nth-child(1) {
        text-align: start;
      }
    }
  }

  tbody {
    width: 100%;
    img {
      width: 20px;
      height: 20px;
    }

    tr {
      td:nth-child(1) {
        width: 400px;
      }
      td {
        vertical-align: middle;
        text-align: center;
        > div {
          display: flex;
          align-items: center;
          span {
            width: 22px;
            height: 22px;
            overflow: hidden;
            display: flex;
            font-size: 12px;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 0.5rem;
            color: white;
          }
          div {
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }
        }
      }
    }
    .lastGames {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .green {
      background-color: green;
    }
    .blue {
      background-color: blue;
    }
    .blue_ligth {
      background-color: #6565ff;
    }
    .red {
      background-color: red;
    }
    .aTie {
      color: var(--black);
      background-color: var(--bg-gray-300);
    }
  }
`;
export const Legends = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  .green {
    background-color: green;
  }
  .blue {
    background-color: blue;
  }
  .blue_ligth {
    background-color: #6565ff;
  }
  .red {
    background-color: red;
  }
  .yellow {
    background-color: #ceeba1;
  }
  div {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    div {
      width: 15px;
      height: 15px;
      border-radius: 3px;
    }
  }
`;

const colorZone = ["green", "blue", "blue_ligth"];
const TableLeague = ({
  leagueName,
  matches,
  type,
  legends,
  tablesPositionGame,
  country,
}) => {
  let resultFilter = leagueLegends(legends, colorZone);
  if (type === "1") {
    matches.map((i) => {
      resultFilter.forEach((e) => {
        if (e.type == i.zone.name) {
          i.zone.name = e.color;
        } else if (i.zone.name != null && i.zone.name.includes("Relegation")) {
          i.zone.name = "red";
        }
      });
    });
  } else {
    tablesPositionGame &&
      tablesPositionGame.table?.map((i) => {
        resultFilter.forEach((e) => {
          if (e.type == i.zone.name) {
            i.zone.name = e.color;
          } else if (
            i.zone.name != null &&
            i.zone.name.includes("Relegation")
          ) {
            i.zone.name = "red";
          }
        });
      });
  }
  let last_5;
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
  function justNumbers(text) {
    var numbers = text.replace(/[^0-9]/g, "");
    return parseInt(numbers);
  }
  return (
    <Content>
      {type === "1" ? (
        <TableLeagueComponent>
          <thead>
            <tr>
              <th>{leagueName}</th>
              <th>J</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th>G</th>
              {matches[0].wdl_record ? <th>Últimos 5</th> : ""}
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((i, index) => {
              if (i.matchesPlayed == 0) i.wdl_record = "EL";
              return (
                <tr key={index}>
                  <td>
                    <div>
                      <span className={i.zone.name ? i.zone.name : "aTie"}>
                        {i.position}
                      </span>
                      <div>
                        <img
                          src={`https://cdn.footystats.org/img/teams/${
                            i.country
                              ? i.country.replace(" ", "-").toLowerCase()
                              : country.toLowerCase()
                          }-${i.shortHand}_thumb.png`}
                          alt={i.cleanName}
                        />
                        <Link
                          to={`/equipe/${stringTrade(i.cleanName)}/${i.id}`}
                        >
                          <p>{i.cleanName}</p>
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>{i.matchesPlayed}</td>
                  <td>{i.seasonWins_overall}</td>
                  <td>{i.seasonDraws_overall}</td>
                  <td>{i.seasonLosses_overall}</td>
                  <td>{i.seasonGoals}</td>
                  {i.wdl_record ? (
                    <td>
                      <div className="lastGames">
                        {i.wdl_record
                          ? i.wdl_record
                              .substring(
                                i.wdl_record.length - 5,
                                i.wdl_record.length
                              )
                              .split("")
                              .reverse()
                              .map((m) => {
                                if (m == "l")
                                  return <span className="red">D</span>;
                                if (m == "w")
                                  return <span className="green">V</span>;
                                if (m == "d")
                                  return <span className="aTie">E</span>;
                                if (m == "EL")
                                  return <span className="aTie">N</span>;
                              })
                          : ""}
                      </div>
                    </td>
                  ) : (
                    ""
                  )}
                  <td>{i.points}</td>
                </tr>
              );
            })}
          </tbody>
        </TableLeagueComponent>
      ) : (
        <TableLeagueComponent>
          <thead>
            <tr>
              <th>{leagueName}</th>
              <th>J</th>
              <th>V</th>
              <th>E</th>
              <th>D</th>
              <th>G</th>
              <th>Últimos 5</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>
            {/* {tablesPositionGame.map((i, index) => (
              <tr key={index}>
                <td>
                  <div>
                    <span className={i.description ? i.description : "aTie"}>
                      {i.rank}
                    </span>
                    <div>
                      <img src={i.team.logo} alt={i.team.name} />
                      <a href="#">{i.team.name}</a>
                    </div>
                  </div>
                </td>
                <td>{i.all.played}</td>
                <td>{i.all.win}</td>
                <td>{i.all.draw}</td>
                <td>{i.all.lose}</td>
                <td>
                  {i.all.goals.for}:{i.all.goals.against}
                </td>
                <td>
                  {}
                  <div className="lastGames">
                    {i.form.split("").map(
                      (a, index) =>
                        index < 5 && (
                          <>
                            {a === "W" && <span className="green">V</span>}
                            {a === "L" && <span className="red">D</span>}
                            {a === "D" && <span className="aTie">E</span>}
                          </>
                        )
                    )}
                  </div>
                </td>
                <td>{i.points}</td>
              </tr>
            ))} */}
          </tbody>
        </TableLeagueComponent>
      )}
      <Legends>
        {legends &&
          legends.map((l, index) => (
            <div>
              <div
                className={l.includes("Relegation") ? "red" : colorZone[index]}
              ></div>
              <p>
                {l === "Relegation" ? "Rebaixado" : `Classificação para ${l}`}
              </p>
            </div>
          ))}
      </Legends>
    </Content>
  );
};

export default TableLeague;
