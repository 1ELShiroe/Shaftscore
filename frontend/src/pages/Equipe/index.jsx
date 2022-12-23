import React, { useEffect, useState } from "react";
import {
  Main,
  Title,
  SubHeader,
  Left,
  Logo,
  LastResult,
  Match,
  Table,
  FirstMatch,
  Aposte,
  Content,
  ContentHeader,
} from "./styles";
import TableComponent from "../../components/Table";
import { useParams } from "react-router-dom";
import Api from "../../services/Api";
import { removeFavorite, addFavorite } from "../../redux/favoritesRedux";
import { useDispatch, useSelector } from "react-redux";
import { TiStar } from "react-icons/ti"; //Preenchido
import { TiStarOutline } from "react-icons/ti"; //Vazio
document.title = "Shaftscore: Estatísticas do time";

function Index() {
  let [team, setTeam] = useState("");
  let [option, setOptions] = useState("");
  let [last_match, setLast_match] = useState("");
  let [leagueSelect, setLeagueSelect] = useState("");
  let [yearSelect, setYearSelect] = useState("2023");
  let [league, setLeague] = useState([]);
  let [leagueList, setLeagueList] = useState([]);
  const dispatch = useDispatch();
  const favorite_ = useSelector((state) => state.favorite.favorite);
  const params = useParams("");
  var isFavorite;
  favorite_.filter((f) => {
    if (f.id === params.id) {
      isFavorite = true;
    }
  });
  async function requestLeague(league) {
    const collection = [];
    // for (let index = 0; index < league.length; index++) {
    //   await Api.get(`/tabela?id=${league[index]}`).then((res) => {
    //     console.log(res.data);
    //     if (!res.data.error) return collection.push(res.data.data);
    //   });
    // }
    // return collection;
  }

  useEffect(() => {
    Api.get(`/time/info?id=${params.id}`).then((res) => {
      setLast_match(res.data.last_matchs[1]);
      setOptions(res.data.data);
      setLeagueList(res.data.data.map((data) => data.competition_id));
      if (!res.data.error) {
        setTeam(
          !leagueSelect
            ? [res.data.data[0]]
            : res.data.data.filter((i) => i.competition_id == leagueSelect)
        );
      }
    });
  }, [yearSelect, leagueSelect]);

  // let seasonList = option && option.map((temp) => temp.season);
  // if (seasonList) {
  //   seasonList = seasonList.filter(function (este, i) {
  //     return seasonList.indexOf(este) === i;
  //   });
  // }
  // useEffect(() => {
  //   requestLeague(leagueList).then(async (league) =>
  //     setLeague(league && league.filter((i) => i.season == yearSelect))
  //   );
  // }, [yearSelect, leagueList]);
  return (
    <Main>
      {/* HEADER */}
      <SubHeader>
        <>
          {isFavorite ? (
            <TiStar
              onClick={() =>
                dispatch(
                  removeFavorite({
                    id: params.id,
                  })
                )
              }
            />
          ) : (
            <TiStarOutline
              onClick={() =>
                dispatch(
                  addFavorite({
                    id: params.id,
                    name: team[0].name,
                    img: team[0].image,
                    type: "team",
                  })
                )
              }
            />
          )}
          <Logo src={team[0] && team[0].image} />
          <Left>
            <Title>{team[0] && team[0].name}</Title>
            <p>
              {team[0] && team[0].country} - {team[0] && team[0].founded}
            </p>
          </Left>
        </>
      </SubHeader>

      {/* Últimos Resultados */}
      <Match>
        <LastResult>
          <Title>Últimos Resultados</Title>
          <Table>
            <table style={{ width: "100%" }}>
              <tbody>
                <tr style={{ textAlign: "center" }}>
                  <td>Geral</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: 5,
                        justifyContent: "center",
                      }}
                    >
                      {last_match &&
                        last_match.stats.additional_info.formRun_overall
                          .substring(
                            last_match &&
                              last_match.stats.additional_info.formRun_overall
                                .length - 5,
                            last_match &&
                              last_match.stats.additional_info.formRun_overall
                                .length
                          )
                          .split("")
                          .map((m) => {
                            let color;
                            let letra;
                            if (m == "l") {
                              color = "red";
                              letra = "L";
                            }
                            if (m == "w") {
                              color = "green";
                              letra = "W";
                            }
                            if (m == "d") {
                              color = "yellow";
                              letra = "E";
                            }
                            return (
                              <p
                                style={{
                                  width: 20,
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  color: "white",
                                  background: color,
                                  textAlign: "center",
                                }}
                              >
                                {letra.toUpperCase()}
                              </p>
                            );
                          })}
                    </div>
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "gray",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.seasonPPG_overall}
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "green",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.winPercentage_overall}%
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "#e5e619",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.drawPercentage_overall}%
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "red",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.losePercentage_overall}%
                  </td>
                </tr>

                <tr style={{ textAlign: "center" }}>
                  <td>Casa</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: 5,
                        justifyContent: "center",
                      }}
                    >
                      {last_match &&
                        last_match.stats.additional_info.formRun_home
                          .substring(
                            last_match &&
                              last_match.stats.additional_info.formRun_home
                                .length - 5,
                            last_match &&
                              last_match.stats.additional_info.formRun_home
                                .length
                          )
                          .split("")
                          .map((m) => {
                            let color;
                            let letra;
                            if (m == "l") {
                              color = "red";
                              letra = "L";
                            }
                            if (m == "w") {
                              color = "green";
                              letra = "W";
                            }
                            if (m == "d") {
                              color = "yellow";
                              letra = "E";
                            }
                            return (
                              <p
                                style={{
                                  width: 20,
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  color: "white",
                                  background: color,
                                  textAlign: "center",
                                }}
                              >
                                {letra.toUpperCase()}
                              </p>
                            );
                          })}
                    </div>
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "gray",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.seasonPPG_home}
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "green",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.winPercentage_home}%
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "#e5e619",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.drawPercentage_home}%
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "red",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.losePercentage_home}%
                  </td>
                </tr>

                <tr style={{ textAlign: "center" }}>
                  <td>Fora</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        gap: 5,
                        justifyContent: "center",
                      }}
                    >
                      {last_match &&
                        last_match.stats.additional_info.formRun_away
                          .substring(
                            last_match &&
                              last_match.stats.additional_info.formRun_away
                                .length - 5,
                            last_match &&
                              last_match.stats.additional_info.formRun_away
                                .length
                          )
                          .split("")
                          .map((m) => {
                            let color;
                            let letra;
                            if (m == "l") {
                              color = "red";
                              letra = "L";
                            }
                            if (m == "w") {
                              color = "green";
                              letra = "W";
                            }
                            if (m == "d") {
                              color = "yellow";
                              letra = "E";
                            }
                            return (
                              <p
                                style={{
                                  width: 20,
                                  fontSize: 16,
                                  fontWeight: "bold",
                                  color: "white",
                                  background: color,
                                  textAlign: "center",
                                }}
                              >
                                {letra.toUpperCase()}
                              </p>
                            );
                          })}
                    </div>
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "gray",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.seasonPPG_away}
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "green",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.winPercentage_away}%
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "#e5e619",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.drawPercentage_away}%
                  </td>
                  <td
                    style={{
                      borderRadius: 8,
                      background: "red",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {last_match && last_match.stats.losePercentage_away}%
                  </td>
                </tr>
              </tbody>
            </table>
          </Table>
        </LastResult>
      </Match>

      {/* Campeonatos */}
      {/* <div>
        <Title>Campeonatos</Title>
        <select
          style={{
            width: "45%",
          }}
          value={leagueSelect}
          onChange={(e) => setLeagueSelect(e.target.value)}
        >
          {league && league.length > 1 ? (
            league.map((camp) => {
              return <option value={camp.id}>{camp.name}</option>;
            })
          ) : (
            <option value={league.id}>{league.name}</option>
          )}
        </select>

        <select
          style={{
            width: "45%",
          }}
          value={yearSelect}
          onChange={(e) => setYearSelect(e.target.value)}
        >
          {seasonList &&
            seasonList.map((camp) => {
              return <option value={camp}>{camp}</option>;
            })}
        </select>
      </div> */}
      {/* <TableLeague
        type={"1"}
        leagueName={data.name_pt}
        matches={table.specific_tables[0].table}
        legends={zones}
        country={data.country}
      /> */}

      {/* GOLS OBTIDOS */}
      <Content>
        <Title>Gols Obtidos</Title>
        <ContentHeader>
          <div>
            <p className="bold">
              {team[0] && team[0].stats.seasonScoredAVG_overall}
            </p>
            <p>Gols/Jogo</p>
          </div>
          <div>
            <p className="bold">
              {team[0] && team[0].stats.seasonScoredAVG_home}
            </p>
            <p>Gols (Mandante)</p>
          </div>
          <div>
            <p className="bold">
              {team[0] && team[0].stats.seasonScoredAVG_away}
            </p>
            <p>Gols (Visitante)</p>
          </div>
        </ContentHeader>
        <TableComponent
          header={["Gols exatos", "Geral", "Mandante", "Visitante"]}
          over05={[
            "Média 1º Tempo",
            team[0] && team[0].stats.scoredAVGHT_overall,
            team[0] && team[0].stats.scoredAVGHT_home,
            team[0] && team[0].stats.scoredAVGHT_away,
          ]}
          over15={[
            "Média 2º Tempo",
            team[0] && team[0].stats.scored_2hg_avg_overall,
            team[0] && team[0].stats.scored_2hg_avg_home,
            team[0] && team[0].stats.scored_2hg_avg_away,
          ]}
          over25={[
            "Ambos Pontua",
            team[0] && team[0].stats.scoredBothHalvesPercentage_overall + "%",
            team[0] && team[0].stats.scoredBothHalvesPercentage_home + "%",
            team[0] && team[0].stats.scoredBothHalvesPercentage_away + "%",
          ]}
        />
      </Content>

      {/* GOLS SOFRIDOS */}
      <Content>
        <Title>Gols Sofridos</Title>
        <ContentHeader>
          <div>
            <p className="bold">
              {team[0] && team[0].stats.seasonConcededAVG_overall}
            </p>
            <p>Gols/Jogo</p>
          </div>
          <div>
            <p className="bold">
              {team[0] && team[0].stats.seasonConcededAVG_home}
            </p>
            <p>Gols Sofridos (Mandante)</p>
          </div>
          <div>
            <p className="bold">
              {team[0] && team[0].stats.seasonConcededAVG_away}
            </p>
            <p>Gols Sofridos (Visitante)</p>
          </div>
        </ContentHeader>
        <TableComponent
          header={["Gols exatos", "Geral", "Mandante", "Visitante"]}
          over05={[
            "Minutos / Gols S/",
            team[0] && team[0].stats.seasonConcededMin_overall + " min'",
            team[0] && team[0].stats.seasonConcededMin_home + " min'",
            team[0] && team[0].stats.seasonConcededMin_away + " min'",
          ]}
          over25={[
            "Chutes limpo / 2º T..",
            team[0] && team[0].stats.cs_2hg_percentage_overall + "%",
            team[0] && team[0].stats.cs_2hg_percentage_home + "%",
            team[0] && team[0].stats.cs_2hg_percentage_away + "%",
          ]}
        />
      </Content>

      {/*    Estatísticas de ambas as equipes para marcar     */}
      <Content>
        <Title>Ambas as Equipes Marcam</Title>
        <TableComponent
          header={["BTTS Estatísticas", "Geral", "Mandante", "Visitante"]}
          over05={[
            "BTTS",
            team[0] && team[0].stats.btts_2hg_percentage_overall + "%",
            team[0] && team[0].stats.seasonBTTSPercentage_home + "%",
            team[0] && team[0].stats.seasonBTTSPercentage_away + "%",
          ]}
          over15={[
            "BTTS 1H",
            team[0] && team[0].stats.btts_fhg_percentage_overall + "%",
            team[0] && team[0].stats.btts_fhg_percentage_home + "%",
            team[0] && team[0].stats.btts_fhg_percentage_away + "%",
          ]}
          over25={[
            "BTTS 2H",
            team[0] && team[0].stats.btts_2hg_percentage_overall + "%",
            team[0] && team[0].stats.btts_2hg_percentage_home + "%",
            team[0] && team[0].stats.btts_2hg_percentage_away + "%",
          ]}
          over35={[
            "BTTS & Vitoria",
            team[0] && team[0].stats.BTTS_and_win_percentage_overall + "%",
            team[0] && team[0].stats.BTTS_and_win_percentage_home + "%",
            team[0] && team[0].stats.BTTS_and_win_percentage_away + "%",
          ]}
          over45={[
            "BTTS & Empate",
            team[0] && team[0].stats.BTTS_and_draw_percentage_overall + "%",
            team[0] && team[0].stats.BTTS_and_draw_percentage_home + "%",
            team[0] && team[0].stats.BTTS_and_draw_percentage_away + "%",
          ]}
          over55={[
            "BTTS & Derrota",
            team[0] && team[0].stats.BTTS_and_lose_percentage_overall + "%",
            team[0] && team[0].stats.BTTS_and_lose_percentage_home + "%",
            team[0] && team[0].stats.BTTS_and_lose_percentage_overall + "%",
          ]}
          over65={[
            "BTTS Ambas as Metades",
            team[0] && team[0].stats.BTTS_both_halves_percentage_overall + "%",
            team[0] && team[0].stats.BTTS_both_halves_percentage_home + "%",
            team[0] && team[0].stats.BTTS_both_halves_percentage_away + "%",
          ]}
        />
      </Content>

      {/* CANTOS */}
      <Content>
        <Title>Cantos</Title>
        <ContentHeader>
          <div>
            <p className="bold">
              {team[0] && team[0].stats.cornersAVG_overall}
            </p>
            <p>Cantos / Jogo</p>
          </div>
          <div>
            <p className="bold">{team[0] && team[0].stats.cornersAVG_home}</p>
            <p>Média de Cantos (Mandante)</p>
          </div>
          <div>
            <p className="bold">{team[0] && team[0].stats.cornersAVG_away}</p>
            <p>Média de Cantos (Visitante)</p>
          </div>
        </ContentHeader>
        <TableComponent
          header={["1º Tempo / Cantos", "Geral", "Mandante", "Visitante"]}
          gols={[
            "Média",
            team[0] && team[0].stats.corners_fh_avg_overall,
            team[0] && team[0].stats.corners_fh_avg_home,
            team[0] && team[0].stats.corners_fh_avg_away,
          ]}
          over05={[
            "Over 4",
            team[0] && team[0].stats.corners_fh_over4_percentage_overall + "%",
            team[0] && team[0].stats.corners_fh_over4_percentage_home + "%",
            team[0] && team[0].stats.corners_fh_over4_percentage_away + "%",
          ]}
          over15={[
            "Over 5",
            team[0] && team[0].stats.corners_fh_over5_percentage_overall + "%",
            team[0] && team[0].stats.corners_fh_over5_percentage_home + "%",
            team[0] && team[0].stats.corners_fh_over5_percentage_away + "%",
          ]}
          over25={[
            "Over 6",
            team[0] && team[0].stats.corners_fh_over6_percentage_overall + "%",
            team[0] && team[0].stats.corners_fh_over6_percentage_home + "%",
            team[0] && team[0].stats.corners_fh_over6_percentage_away + "%",
          ]}
        />
        <TableComponent
          header={["2º Tempo / Cantos", "Geral", "Mandante", "Visitante"]}
          gols={[
            "Média",
            team[0] && team[0].stats.corners_2h_avg_overall,
            team[0] && team[0].stats.corners_2h_avg_home,
            team[0] && team[0].stats.corners_2h_avg_away,
          ]}
          over05={[
            "Over 4",
            team[0] && team[0].stats.corners_2h_over4_percentage_overall + "%",
            team[0] && team[0].stats.corners_2h_over4_percentage_home + "%",
            team[0] && team[0].stats.corners_2h_over4_percentage_away + "%",
          ]}
          over15={[
            "Over 5",
            team[0] && team[0].stats.corners_2h_over5_percentage_overall + "%",
            team[0] && team[0].stats.corners_2h_over5_percentage_home + "%",
            team[0] && team[0].stats.corners_2h_over5_percentage_away + "%",
          ]}
          over25={[
            "Over 6",
            team[0] && team[0].stats.corners_2h_over6_percentage_overall + "%",
            team[0] && team[0].stats.corners_2h_over6_percentage_home + "%",
            team[0] && team[0].stats.corners_2h_over6_percentage_away + "%",
          ]}
        />
      </Content>

      {/*    CANTOS DO TIME    */}
      <Content>
        <Title>Cantos do Time</Title>
        <TableComponent
          header={["Cantos", "Geral", "Mandante", "Visitante"]}
          gols={[
            "Média",
            team[0] && team[0].stats.cornersAVG_overall,
            team[0] && team[0].stats.cornersAVG_home,
            team[0] && team[0].stats.cornersAVG_away,
          ]}
          over05={[
            "6.5",
            team[0] && team[0].stats.over65CornersPercentage_overall + "%",
            team[0] && team[0].stats.over65CornersPercentage_home + "%",
            team[0] && team[0].stats.over65CornersPercentage_away + "%",
          ]}
          over15={[
            "7.5",
            team[0] && team[0].stats.over75CornersPercentage_overall + "%",
            team[0] && team[0].stats.over75CornersPercentage_home + "%",
            team[0] && team[0].stats.over75CornersPercentage_away + "%",
          ]}
          over25={[
            "8.5",
            team[0] && team[0].stats.over85CornersPercentage_overall + "%",
            team[0] && team[0].stats.over85CornersPercentage_home + "%",
            team[0] && team[0].stats.over85CornersPercentage_away + "%",
          ]}
          over35={[
            "9.5",
            team[0] && team[0].stats.over95CornersPercentage_overall + "%",
            team[0] && team[0].stats.over95CornersPercentage_home + "%",
            team[0] && team[0].stats.over95CornersPercentage_away + "%",
          ]}
          over45={[
            "10.5",
            team[0] && team[0].stats.over105CornersPercentage_overall + "%",
            team[0] && team[0].stats.over105CornersPercentage_home + "%",
            team[0] && team[0].stats.over105CornersPercentage_away + "%",
          ]}
          over55={[
            "11.5",
            team[0] && team[0].stats.over115CornersPercentage_overall + "%",
            team[0] && team[0].stats.over115CornersPercentage_home + "%",
            team[0] && team[0].stats.over115CornersPercentage_away + "%",
          ]}
          over65={[
            "12.5",
            team[0] && team[0].stats.over125CornersPercentage_overall + "%",
            team[0] && team[0].stats.over125CornersPercentage_home + "%",
            team[0] && team[0].stats.over125CornersPercentage_away + "%",
          ]}
          over75={[
            "13.5",
            team[0] && team[0].stats.over135CornersPercentage_overall + "%",
            team[0] && team[0].stats.over135CornersPercentage_home + "%",
            team[0] && team[0].stats.over135CornersPercentage_away + "%",
          ]}
          over85={[
            "14.5",
            team[0] && team[0].stats.over145CornersPercentage_overall + "%",
            team[0] && team[0].stats.over145CornersPercentage_home + "%",
            team[0] && team[0].stats.over145CornersPercentage_away + "%",
          ]}
        />
      </Content>

      {/* CARTÔES */}
      <Content>
        <Title>Cartões do Time</Title>
        <ContentHeader>
          <div>
            <p className="bold">{team[0] && team[0].stats.cardsAVG_overall}</p>
            <p>Cantos / Jogo</p>
          </div>
          <div>
            <p className="bold">{team[0] && team[0].stats.cardsAVG_home}</p>
            <p>Média de Cantos (Mandante)</p>
          </div>
          <div>
            <p className="bold">{team[0] && team[0].stats.cardsAVG_away}</p>
            <p>Média de Cantos (Visitante)</p>
          </div>
        </ContentHeader>
        <TableComponent
          header={["Cartôes For", "Geral", "Mandante", "Visitante", ""]}
          over05={[
            "0.5",
            team[0] && team[0].stats.over05CardsFor_overall + "%",
            team[0] && team[0].stats.over05CardsFor_home + "%",
            team[0] && team[0].stats.over05CardsFor_away + "%",
          ]}
          over15={[
            "1.5",
            team[0] && team[0].stats.over15CardsFor_overall + "%",
            team[0] && team[0].stats.over15CardsFor_home + "%",
            team[0] && team[0].stats.over15CardsFor_away + "%",
          ]}
          over25={[
            "2.5",
            team[0] && team[0].stats.over25CardsFor_overall + "%",
            team[0] && team[0].stats.over25CardsFor_home + "%",
            team[0] && team[0].stats.over25CardsFor_away + "%",
          ]}
          over35={[
            "3.5",
            team[0] && team[0].stats.over35CardsFor_overall + "%",
            team[0] && team[0].stats.over35CardsFor_home + "%",
            team[0] && team[0].stats.over35CardsFor_away + "%",
          ]}
          over45={[
            "4.5",
            team[0] && team[0].stats.over45CardsFor_overall + "%",
            team[0] && team[0].stats.over45CardsFor_home + "%",
            team[0] && team[0].stats.over45CardsFor_away + "%",
          ]}
          over55={[
            "5.5",
            team[0] && team[0].stats.over55CardsFor_overall + "%",
            team[0] && team[0].stats.over55CardsFor_home + "%",
            team[0] && team[0].stats.over55CardsFor_away + "%",
          ]}
        />
        <TableComponent
          header={["Cartões Against", "Geral", "Mandante", "Visitante"]}
          over05={[
            "0.5",
            team[0] && team[0].stats.over05CardsAgainst_overall + "%",
            team[0] && team[0].stats.over05CardsAgainst_home + "%",
            team[0] && team[0].stats.over05CardsAgainst_away + "%",
          ]}
          over15={[
            "1.5",
            team[0] && team[0].stats.over15CardsAgainst_overall + "%",
            team[0] && team[0].stats.over15CardsAgainst_home + "%",
            team[0] && team[0].stats.over15CardsAgainst_away + "%",
          ]}
          over25={[
            "2.5",
            team[0] && team[0].stats.over25CardsAgainst_overall + "%",
            team[0] && team[0].stats.over25CardsAgainst_home + "%",
            team[0] && team[0].stats.over25CardsAgainst_away + "%",
          ]}
          over35={[
            "3.5",
            team[0] && team[0].stats.over35CardsAgainst_overall + "%",
            team[0] && team[0].stats.over35CardsAgainst_home + "%",
            team[0] && team[0].stats.over35CardsAgainst_away + "%",
          ]}
          over45={[
            "4.5",
            team[0] && team[0].stats.over45CardsAgainst_overall + "%",
            team[0] && team[0].stats.over45CardsAgainst_home + "%",
            team[0] && team[0].stats.over45CardsAgainst_away + "%",
          ]}
          over55={[
            "5.5",
            team[0] && team[0].stats.over55CardsAgainst_overall + "%",
            team[0] && team[0].stats.over55CardsAgainst_home + "%",
            team[0] && team[0].stats.over55CardsAgainst_away + "%",
          ]}
        />
      </Content>

      {/*    ACIMA/ABAIXO DE GOLS     */}
      <Content>
        <Title>Acima/Abaixo de Gols</Title>
        <TableComponent
          header={["Over", "Geral", "Mandante", "Visitante"]}
          over05={[
            "0.5",
            team[0] && team[0].stats.seasonOver05Percentage_overall + "%",
            team[0] && team[0].stats.seasonOver05Percentage_home + "%",
            team[0] && team[0].stats.seasonOver05Percentage_away + "%",
          ]}
          over15={[
            "1.5",
            team[0] && team[0].stats.seasonOver15Percentage_overall + "%",
            team[0] && team[0].stats.seasonOver15Percentage_home + "%",
            team[0] && team[0].stats.seasonOver15Percentage_away + "%",
          ]}
          over25={[
            "2.5",
            team[0] && team[0].stats.seasonOver25Percentage_overall + "%",
            team[0] && team[0].stats.seasonOver25Percentage_home + "%",
            team[0] && team[0].stats.seasonOver25Percentage_away + "%",
          ]}
          over35={[
            "3.5",
            team[0] && team[0].stats.seasonOver35Percentage_overall + "%",
            team[0] && team[0].stats.seasonOver35Percentage_home + "%",
            team[0] && team[0].stats.seasonOver35Percentage_away + "%",
          ]}
          over45={[
            "4.5",
            team[0] && team[0].stats.seasonOver45Percentage_overall + "%",
            team[0] && team[0].stats.seasonOver45Percentage_home + "%",
            team[0] && team[0].stats.seasonOver45Percentage_away + "%",
          ]}
          over55={[
            "5.5",
            team[0] && team[0].stats.seasonOver55Percentage_overall + "%",
            team[0] && team[0].stats.seasonOver55Percentage_home + "%",
            team[0] && team[0].stats.seasonOver55Percentage_away + "%",
          ]}
        />
        <TableComponent
          header={["Under", "Geral", "Mandante", "Visitante"]}
          over05={[
            "0.5",
            team[0] && team[0].stats.seasonUnder35Percentage_overall + "%",
            team[0] && team[0].stats.seasonUnder35Percentage_home + "%",
            team[0] && team[0].stats.seasonUnder35Percentage_away + "%",
          ]}
          over15={[
            "1.5",
            team[0] && team[0].stats.seasonUnder15Percentage_overall + "%",
            team[0] && team[0].stats.seasonUnder15Percentage_home + "%",
            team[0] && team[0].stats.seasonUnder15Percentage_away + "%",
          ]}
          over25={[
            "2.5",
            team[0] && team[0].stats.seasonUnder25Percentage_overall + "%",
            team[0] && team[0].stats.seasonUnder25Percentage_home + "%",
            team[0] && team[0].stats.seasonUnder25Percentage_away + "%",
          ]}
          over35={[
            "3.5",
            team[0] && team[0].stats.seasonUnder35Percentage_overall + "%",
            team[0] && team[0].stats.seasonUnder35Percentage_home + "%",
            team[0] && team[0].stats.seasonUnder35Percentage_away + "%",
          ]}
          over45={[
            "4.5",
            team[0] && team[0].stats.seasonUnder45Percentage_overall + "%",
            team[0] && team[0].stats.seasonUnder45Percentage_home + "%",
            team[0] && team[0].stats.seasonUnder45Percentage_away + "%",
          ]}
          over55={[
            "5.5",
            team[0] && team[0].stats.seasonUnder55Percentage_overall + "%",
            team[0] && team[0].stats.seasonUnder55Percentage_home + "%",
            team[0] && team[0].stats.seasonUnder55Percentage_away + "%",
          ]}
        />
      </Content>

      {/*   GOLS A CADA 10 & 15 minutos    */}
      <Content>
        <Title>Tempos de Gol por 10/15 Minutos</Title>
        <TableComponent
          header={["10 / M", "Geral", "Mandante", "Visitante"]}
          over05={[
            "0' - 10'",
            team[0] && team[0].stats.goals_all_min_0_to_10 + "%",
            team[0] && team[0].stats.goals_all_min_0_to_10_home + "%",
            team[0] && team[0].stats.goals_all_min_0_to_10_away + "%",
          ]}
          over15={[
            "11' - 20'",
            team[0] && team[0].stats.goals_all_min_11_to_20 + "%",
            team[0] && team[0].stats.goals_all_min_11_to_20_home + "%",
            team[0] && team[0].stats.goals_all_min_11_to_20_away + "%",
          ]}
          over25={[
            "21' - 30'",
            team[0] && team[0].stats.goals_all_min_21_to_30 + "%",
            team[0] && team[0].stats.goals_all_min_21_to_30_home + "%",
            team[0] && team[0].stats.goals_all_min_21_to_30_away + "%",
          ]}
          over35={[
            "31' - 40'",
            team[0] && team[0].stats.goals_all_min_31_to_40 + "%",
            team[0] && team[0].stats.goals_all_min_31_to_40_home + "%",
            team[0] && team[0].stats.goals_all_min_31_to_40_away + "%",
          ]}
          over45={[
            "41' - 50'",
            team[0] && team[0].stats.goals_all_min_41_to_50 + "%",
            team[0] && team[0].stats.goals_all_min_41_to_50_home + "%",
            team[0] && team[0].stats.goals_all_min_41_to_50_away + "%",
          ]}
          over55={[
            "51' - 60'",
            team[0] && team[0].stats.goals_all_min_51_to_60 + "%",
            team[0] && team[0].stats.goals_all_min_51_to_60_home + "%",
            team[0] && team[0].stats.goals_all_min_51_to_60_away + "%",
          ]}
          over65={[
            "61' - 70'",
            team[0] && team[0].stats.goals_all_min_61_to_70 + "%",
            team[0] && team[0].stats.goals_all_min_61_to_70_home + "%",
            team[0] && team[0].stats.goals_all_min_61_to_70_away + "%",
          ]}
          over75={[
            "71' - 80'",
            team[0] && team[0].stats.goals_all_min_71_to_80 + "%",
            team[0] && team[0].stats.goals_all_min_71_to_80_home + "%",
            team[0] && team[0].stats.goals_all_min_71_to_80_away + "%",
          ]}
          over85={[
            "81' - 90'",
            team[0] && team[0].stats.goals_all_min_81_to_90 + "%",
            team[0] && team[0].stats.goals_all_min_81_to_90_home + "%",
            team[0] && team[0].stats.goals_all_min_81_to_90_away + "%",
          ]}
        />
        <TableComponent
          header={["15 / M", "Geral", "Mandante", "Visitante"]}
          over05={[
            "0' - 15'",
            team[0] && team[0].stats.goals_all_min_0_to_15 + "%",
            team[0] && team[0].stats.goals_all_min_0_to_15_home + "%",
            team[0] && team[0].stats.goals_all_min_0_to_15_away + "%",
          ]}
          over15={[
            "16' - 30'",
            team[0] && team[0].stats.goals_all_min_16_to_30 + "%",
            team[0] && team[0].stats.goals_all_min_16_to_30_home + "%",
            team[0] && team[0].stats.goals_all_min_16_to_30_away + "%",
          ]}
          over25={[
            "31' - 45'",
            team[0] && team[0].stats.goals_all_min_31_to_45 + "%",
            team[0] && team[0].stats.goals_all_min_31_to_45_home + "%",
            team[0] && team[0].stats.goals_all_min_31_to_45_away + "%",
          ]}
          over35={[
            "46' - 60'",
            team[0] && team[0].stats.goals_all_min_46_to_60 + "%",
            team[0] && team[0].stats.goals_all_min_46_to_60_home + "%",
            team[0] && team[0].stats.goals_all_min_46_to_60_away + "%",
          ]}
          over45={[
            "61' - 75'",
            team[0] && team[0].stats.goals_all_min_61_to_75 + "%",
            team[0] && team[0].stats.goals_all_min_61_to_75_home + "%",
            team[0] && team[0].stats.goals_all_min_61_to_75_away + "%",
          ]}
          over55={[
            "76' - 90'",
            team[0] && team[0].stats.goals_all_min_76_to_90 + "%",
            team[0] && team[0].stats.goals_all_min_76_to_90_home + "%",
            team[0] && team[0].stats.goals_all_min_76_to_90_away + "%",
          ]}
        />
      </Content>
    </Main>
  );
}

export default Index;
