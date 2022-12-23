import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Main,
  SubHeader,
  Title,
  Description,
  Confronto,
  Content,
  LogoJogo,
  Details,
  SubHeaderOptions,
  DetailsConttent,
  ContentEstatisticas,
  GraficGame,
  HeaderOptions,
  Table,
} from "./styles";
import { TiStar } from "react-icons/ti"; //Preenchido
import { TiStarOutline } from "react-icons/ti"; //Vazio
import LiveGame from "../../components/LiveGame";
import Estatistica from "../../components/Estatistica";
import { useParams } from "react-router-dom";
import Axios from "../../services/Api";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../redux/favoritesRedux";

function Index() {
  moment.locale("pt-br");
  const dispatch = useDispatch();
  const favorite_ = useSelector((state) => state.favorite.favorite);
  const [teamFavorite, setTeamFavorite] = useState({});
  const [actived, setActived] = useState("sumario");
  const params = useParams("");
  const [match, setMatch] = useState("");
  const [headerOpen, setHeaderOpen] = useState([
    {
      gols_Sofridos: "final",
      over: "over_x",
      cantos: "final",
      card: "total",
      gol_minut: "total",
      table_one: "SHOTS",
    },
  ]);
  useEffect(() => {
    Axios.get(`/partidas/game?id=${params.id}`).then((res) => {
      if (!res.data.error) setMatch(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (match) {
      var isSaved = [];
      isSaved = favorite_.filter((f) => f.id === match.teams.home.id);
      if (isSaved.length > 0) {
        setTeamFavorite((teamFavorite) => ({
          ...teamFavorite,
          home: true,
        }));
      } else {
        setTeamFavorite((teamFavorite) => ({
          ...teamFavorite,
          home: false,
        }));
      }

      isSaved = favorite_.filter((f) => f.id === match.teams.away.id);
      if (isSaved.length > 0) {
        setTeamFavorite((teamFavorite) => ({
          ...teamFavorite,
          away: true,
        }));
      } else {
        setTeamFavorite((teamFavorite) => ({
          ...teamFavorite,
          away: false,
        }));
      }
    }
  }, [match, favorite_]);

  const awayMatch =
    match && match.teams.away_matchs[match.teams.away_matchs.length - 1];
  const homeMatch =
    match && match.teams.home_matchs[match.teams.away_matchs.length - 1];
  if (params.type == "liga") params.type = "league";
  else params.type = "champion";
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
  return (
    <Main>
      {match && (
        <>
          <SubHeader>
            <Link
              to={`/estatistica/${params.type}/${stringTrade(params.league)}/${
                params.leagueID
              }`}
            >
              <Title>
                {params.league
                  .normalize("NFD")
                  .replace(/-/g, " ")
                  .replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
                    letra.toUpperCase()
                  )}
              </Title>
            </Link>
            <Description>
              {new Intl.DateTimeFormat("pt-BR", {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "numeric",
              }).format(new Date(match && match.data.date_unix * 1000))}
            </Description>
            <Confronto style={{ marginRight: "50px", marginLeft: "50px" }}>
              <Content style={{ textAlign: "center" }}>
                {teamFavorite.home ? (
                  <TiStar
                    style={{ fontSize: 25, marginLeft: 120 }}
                    onClick={() =>
                      dispatch(
                        removeFavorite({
                          id: match.teams.home.id,
                        })
                      )
                    }
                  />
                ) : (
                  <TiStarOutline
                    style={{ fontSize: 25, marginLeft: 120 }}
                    onClick={() =>
                      dispatch(
                        addFavorite({
                          id: match.teams.home.id,
                          name: match.teams.home.name,
                          type: "team",
                          img: match.teams.home.image,
                        })
                      )
                    }
                  />
                )}
                <Link
                  to={`/equipe/${match.teams.home.name
                    .toLowerCase()
                    .replace(/ +/g, "-")}/${match.teams.home.id}`}
                >
                  <LogoJogo src={match && match.teams.home.image} />
                  {<p>{match && match.teams.home.name}</p>}
                </Link>
              </Content>
              <Content>
                <p className="board">
                  {match && match.data.homeGoalCount} -{" "}
                  {match && match.data.awayGoalCount}
                </p>
                {/* <p className="time">1º Tempo - </p> */}
              </Content>
              <Content style={{ textAlign: "center" }}>
                {teamFavorite.away ? (
                  <TiStar
                    style={{ fontSize: 25, marginRight: 120 }}
                    onClick={() =>
                      dispatch(
                        removeFavorite({
                          id: match.teams.away.id,
                        })
                      )
                    }
                  />
                ) : (
                  <TiStarOutline
                    style={{ fontSize: 25, marginRight: 120 }}
                    onClick={() =>
                      dispatch(
                        addFavorite({
                          id: match.teams.away.id,
                          name: match.teams.away.name,
                          type: "team",
                          img: match.teams.away.image,
                        })
                      )
                    }
                  />
                )}
                <Link
                  to={`/equipe/${match.teams.away.name.toLowerCase()}/${
                    match.teams.away.id
                  }`}
                >
                  <LogoJogo src={match && match.teams.away.image} />
                  {<p>{match && match.teams.away.name}</p>}
                </Link>
              </Content>
            </Confronto>
          </SubHeader>
          <SubHeaderOptions>
            <span
              onClick={() => setActived("sumario")}
              className={actived == "sumario" ? "actived" : ""}
            >
              SÚMARIO
            </span>
            <span
              onClick={() => setActived("estatistica")}
              className={actived == "estatistica" ? "actived" : ""}
            >
              ESTATÍSTICAS
            </span>
            {/* <span
              onClick={() => setActived("relato")}
              className={actived == "relato" ? "actived" : ""}
            >
              RELATO
            </span>
            <span
              onClick={() => setActived("escalacao")}
              className={actived == "escalacao" ? "actived" : ""}
            >
              ESCALAÇÂO
            </span> */}
          </SubHeaderOptions>
          {actived == "sumario" && (
            <>
              <LiveGame />
              <Details>
                <Title>Detalhes do Jogo</Title>
                <DetailsConttent>
                  <div>
                    <img src={require("../../assets/icons/apito.png")} />
                    <span>ÁRBITRO:</span>
                  </div>
                  <div>
                    <img src={require("../../assets/icons/estadio.png")} />
                    <span>ESTÁDIO:</span>
                    <span className="warning">
                      {match && match.data.stadium_name
                        ? match.data.stadium_name
                        : "Não selecionado"}
                    </span>
                  </div>
                </DetailsConttent>
              </Details>
            </>
          )}
          {actived === "estatistica" && (
            <Estatistica data={match.data} teams={match.teams} />
          )}

          <ContentEstatisticas>
            <div>
              <Title>Performance</Title>
              <div>
                <div>
                  {/* Header */}
                  <div
                    style={{ display: "flex", gap: 20, alignItems: "center" }}
                  >
                    <LogoJogo src={match && match.teams.home.image} />
                    <div>
                      <p style={{ fontSize: 26, fontWeight: "bold" }}>
                        {match && match.teams.home.name}
                      </p>
                      <p>
                        Rank de Performance.{" "}
                        {match && match.teams.home.performance_rank > 10
                          ? match && match.teams.home.performance_rank + "/110"
                          : match && match.teams.home.performance_rank + "/10"}
                      </p>
                      <p>{match && match.teams.home.season_format}</p>
                    </div>
                  </div>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Forma</th>
                        <th>Últimos 5</th>
                        <th>PPG</th>
                      </tr>
                    </thead>
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
                            {homeMatch.stats?.additional_info.formRun_overall
                              .substring(
                                homeMatch.stats.additional_info.formRun_overall
                                  .length - 5,
                                homeMatch.stats.additional_info.formRun_overall
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
                          {homeMatch.stats.seasonPPG_overall}
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
                            {homeMatch.stats.additional_info.formRun_home
                              .substring(
                                homeMatch.stats.additional_info.formRun_home
                                  .length - 5,
                                homeMatch.stats.additional_info.formRun_home
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
                          {homeMatch.stats.seasonPPG_home}
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
                            {homeMatch.stats.additional_info.formRun_away
                              .substring(
                                homeMatch.stats.additional_info.formRun_away
                                  .length - 5,
                                homeMatch.stats.additional_info.formRun_away
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
                          {homeMatch.stats.seasonPPG_away}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Estátisticas</th>
                        <th>Geral</th>
                        <th>Casa</th>
                        <th>Fora</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ textAlign: "center" }}>
                        <td>Vitória</td>
                        <td>{homeMatch.stats.winPercentage_overall}%</td>
                        <td>{homeMatch.stats.winPercentage_home}%</td>
                        <td>{homeMatch.stats.winPercentage_away}%</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>Média</td>
                        <td>{homeMatch.stats.seasonAVG_overall}</td>
                        <td>{homeMatch.stats.seasonAVG_home}</td>
                        <td>{homeMatch.stats.seasonAVG_away}</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>Marcaram</td>
                        <td>{homeMatch.stats.seasonScoredAVG_overall}</td>
                        <td>{homeMatch.stats.seasonScoredAVG_home}</td>
                        <td>{homeMatch.stats.seasonScoredAVG_away}</td>
                      </tr>
                      {/* SOFRERAM*/}
                      <tr style={{ textAlign: "center" }}>
                        <td>Sofreram</td>
                        <td>{homeMatch.stats.seasonConcededAVG_overall}</td>
                        <td>{homeMatch.stats.seasonConcededAVG_home}</td>
                        <td>{homeMatch.stats.seasonConcededAVG_away}</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>AM</td>
                        <td>{homeMatch.stats.seasonBTTSPercentage_overall}%</td>
                        <td>{homeMatch.stats.seasonBTTSPercentage_home}%</td>
                        <td>{homeMatch.seasonBTTSPercentage_away}%</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>CS</td>
                        <td>{homeMatch.stats.seasonCSPercentage_overall}%</td>
                        <td>{homeMatch.stats.seasonCSPercentage_home}%</td>
                        <td>{homeMatch.stats.seasonCSPercentage_away}%</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>FTS</td>
                        <td>{homeMatch.stats.seasonFTSPercentage_overall}%</td>
                        <td>{homeMatch.stats.seasonFTSPercentage_home}%</td>
                        <td>{homeMatch.stats.seasonFTSPercentage_away}%</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>xG</td>
                        <td>{homeMatch.stats.xg_for_avg_overall}</td>
                        <td>{homeMatch.stats.xg_for_avg_home}</td>
                        <td>{homeMatch.stats.xg_for_avg_away}</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>xGA</td>
                        <td>{homeMatch.stats.xg_against_avg_overall}</td>
                        <td>{homeMatch.stats.xg_against_avg_home}</td>
                        <td>{homeMatch.stats.xg_against_avg_away}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  {/* Header */}
                  <div
                    style={{ display: "flex", gap: 20, alignItems: "center" }}
                  >
                    <LogoJogo src={match && match.teams.away.image} />
                    <div>
                      <p style={{ fontSize: 26, fontWeight: "bold" }}>
                        {match && match.teams.away.name}
                      </p>
                      <p>
                        <p>
                          Rank de Performance.{" "}
                          {match && match.teams.away.performance_rank > 10
                            ? match &&
                              match.teams.away.performance_rank + "/110"
                            : match &&
                              match.teams.away.performance_rank + "/10"}
                        </p>
                      </p>
                      <p>{match && match.teams.away.season_format}</p>
                    </div>
                  </div>
                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Forma</th>
                        <th>Últimos 5</th>
                        <th>PPG</th>
                      </tr>
                    </thead>
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
                            {awayMatch.stats.additional_info.formRun_overall
                              .substring(
                                awayMatch.stats.additional_info.formRun_overall
                                  .length - 5,
                                awayMatch.stats.additional_info.formRun_overall
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
                          {awayMatch.stats.seasonPPG_overall}
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
                            {awayMatch.stats.additional_info.formRun_home
                              .substring(
                                awayMatch.stats.additional_info.formRun_home
                                  .length - 5,
                                awayMatch.stats.additional_info.formRun_home
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
                          {awayMatch.stats.seasonPPG_home}
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
                            {awayMatch.stats.additional_info.formRun_away
                              .substring(
                                awayMatch.stats.additional_info.formRun_away
                                  .length - 5,
                                awayMatch.stats.additional_info.formRun_away
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
                          {awayMatch.stats.seasonPPG_away}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table style={{ width: "100%" }}>
                    <thead>
                      <tr>
                        <th>Estátisticas</th>
                        <th>Geral</th>
                        <th>Casa</th>
                        <th>Fora</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ textAlign: "center" }}>
                        <td>Vitória</td>
                        <td>{awayMatch.stats.winPercentage_overall}%</td>
                        <td>{awayMatch.stats.winPercentage_home}%</td>
                        <td>{awayMatch.stats.winPercentage_away}%</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>Média</td>
                        <td>{awayMatch.stats.seasonAVG_overall}</td>
                        <td>{awayMatch.stats.seasonAVG_home}</td>
                        <td>{awayMatch.stats.seasonAVG_away}</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>Marcaram</td>
                        <td>{awayMatch.stats.seasonScoredAVG_overall}</td>
                        <td>{awayMatch.stats.seasonScoredAVG_home}</td>
                        <td>{awayMatch.stats.seasonScoredAVG_away}</td>
                      </tr>
                      {/* SOFRERAM*/}
                      <tr style={{ textAlign: "center" }}>
                        <td>Sofreram</td>
                        <td>{awayMatch.stats.seasonConcededAVG_overall}</td>
                        <td>{awayMatch.stats.seasonConcededAVG_home}</td>
                        <td>{awayMatch.stats.seasonConcededAVG_away}</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>AM</td>
                        <td>{awayMatch.stats.seasonBTTSPercentage_overall}%</td>
                        <td>{awayMatch.stats.seasonBTTSPercentage_home}%</td>
                        <td>{awayMatch.stats.seasonBTTSPercentage_away}%</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>CS</td>
                        <td>{awayMatch.stats.seasonCSPercentage_overall}%</td>
                        <td>{awayMatch.stats.seasonCSPercentage_home}%</td>
                        <td>{awayMatch.stats.seasonCSPercentage_away}%</td>
                      </tr>
                      <tr style={{ textAlign: "center" }}>
                        <td>FTS</td>
                        <td>{awayMatch.stats.seasonFTSPercentage_overall}%</td>
                        <td>{awayMatch.stats.seasonFTSPercentage_home}%</td>
                        <td>{awayMatch.stats.seasonFTSPercentage_away}%</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>xG</td>
                        <td>{awayMatch.stats.xg_for_avg_overall}</td>
                        <td>{awayMatch.stats.xg_for_avg_home}</td>
                        <td>{awayMatch.stats.xg_for_avg_away}</td>
                      </tr>

                      <tr style={{ textAlign: "center" }}>
                        <td>xGA</td>
                        <td>{awayMatch.stats.xg_against_avg_overall}</td>
                        <td>{awayMatch.stats.xg_against_avg_home}</td>
                        <td>{awayMatch.stats.xg_against_avg_away}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* FORMA */}
            <div>
              <Title>Forma</Title>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10%",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: 24,
                    }}
                  >
                    {match && match.teams.home.name}
                  </p>

                  <p
                    style={{
                      fontSize: 16,
                      color: "green",
                    }}
                  >
                    Forma - Geral
                  </p>

                  <LogoJogo src={match && match.teams.home.image} />
                  <div
                    style={{
                      padding: 10,
                      // width: "100%",
                      background: "orange",
                      borderRadius: "10px",
                      marginBottom: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: 24,
                      }}
                    >
                      {homeMatch.stats.seasonPPG_overall}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 5 }}>
                    {homeMatch.stats.additional_info.formRun_overall
                      .substring(
                        homeMatch.stats.additional_info.formRun_overall.length -
                          5,
                        homeMatch.stats.additional_info.formRun_overall.length
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
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: 24,
                    }}
                  >
                    {match && match.teams.away.name}
                  </p>

                  <p
                    style={{
                      fontSize: 16,
                      color: "green",
                    }}
                  >
                    Forma - Geral
                  </p>

                  <LogoJogo src={match && match.teams.away.image} />
                  <div
                    style={{
                      padding: 10,
                      // width: "100%",
                      background: "orange",
                      borderRadius: "10px",
                      marginBottom: 10,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                        fontSize: 24,
                      }}
                    >
                      {awayMatch.stats.seasonPPG_overall}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 5 }}>
                    {awayMatch.stats.additional_info.formRun_overall
                      .substring(
                        awayMatch.stats.additional_info.formRun_overall.length -
                          5,
                        awayMatch.stats.additional_info.formRun_overall.length
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
                </div>
              </div>
            </div>
            {/* FORMA */}
            <div className="Gols_obtidos">
              <Title>Gols Obtidos</Title>
              <div>
                <img src={match && match.teams.home.image} />
                <div>
                  <GraficGame
                    percent={
                      match && match.teams.home.stats.seasonScoredAVG_overall
                    }
                  >
                    <div></div>
                  </GraficGame>
                  <p>
                    {match && match.teams.home.name} -{" "}
                    {homeMatch.stats.seasonScoredAVG_overall} gol por jogo
                  </p>
                </div>
              </div>
              <div>
                <img src={match && match.teams.away.image} />
                <div>
                  <GraficGame
                    percent={
                      match && match.teams.away.stats.seasonScoredAVG_overall
                    }
                  >
                    <div></div>
                  </GraficGame>
                  <p>
                    {match && match.teams.away.name} -{" "}
                    {awayMatch.stats.seasonScoredAVG_overall} gol por jogo
                  </p>
                </div>
              </div>
            </div>
            {/* Over 2.5 e Ambas as equipes marcam */}
            <Title>Over 2.5 & Ambas Equipes Marcam</Title>
            <HeaderOptions>
              <span
                className={headerOpen.over === "over_X" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, over: "over_X" });
                }}
              >
                Over
              </span>
              <span
                className={headerOpen.over === "under_X" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, over: "under_X" });
                }}
              >
                Under
              </span>
            </HeaderOptions>
            <Table>
              {headerOpen.over === "over_X" && (
                <>
                  <thead>
                    <th>Gols / Jogo</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                    <th>Média</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Over 0.5</td>
                      <td>
                        {homeMatch.stats["seasonOver05Percentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["seasonOver05Percentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 1.5</td>
                      <td>
                        {homeMatch.stats["seasonOver15Percentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["seasonOver15Percentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 2.5</td>
                      <td>
                        {homeMatch.stats["seasonOver25Percentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["seasonOver25Percentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 3.5</td>
                      <td>
                        {homeMatch.stats["seasonOver35Percentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["seasonOver35Percentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 4.5</td>
                      <td>
                        {homeMatch.stats["seasonOver45Percentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["seasonOver45Percentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                </>
              )}
              {headerOpen.over === "under_X" && (
                <>
                  <thead>
                    <th>Gols / Jogo</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                    <th>Média</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Under 0.5</td>
                      <td>
                        {homeMatch.stats["seasonUnder05Percentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["seasonUnder05Percentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Under 1.5</td>
                      <td>
                        {homeMatch.stats["seasonUnder15Percentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["seasonUnder15Percentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Under 2.5</td>
                      <td>
                        {homeMatch.stats["seasonUnder25Percentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["seasonUnder25Percentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Under 3.5</td>
                      <td>
                        {homeMatch.stats["seasonUnder35Percentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["seasonUnder35Percentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Under 4.5</td>
                      <td>
                        {homeMatch.stats["seasonUnder45Percentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["seasonUnder45Percentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                </>
              )}
            </Table>
            {/* CANTOS */}
            <Title>Cantos</Title>
            <HeaderOptions>
              <span
                className={headerOpen.cantos === "TIMES" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, cantos: "TIMES" });
                }}
              >
                Time
              </span>
              <span
                className={headerOpen.cantos === "TOTAL" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, cantos: "TOTAL" });
                }}
              >
                Total
              </span>
              <span
                className={
                  headerOpen.cantos === "1_AND_2_HALF" ? "actived" : ""
                }
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, cantos: "1_AND_2_HALF" });
                }}
              >
                1º e 2º Tempo
              </span>
            </HeaderOptions>
            <Table>
              {headerOpen.cantos === "TIMES" && (
                <>
                  <thead>
                    <th>Cantos de Time</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                    <th>Média</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Over 2.5</td>
                      <td>
                        {homeMatch.stats["over25CornersForPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over25CornersForPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 3.5</td>
                      <td>
                        {homeMatch.stats["over35CornersForPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over35CornersForPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 4.5</td>
                      <td>
                        {homeMatch.stats["over45CornersForPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over45CornersForPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>
                        <br />
                      </td>
                    </tr>
                    <tr>
                      <td>Over 2.5</td>
                      <td>
                        {homeMatch.stats["over25CornersAgainst_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over25CornersAgainst_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 3.5</td>
                      <td>
                        {homeMatch.stats["over35CornersAgainst_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over35CornersAgainst_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 4.5</td>
                      <td>
                        {homeMatch.stats["over45CornersAgainst_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over45CornersAgainst_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                </>
              )}
              {headerOpen.cantos === "TOTAL" && (
                <>
                  <thead>
                    <th>Cantos / partidas</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                    <th>Média</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Over 6</td>
                      <td>
                        {homeMatch.stats["over65CornersPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over65CornersPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 7</td>
                      <td>
                        {homeMatch.stats["over75CornersPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over75CornersPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 8</td>
                      <td>
                        {homeMatch.stats["over85CornersPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over85CornersPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 9</td>
                      <td>
                        {homeMatch.stats["over95CornersPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over95CornersPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 10</td>
                      <td>
                        {homeMatch.stats["over105CornersPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over105CornersPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 11</td>
                      <td>
                        {homeMatch.stats["over115CornersPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over115CornersPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 12</td>
                      <td>
                        {homeMatch.stats["over125CornersPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over125CornersPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 13</td>
                      <td>
                        {homeMatch.stats["over135CornersPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over135CornersPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                </>
              )}
              {headerOpen.cantos === "1_AND_2_HALF" && (
                <>
                  <thead>
                    <th>1º Tempo</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                    <th>Média</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Média</td>
                      <td>{homeMatch.stats["corners_fh_avg_overall"]}</td>
                      <td>{awayMatch.stats["corners_fh_avg_overall"]}</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 4</td>
                      <td>
                        {homeMatch.stats["corners_fh_over4_percentage_overall"]}
                        %
                      </td>
                      <td>
                        {awayMatch.stats["corners_fh_over4_percentage_overall"]}
                        %
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 5</td>
                      <td>
                        {homeMatch.stats["corners_fh_over5_percentage_overall"]}
                        %
                      </td>
                      <td>
                        {awayMatch.stats["corners_fh_over5_percentage_overall"]}
                        %
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 6</td>
                      <td>
                        {homeMatch.stats["corners_fh_over6_percentage_overall"]}
                        %
                      </td>
                      <td>
                        {awayMatch.stats["corners_fh_over6_percentage_overall"]}
                        %
                      </td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                  <thead>
                    <th>2º Tempo</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                    <th>Média</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Média</td>
                      <td>{homeMatch.stats["corners_2h_avg_overall"]}</td>
                      <td>{awayMatch.stats["corners_2h_avg_overall"]}</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 4</td>
                      <td>
                        {homeMatch.stats["corners_2h_over4_percentage_overall"]}
                        %
                      </td>
                      <td>
                        {awayMatch.stats["corners_2h_over4_percentage_overall"]}
                        %
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 5</td>
                      <td>
                        {homeMatch.stats["corners_2h_over5_percentage_overall"]}
                        %
                      </td>
                      <td>
                        {awayMatch.stats["corners_2h_over5_percentage_overall"]}
                        %
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 6</td>
                      <td>
                        {homeMatch.stats["corners_2h_over6_percentage_overall"]}
                        %
                      </td>
                      <td>
                        {awayMatch.stats["corners_2h_over6_percentage_overall"]}
                        %
                      </td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                </>
              )}
            </Table>
            {/* FALTAS / IMPEDIMENTO / CHUTES */}
            <Title>Chutes, faltas e impedimentos</Title>
            <HeaderOptions>
              <span
                className={headerOpen.table_one === "SHOTS" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, table_one: "SHOTS" });
                }}
              >
                Chutes & Faltas
              </span>
              <span
                className={headerOpen.table_one === "OFFSIDES" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, table_one: "OFFSIDES" });
                }}
              >
                Impedimentos
              </span>
            </HeaderOptions>
            <Table>
              {headerOpen.table_one === "SHOTS" && (
                <>
                  <thead>
                    <th>Chutes / partidas</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                    <th>Média</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Chutes</td>
                      <td>{homeMatch.stats["shotsAVG_overall"]}</td>
                      <td>{awayMatch.stats["shotsAVG_overall"]}</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Chutes dentro</td>
                      <td>{homeMatch.stats["shotsOnTargetTotal_overall"]}</td>
                      <td>{awayMatch.stats["shotsOnTargetTotal_overall"]}</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Chutes fora</td>
                      <td>{homeMatch.stats["shotsOffTargetTotal_overall"]}</td>
                      <td>{awayMatch.stats["shotsOffTargetTotal_overall"]}</td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                  <thead>
                    <th>Faltas / partidas</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                    <th>Média</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Média de faltas</td>
                      <td>{homeMatch.stats["foulsAVG_overall"]}</td>
                      <td>{awayMatch.stats["foulsAVG_overall"]}</td>
                      <td>0.5</td>
                    </tr>
                    <tr>
                      <td>Total de faltas</td>
                      <td>{homeMatch.stats["foulsTotal_overall"]}</td>
                      <td>{awayMatch.stats["foulsTotal_overall"]}</td>
                      <td>0.5</td>
                    </tr>
                  </tbody>
                </>
              )}
              {headerOpen.table_one === "OFFSIDES" && (
                <>
                  <thead>
                    <th>Impedimentos / partidas</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                    <th>Média</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Média</td>
                      <td>{homeMatch.stats["offsidesAVG_overall"]}</td>
                      <td>{awayMatch.stats["offsidesAVG_overall"]}</td>
                      <td>0.5</td>
                    </tr>
                    <tr>
                      <td>Over 0.5</td>
                      <td>
                        {homeMatch.stats["over05OffsidesPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over05OffsidesPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 1.5</td>
                      <td>
                        {homeMatch.stats["over15OffsidesPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over15OffsidesPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 2.5</td>
                      <td>
                        {homeMatch.stats["over25OffsidesPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over25OffsidesPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 3.5</td>
                      <td>
                        {homeMatch.stats["over35OffsidesPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over35OffsidesPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 4.5</td>
                      <td>
                        {homeMatch.stats["over45OffsidesPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over45OffsidesPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 5.5</td>
                      <td>
                        {homeMatch.stats["over55OffsidesPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over55OffsidesPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 6.5</td>
                      <td>
                        {homeMatch.stats["over65OffsidesPercentage_overall"]}%
                      </td>
                      <td>
                        {awayMatch.stats["over65OffsidesPercentage_overall"]}%
                      </td>
                      <td>0%</td>
                    </tr>
                  </tbody>
                </>
              )}
            </Table>
            {/* Cartoes */}
            <Title>Cartões</Title>
            <HeaderOptions>
              <span
                className={headerOpen.card === "total" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, card: "total" });
                }}
              >
                Total
              </span>
              <span
                className={headerOpen.card === "CD" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, card: "CD" });
                }}
              >
                Cartões de Time
              </span>
            </HeaderOptions>
            <Table>
              <thead>
                <th>Cartões de Jogo</th>
                <th>{match && match.teams.home.name}</th>
                <th>{match && match.teams.away.name}</th>
                <th>Média</th>
              </thead>
              <tbody>
                {headerOpen.card === "total" && (
                  <>
                    <tr>
                      <td>Over 0.5</td>
                      <td>{homeMatch.stats.over05CardsPercentage_overall}%</td>
                      <td>{awayMatch.stats.over15CardsPercentage_overall}%</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 1.5</td>
                      <td>{homeMatch.stats.over15CardsPercentage_overall}%</td>
                      <td>{awayMatch.stats.over15CardsPercentage_overall}%</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 2.5</td>
                      <td>{homeMatch.stats.over25CardsPercentage_overall}%</td>
                      <td>{awayMatch.stats.over25CardsPercentage_overall}%</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 3.5</td>
                      <td>{homeMatch.stats.over35CardsPercentage_overall}%</td>
                      <td>{awayMatch.stats.over35CardsPercentage_overall}%</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 4.5</td>
                      <td>{homeMatch.stats.over45CardsPercentage_overall}%</td>
                      <td>{awayMatch.stats.over45CardsPercentage_overall}%</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 5.5</td>
                      <td>{homeMatch.stats.over55CardsPercentage_overall}%</td>
                      <td>{awayMatch.stats.over55CardsPercentage_overall}%</td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 6.5</td>
                      <td>{homeMatch.stats.over65CardsPercentage_overall}%</td>
                      <td>{awayMatch.stats.over65CardsPercentage_overall}%</td>
                      <td>0%</td>
                    </tr>
                  </>
                )}
                {headerOpen.card === "CD" && (
                  <>
                    <tr>
                      <td>Média de cartões</td>
                      <td>{homeMatch.stats["cardsAVG_overall"]}</td>
                      <td>{awayMatch.stats["cardsAVG_overall"]}</td>
                      <td>0.5</td>
                    </tr>
                    <tr>
                      <td>Over 0.5</td>
                      <td>
                        {homeMatch.stats.over05CardsForPercentage_overall}%
                      </td>
                      <td>
                        {awayMatch.stats.over05CardsForPercentage_overall}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 1.5</td>
                      <td>
                        {homeMatch.stats.over15CardsForPercentage_overall}%
                      </td>
                      <td>
                        {awayMatch.stats.over15CardsForPercentage_overall}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 2.5</td>
                      <td>
                        {homeMatch.stats.over25CardsForPercentage_overall}%
                      </td>
                      <td>
                        {awayMatch.stats.over25CardsForPercentage_overall}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 3.5</td>
                      <td>
                        {homeMatch.stats.over35CardsForPercentage_overall}%
                      </td>
                      <td>
                        {awayMatch.stats.over35CardsForPercentage_overall}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <td>
                      <br />
                    </td>
                    <tr>
                      <td>Over 0.5</td>
                      <td>
                        {homeMatch.stats.over05CardsAgainstPercentage_overall}%
                      </td>
                      <td>
                        {awayMatch.stats.over05CardsAgainstPercentage_overall}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 1.5</td>
                      <td>
                        {homeMatch.stats.over15CardsAgainstPercentage_overall}%
                      </td>
                      <td>
                        {awayMatch.stats.over15CardsAgainstPercentage_overall}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 2.5</td>
                      <td>
                        {homeMatch.stats.over25CardsAgainstPercentage_overall}%
                      </td>
                      <td>
                        {awayMatch.stats.over25CardsAgainstPercentage_overall}%
                      </td>
                      <td>0%</td>
                    </tr>
                    <tr>
                      <td>Over 3.5</td>
                      <td>
                        {homeMatch.stats.over35CardsAgainstPercentage_overall}%
                      </td>
                      <td>
                        {awayMatch.stats.over35CardsAgainstPercentage_overall}%
                      </td>
                      <td>0%</td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>
            {/* Gols por Minutos */}
            <Title>Gols por Minutos</Title>
            <HeaderOptions>
              <span
                className={headerOpen.gol_minut === "tempo" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, gol_minut: "tempo" });
                }}
              >
                Total
              </span>
              <span
                className={headerOpen.gol_minut === "obtidos" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, gol_minut: "obtidos" });
                }}
              >
                Obtidos
              </span>
              <span
                className={headerOpen.gol_minut === "sofrido" ? "actived" : ""}
                onClick={() => {
                  setHeaderOpen({ ...headerOpen, gol_minut: "sofrido" });
                }}
              >
                sofrido
              </span>
            </HeaderOptions>
            <Table>
              {headerOpen.gol_minut === "tempo" && (
                <>
                  <thead>
                    <th>Total - 10 Min</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0 - 10 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_0_to_10"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_0_to_10"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>11 - 20 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_11_to_20"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_11_to_20"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>21 - 30 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_21_to_30"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_21_to_30"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>31 - 40 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_31_to_40"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_31_to_40"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>41 - 50 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_41_to_50"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_41_to_50"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>51 - 60 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_51_to_60"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_51_to_60"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>61 - 70 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_61_to_70"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_61_to_70"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>71 - 80 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_71_to_80"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_71_to_80"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>81 - 90 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_81_to_90"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_81_to_90"]}
                        %
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <th>Total - 15 Min</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0 - 15 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_0_to_15"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_0_to_15"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>16 - 30 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_16_to_30"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_16_to_30"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>31 - 45 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_31_to_45"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_31_to_45"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>46 - 60 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_46_to_60"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_46_to_60"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>61 - 75 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_61_to_75"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_61_to_75"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>76 - 90 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_all_min_76_to_90"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_all_min_76_to_90"]}
                        %
                      </td>
                    </tr>
                  </tbody>
                </>
              )}
              {headerOpen.gol_minut === "obtidos" && (
                <>
                  <thead>
                    <th>Total - 10 Min</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0 - 10 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_0_to_10"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_0_to_10"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>11 - 20 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_11_to_20"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_11_to_20"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>21 - 30 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_21_to_30"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_21_to_30"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>31 - 40 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_31_to_40"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_31_to_40"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>41 - 50 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_41_to_50"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_41_to_50"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>51 - 60 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_51_to_60"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_51_to_60"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>61 - 70 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_61_to_70"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_61_to_70"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>71 - 80 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_71_to_80"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_71_to_80"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>81 - 90 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_81_to_90"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_81_to_90"]}
                        %
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <th>Total - 15 Min</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0 - 15 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_0_to_15"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_0_to_15"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>16 - 30 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_16_to_30"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_16_to_30"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>31 - 45 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_31_to_45"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_31_to_45"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>46 - 60 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_46_to_60"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_46_to_60"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>61 - 75 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_61_to_75"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_61_to_75"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>76 - 90 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_scored_min_76_to_90"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_scored_min_76_to_90"]}
                        %
                      </td>
                    </tr>
                  </tbody>
                </>
              )}
              {headerOpen.gol_minut === "sofrido" && (
                <>
                  <thead>
                    <th>Total - 10 Min</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0 - 10 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_0_to_10"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_0_to_10"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>11 - 20 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_11_to_20"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_11_to_20"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>21 - 30 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_21_to_30"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_21_to_30"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>31 - 40 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_31_to_40"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_31_to_40"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>41 - 50 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_41_to_50"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_41_to_50"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>51 - 60 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_51_to_60"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_51_to_60"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>61 - 70 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_61_to_70"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_61_to_70"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>71 - 80 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_71_to_80"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_71_to_80"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>81 - 90 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_81_to_90"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_81_to_90"]}
                        %
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <th>Total - 15 Min</th>
                    <th>{match && match.teams.home.name}</th>
                    <th>{match && match.teams.away.name}</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0 - 15 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_0_to_15"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_0_to_15"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>16 - 30 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_16_to_30"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_16_to_30"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>31 - 45 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_31_to_45"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_31_to_45"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>46 - 60 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_46_to_60"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_46_to_60"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>61 - 75 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_61_to_75"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_61_to_75"]}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td>76 - 90 Mins</td>
                      <td>
                        {match &&
                          match.teams.home.stats["goals_conceded_min_76_to_90"]}
                        %
                      </td>
                      <td>
                        {match &&
                          match.teams.away.stats["goals_conceded_min_76_to_90"]}
                        %
                      </td>
                    </tr>
                  </tbody>
                </>
              )}
            </Table>
          </ContentEstatisticas>
        </>
      )}
    </Main>
  );
}
export default Index;
