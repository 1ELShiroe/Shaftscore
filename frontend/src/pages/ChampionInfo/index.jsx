import React from "react";
import {
  Main,
  SubHeader,
  Title,
  LastResult,
  Math,
  Over,
  Heatmap,
  Gol,
  Percent,
  Estatistica,
  Canto,
  GPP,
  Frequencia,
  Grafic,
  EstatísticasJogador,
  EstatísticasClub,
  Golos,
  Informations,
} from "./styles";
import moment from "moment/moment";
import TableLeague from "../../components/TableLeague";
import { FirstMatch, Table, Aposte } from "../Equipe/styles";

import {
  CantoIcon,
  Cartao,
  Gol as GolIcon,
  Lencois,
  Reply,
  Stop,
} from "../../assets/svgs";

import { Link, useParams } from "react-router-dom";
import GameVersus from "../../components/GameVersus";
import { useEffect } from "react";
import Api from "../../services/Api";
import { useState } from "react";

function Index() {
  const [data, setData] = useState();
  const [week, setWeek] = useState([]);
  const [playersOffs, setPlayerOffs] = useState([]);
  const [tablesPositionGame, setTablesPositionGame] = useState();
  const [table, setTable] = useState(null);

  let zones = [];
  const params = useParams();
  var dateLive = [];
  useEffect(() => {
    const getLeague = async () => {
      const res = await Api.get(`/tabela?id=${params.id_footy}`);
      setData(res.data.data);
      setTable(res.data.table);
      setTablesPositionGame(res.data.table);
    };
    getLeague();
  }, [params]);

  table &&
    table.specific_tables.map((col) => {
      zones.push(col.round);
    });
  zones = [...new Set(zones)];
  zones = zones.filter((i) => {
    return i;
  });

  return (
    <Main>
      {data && (
        <>
          <SubHeader>
            <img src={data.image} alt="" />
            <div>
              <h1>{data.name_pt}</h1>
              <p>{data.country}</p>
            </div>
          </SubHeader>
          <TableLeague
            type={"1"}
            leagueName={data.name_pt}
            matches={table.all_matches_table_overall}
            legends={null}
            country={data.country}
          />

          {/* Partidas de hoje */}
          <FirstMatch>
            <Title>Partidas de Hoje</Title>
            <Table>
              <thead>
                <tr>
                  <th style={{ color: "white" }}>Data</th>
                  <th style={{ color: "white" }}>Confronto</th>
                  <th style={{ color: "white" }}>Aposte</th>
                </tr>
              </thead>
              <tbody>
                {dateLive.map(
                  (l, index) =>
                    index < dateLive.length / 2 && (
                      <tr key={index}>
                        <td>{moment.unix(l.date).format("DD/MM/YYYY")}</td>
                        <td>
                          <div>
                            <div>
                              <img src={l.away.img} />
                              <p>{l.home.name}</p>
                            </div>
                          </div>
                          <div>
                            <div>
                              <img
                                src={`https://static.shaftscore.com/escudos/${l.away.id}.png`}
                              />
                              <p>{l.away.name}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Link to={"/"}>
                            <Aposte>Aposte</Aposte>
                          </Link>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </Table>
          </FirstMatch>
          {/* Partidas anteriores */}
          <LastResult>
            <Title style={{ color: "white" }}>Partidas anteriores</Title>
            <div>
              {week.map((p, index) => (
                <Math key={p.id}>
                  <h6 style={{ color: "white" }}>Partida {index + 1}</h6>
                  {p.map((g) => (
                    <GameVersus data={g} />
                  ))}
                </Math>
              ))}
            </div>
          </LastResult>
          {/* {playersOffs && (
            <LastResult>
              <Title style={{ color: "white" }}>Players off</Title>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Math>
                  <h6 style={{ color: "white" }}>Oitavas de finais </h6>
                  {playersOffs.map((p, index) => (
                    <GameVersus data={p} champions />
                  ))}
                </Math>
                <Math>
                  <h6 style={{ color: "white" }}>Quartas de finais </h6>
                  {playersOffs.map(
                    (p, index) => index < 4 && <GameVersus data={p} champions />
                  )}
                </Math>
                <Math>
                  <h6 style={{ color: "white" }}>Semi de finais </h6>
                  {playersOffs.map(
                    (p, index) => index < 2 && <GameVersus data={p} champions />
                  )}
                </Math>
                <Math>
                  <h6 style={{ color: "white" }}>Final </h6>
                  {playersOffs.map(
                    (p, index) => index < 1 && <GameVersus data={p} champions />
                  )}
                </Math>
              </div>
            </LastResult>
          )} */}

          {/* <Rounds /> */}
          <Title>Heatmap de Gols</Title>
          <Heatmap>
            <Golos>
              <div>
                <span>{data.seasonAVG_overall}</span>
                <p>gols por jogos</p>
              </div>
              <div>
                <p>
                  <span>{data.seasonAVG_home}</span> Gols (Mandante)
                </p>
                <p>
                  <span>{data.seasonAVG_away}</span> Gols (Visitante)
                </p>
              </div>
            </Golos>
            <Golos>
              <div>
                <span>
                  <GolIcon width={15} color="black" />{" "}
                  {data.seasonBTTSPercentage}%
                </span>
                <p>
                  Ambas equipes marcam ({data.btts_matches} em{" "}
                  {data.matchesCompleted} jogos)
                </p>
              </div>
            </Golos>
            <Golos>
              <div>
                <span>
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="shield-halved"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width={15}
                    class="svg-inline--fa fa-shield-halved"
                  >
                    <path
                      fill="currentColor"
                      d="M256-.0078C260.7-.0081 265.2 1.008 269.4 2.913L457.7 82.79C479.7 92.12 496.2 113.8 496 139.1C495.5 239.2 454.7 420.7 282.4 503.2C265.7 511.1 246.3 511.1 229.6 503.2C57.25 420.7 16.49 239.2 15.1 139.1C15.87 113.8 32.32 92.12 54.3 82.79L242.7 2.913C246.8 1.008 251.4-.0081 256-.0078V-.0078zM256 444.8C393.1 378 431.1 230.1 432 141.4L256 66.77L256 444.8z"
                      class=""
                    ></path>
                  </svg>{" "}
                  {data.seasonCSPercentage}%
                </span>
                <p>
                  Chutes limpo ({data.clean_sheets_total} em{" "}
                  {data.matchesCompleted} jogos)
                </p>
              </div>
            </Golos>
          </Heatmap>
          <Heatmap>
            <div className="green color">
              <p>Vitória Mandante: {data.homeWinPercentage}%</p>
            </div>
            <div className="yellow color">
              <p>Vitória Mandante: {data.awayWinPercentage}%</p>
            </div>
            <div className="red color">
              <p>Vitória Mandante: {data.drawPercentage}%</p>
            </div>
          </Heatmap>
          {/* Over */}
          <Heatmap>
            <Over>
              <p>Over+</p>
              <div>
                <p>Over 0.5</p>
                <span>{data.seasonOver05Percentage_overall}%</span>
              </div>
              <div>
                <p>Over 1.5</p>
                <span>{data.seasonOver15Percentage_overall}%</span>
              </div>
              <div>
                <p>Over 2.5</p>
                <span>{data.seasonOver25Percentage_overall}%</span>
              </div>
              <div>
                <p>Over 3.5</p>
                <span>{data.seasonOver35Percentage_overall}%</span>
              </div>
              <div>
                <p>Over 4.5</p>
                <span>{data.seasonOver45Percentage_overall}%</span>
              </div>
              <div>
                <p>Over 5.5</p>
                <span>{data.seasonOver55Percentage_overall}%</span>
              </div>
            </Over>
            <Over>
              <p>Under-</p>
              <div>
                <p>Under 0.5</p>
                <span>{data.seasonUnder05Percentage_overall}%</span>
              </div>
              <div>
                <p>Under 1.5</p>
                <span>{data.seasonUnder15Percentage_overall}%</span>
              </div>
              <div>
                <p>Under 2.5</p>
                <span>{data.seasonUnder25Percentage_overall}%</span>
              </div>
              <div>
                <p>Under 3.5</p>
                <span>{data.seasonUnder35Percentage_overall}%</span>
              </div>
              <div>
                <p>Under 4.5</p>
                <span>{data.seasonUnder45Percentage_overall}%</span>
              </div>
              <div>
                <p>Under 5.5</p>
                <span>{data.seasonUnder55Percentage_overall}%</span>
              </div>
            </Over>
          </Heatmap>
          <Heatmap>
            {/* :Frequência total de gols - Resultado final */}
            <Frequencia>
              <p>Frequência total de gols - Resultado final</p>
              <div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="25.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="24.3"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="21.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="13.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="7.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="5.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
              </div>
            </Frequencia>
            {/* Resultados frequentes - Resultado final */}
            <Frequencia>
              <p>Resultados frequentes - Resultado final</p>
              <div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="25.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="24.3"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="21.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="13.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="7.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="5.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="5.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="5.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="5.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
              </div>
            </Frequencia>
          </Heatmap>
          {/* Gols */}
          <Heatmap>
            <Gol>
              <p>Gols cada 10 minutos</p>
              <div>
                {/* 0' - 10'*/}
                <div>
                  <p>{data.goals_min_0_to_10 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_0_to_10 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>0' - 10'</p>
                </div>
                {/* 11' - 20'
                 */}
                <div>
                  <p>{data.goals_min_11_to_20 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_11_to_20 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>11' - 20' '</p>
                </div>
                {/* 21' - 30' */}
                <div>
                  <p>{data.goals_min_21_to_30 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_21_to_30 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>21' - 30'</p>
                </div>
                {/* 31' - 40' */}
                <div>
                  <p>{data.goals_min_31_to_40 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_31_to_40 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>31' - 40'</p>
                </div>
                {/* 41' - 50' */}
                <div>
                  <p>{data.goals_min_41_to_50 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_41_to_50 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>41' - 50'</p>
                </div>
                {/* 51' - 60' */}
                <div>
                  <p>{data.goals_min_51_to_60 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_51_to_60 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>51' - 60'</p>
                </div>
                {/* 70 */}
                <div>
                  <p>{data.goals_min_61_to_70 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_61_to_70 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>61' - 70'</p>
                </div>
                {/* 71' - 80' */}
                <div>
                  <p>{data.goals_min_71_to_80 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_71_to_80 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>71' - 80'</p>
                </div>
                {/* 81' - 90' */}
                <div>
                  <p>{data.goals_min_81_to_90 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_81_to_90 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>81' - 90'</p>
                </div>
              </div>
            </Gol>
            <Gol>
              <p>Gols cada 15 minutos</p>
              <div>
                {/* 0' - 15 */}
                <div>
                  <p>{data.goals_min_0_to_15 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_0_to_15 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>0' - 15'</p>
                </div>
                {/* 16' - 30' */}
                <div>
                  <p>{data.goals_min_16_to_30 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_16_to_30 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>16' - 30'</p>
                </div>
                {/* 31' - 45' */}
                <div>
                  <p>{data.goals_min_31_to_45 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_31_to_45 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>31' - 45'</p>
                </div>
                {/* 46' - 60' */}
                <div>
                  <p>{data.goals_min_46_to_60 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_46_to_60 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>46' - 60'</p>
                </div>
                {/* 61' - 75' */}
                <div>
                  <p>{data.goals_min_61_to_75 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_61_to_75 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>61' - 75'</p>
                </div>
                {/* 76' - 90' */}
                <div>
                  <p>{data.goals_min_76_to_90 / 10}%</p>
                  <div className="graficWrapper">
                    <Percent
                      percent={data.goals_min_76_to_90 / 10}
                      className="grafic"
                    ></Percent>
                  </div>
                  <p>76' - 90'</p>
                </div>
              </div>
            </Gol>
          </Heatmap>
          {/* Estatisticas */}
          <Heatmap>
            <Estatistica>
              <p>Estatísticas de Jogos</p>
              <div>
                <p>Chutes por jogo</p>
                <span>{data.shotsAVG_overall}</span>
              </div>
              <div>
                <p>Chutes / Jogo (Mandante)</p>
                <span>{data.shotsAVG_home}</span>
              </div>
              <div>
                <p>Chutes / Jogo (Visitante)</p>
                <span>{data.shotsAVG_away}</span>
              </div>
              <div>
                <p>impedimentos por jogo</p>
                <span>{data.offsidesAVG_overall}</span>
              </div>
              <div>
                <p>impedimentos / Jogo (Mandante)</p>
                <span>{data.offsidesAVG_home}</span>
              </div>
              <div>
                <p>impedimentos / Jogo (Visitante)</p>
                <span>{data.offsidesAVG_away}</span>
              </div>
              <div>
                <p>Faltas por Jogo</p>
                <span>{data.foulsAVG_overall}</span>
              </div>
              <div>
                <p>Faltas / Jogo (Mandante)</p>
                <span>{data.foulsAVG_home}</span>
              </div>
              <div>
                <p>Faltas / Jogo (Visitante)</p>
                <span>{data.foulsAVG_away}</span>
              </div>
              <div>
                <p>Cartões por jogo</p>
                <span>{data.cardsAVG_overall}</span>
              </div>
              <div>
                <p>Cantos por jogo</p>
                <span>{data.cornersAVG_overall}</span>
              </div>
              <div>
                <p>Total de Partidas</p>
                <span>{data.totalMatches}</span>
              </div>
              <div>
                <p>Total de Empates</p>
                <span>{data.btts_matches}</span>
              </div>
              <div>
                <p>Total de Gols</p>
                <span>{data.total_goals}</span>
              </div>
              <div>
                <p>Total de Jogadores</p>
                <span>{data.player_count}</span>
              </div>
            </Estatistica>
          </Heatmap>
          {/* Cantos */}
          <Heatmap>
            <Canto>
              <p>Cantos</p>
              <div>
                <CantoIcon width={50} />
                <div className="wrapper">
                  <div className="subHeader">
                    <span></span>
                    <p>Cantos / Jogo</p>
                  </div>
                  <div className="">
                    <div className="content">
                      <span>{data.cornersAVG_home}</span>
                      <p>Mandante</p>
                    </div>
                    <div className="content">
                      <span>{data.cornersAVG_away}</span>
                      <p>Visitante</p>
                    </div>
                  </div>
                  <div className="subHeader">
                    <p>* Total / Jogo</p>
                  </div>
                </div>
              </div>
            </Canto>
            <Canto>
              <p>Cartões</p>
              <div>
                <div style={{ display: "flex", gap: ".25rem" }}>
                  <Cartao width={30} color="red" />
                  <Cartao width={30} color="yellow" />
                </div>
                <div className="wrapper">
                  <div className="subHeader">
                    <span></span>
                    <p>Cartões / jogo</p>
                  </div>
                  <div className="">
                    <div className="content">
                      <span>{data.cardsAVG_home}</span>
                      <p>Mandante</p>
                    </div>
                    <div className="content">
                      <span>{data.cardsAVG_away}</span>
                      <p>Visitante</p>
                    </div>
                  </div>
                  <div className="subHeader">
                    <p>* Total / Jogo</p>
                  </div>
                </div>
              </div>
            </Canto>
          </Heatmap>
          {/* Over Cantos*/}
          <Heatmap>
            <Over>
              <p>Over - Cantos</p>
              <div>
                <p>Over 6.5</p>
                <span>{data.over65CornersPercentage_overall}%</span>
              </div>
              <div>
                <p>Over 7.5</p>
                <span>{data.over75CornersPercentage_overall}%</span>
              </div>
              <div>
                <p>Over 8.5</p>
                <span>{data.over85CornersPercentage_overall}%</span>
              </div>
              <div>
                <p>Over 9.5</p>
                <span>{data.over95CornersPercentage_overall}%</span>
              </div>
              <div>
                <p>Over 10.5</p>
                <span>{data.over105CornersPercentage_overall}%</span>
              </div>
              <div>
                <p>Over 11.5</p>
                <span>{data.over115CornersPercentage_overall}%</span>
              </div>
              <div>
                <p>Over 12.5</p>
                <span>{data.over125CornersPercentage_overall}%</span>
              </div>
              <div>
                <p>Over 13.5</p>
                <span>{data.over135CornersPercentage_overall}%</span>
              </div>
              <div>
                <p>Over 14.5</p>
                <span>{data.over145CornersPercentage_overall}%</span>
              </div>
            </Over>
            <Over>
              <p>Over - Cantos</p>
              <div>
                <p>Under 0.5</p>
                <span>{data.over05CardsPercentage_overall}%</span>
              </div>
              <div>
                <p>Under 1.5</p>
                <span>{data.over15CardsPercentage_overall}%</span>
              </div>
              <div>
                <p>Under 2.5</p>
                <span>{data.over25CardsPercentage_overall}%</span>
              </div>
              <div>
                <p>Under 3.5</p>
                <span>{data.over35CardsPercentage_overall}%</span>
              </div>
              <div>
                <p>Under 4.5</p>
                <span>{data.over45CardsPercentage_overall}%</span>
              </div>
            </Over>
          </Heatmap>
          <GPP>
            <Title>Estatísticas ao intervalo (1º tempo / 2º tempo)</Title>
            <div>
              <Over>
                <p>GPP - Over X</p>
                <div>
                  <p>Over 0.5</p>
                  <span>{data.over05_fhg_percentage}%</span>
                </div>
                <div>
                  <p>Over 1.5</p>
                  <span>{data.over15_fhg_percentage}%</span>
                </div>
                <div>
                  <p>Over 2.5</p>
                  <span>{data.over25_fhg_percentage}%</span>
                </div>
                <div>
                  <p>Over 3.5</p>
                  <span>{data.over35_fhg_percentage}%</span>
                </div>

                <span>* GPT = Gols no 1º Tempo</span>
              </Over>
              <Over>
                <p>G2P - Over X</p>
                <div>
                  <p>Over 0.5</p>
                  <span>{data.over05_2hg_percentage}%</span>
                </div>
                <div>
                  <p>Over 1.5</p>
                  <span>{data.over15_2hg_percentage}%</span>
                </div>
                <div>
                  <p>Over 2.5</p>
                  <span>{data.over25_2hg_percentage}%</span>
                </div>
                <div>
                  <p>Over 3.5</p>
                  <span>{data.over35_2hg_percentage}%</span>
                </div>

                <span>* GPT = Gols no 2º Tempo</span>
              </Over>
            </div>
          </GPP>
          <Heatmap>
            {/*Frequência total de gols - 1º Tempo*/}
            {/* <Frequencia>
              <p>Frequência total de gols - 1º Tempo</p>
              <div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="25.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="24.3"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="21.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="13.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="7.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="5.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
              </div>
            </Frequencia> */}
            {/* Resultados frequentes - 1º Tempo */}
            {/* <Frequencia>
              <p>Resultados frequentes - 1º Tempo</p>
              <div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="25.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="24.3"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="21.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="13.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="7.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="5.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="5.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="5.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
                <div>
                  <p>1 Gols</p>
                  <div>
                    <Grafic percent="5.4"></Grafic>
                  </div>
                  <p>25.4% / 89 vezes</p>
                </div>
              </div>
            </Frequencia> */}
          </Heatmap>
          <Heatmap>
            {/* Melhores Marcadores */}
            <EstatísticasJogador>
              <div className="header">
                <GolIcon width={20} color="white" />
                <p> Melhores Marcadores</p>
              </div>
              <div className="body">
                {data.top_scorers.map((s, index) => (
                  <div key={index}>
                    <p>{s.full_name}</p>
                    <span>{s.goals_overall}</span>
                  </div>
                ))}
              </div>
            </EstatísticasJogador>
            {/* Melhores Assistentes */}
            <EstatísticasJogador>
              <div className="header">
                <Reply width={20} color="white" />
                <p> Melhores Assistentes</p>
              </div>
              <div className="body">
                {data.top_assists.map((s, index) => (
                  <div key={index}>
                    <p>{s.full_name}</p>
                    <span>{s.assists_overall}</span>
                  </div>
                ))}
              </div>
            </EstatísticasJogador>
          </Heatmap>
          <Heatmap>
            {/*  Over Clean Sheets */}
            <EstatísticasJogador>
              <div className="header">
                <Lencois width={20} color="white" />
                <p> Chutes limpo</p>
              </div>
              <div className="body">
                {data.top_clean_sheets.map((c, index) => (
                  <div key={index}>
                    <p>{c.full_name}</p>
                    <span>{c.clean_sheets_overall}</span>
                  </div>
                ))}
              </div>
            </EstatísticasJogador>
          </Heatmap>

          <Informations>
            <span>
              Informação Brasil-futebol: Shaftscore.com oferece informações para
              Serie A.
            </span>
            <span>
              Resultados Serie A ao vivo, Serie A, placar ao vivo, Serie A. Siga
              resultados.
            </span>
            <span>
              Serie A e várias ligas competições de futebol no mundo inteiro.
            </span>
            <span>
              Campeonato Brasileiro, Premier League inglesa, Bundesliga, Ligue1,
              Libertadores, Liga dos Campeões e muito mais.
            </span>

            <span>
              Instantaneamente sem qualquer atraso. Você não precisa atualizar a
              tabela. Shaftscore.com apresenta resultados Serie A, classificação
              do campeonato, tabela do torneio, placar ao vivo, estatísticas de
              confronto diretos, comparação de cotações de apostas, odds e
              notícias.
            </span>

            <span>
              Você pode encontrar várias informações adicionais nos detalhes do
              jogo de futebol em Shaftscore.com: narração ao vivo, escalação dos
              times e resumo de jogo com artilheiros, estatísticas, cartões
              vermelhos e amarelos e substituições{" "}
              <a
                href="https://shaftscore.com/sites-de-apostas-brasil/"
                target="_blank"
              >
                melhores sites de apostas esportivas
              </a>{" "}
              e{" "}
              <a
                href="https://shaftscore.com/bonus-casas-de-apostas-brasil/"
                target="_blank"
              >
                sites de apostas com bônus
              </a>
              .
            </span>
            <span>ShaftScore © 2022 Todos os direitos reservados</span>
          </Informations>
        </>
      )}
    </Main>
  );
}

export default Index;
