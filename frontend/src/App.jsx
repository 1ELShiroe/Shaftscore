import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PlacaExato from "./pages/PlacaExato";
import Header from "./components/Header";
import PalpitesAmanha from "./pages/PalpitesAmanha";
import AmbosMarcam from "./pages/AmbosMarcam";
import FavoritosHoje from "./pages/FavoritosHoje";
import PalpiteCerto from "./pages/PalpiteCerto";
import PalpitesHoje from "./pages/PalpitesHoje";
import Bilhete from "./pages/Bilhete";
import Escanteios from "./pages/Escanteios";
import GolsHoje from "./pages/GolsHoje";
import GolPrimeiro from "./pages/GolPrimeiro";
import PalpitesLeague from "./pages/PalpitesLeague";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Equipe from "./pages/Equipe";
import LeagueInfo from "./pages/LeagueInfo";
import ChampionInfo from "./pages/ChampionInfo";
import EstatisticasOverTwo from "./pages/EstatisticasOverTwo";
import EstatisticasAmbasMarcam from "./pages/EstatisticasAmbasMarcam";
import EstatisticasOverOne from "./pages/EstatisticasOverOne";
import EstatisticasFistTime from "./pages/EstatisticasFirstTime";
import EstatisticasEscanteios from "./pages/EstatisticasEscanteios";
import EstatisticasCampeonatoAmbasMarcam from "./pages/EstatisticasCampeonatoAmbasMarcam";
import EstatisticasCampeonatoOverOne from "./pages/EstatisticasCampeonatoOverOne";
import EstatisticasCampeonatoOverTwo from "./pages/EstatisticasCampeonatoOverTwo";
import EstatisticasCampeonatoOverTree from "./pages/EstatisticasCampeonatoOverTree";
import EstatisticasCampeonatoCard from "./pages/EstatisticasCampeonatoCard";
import EstatisticasCampeonatoOverTwoTime from "./pages/EstatisticasCampeonatoOverTwoTime";
import EstatisticasCampeonatoOverFirstTime from "./pages/EstatisticasCampeonatoOverFirstTime";
import styled from "styled-components";
import NavBottom from "./components/NavBottom";
import NavBar from "./components/NavBar";

function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("dark"));
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (darkMode === true) {
      localStorage.setItem("dark", true);
      document.querySelector("html").classList.add("dark-mode");
    } else {
      localStorage.setItem("dark", false);
      document.querySelector("html").classList.remove("dark-mode");
    }
  }, [darkMode]);
  return (
    <>
      <BrowserRouter>
        <Container>
          <Header
            darkModeFunction={setDarkMode}
            darkMode={darkMode}
            setSearch={setSearch}
          />
          <Wrapper
            style={{
              marginBottom: 100,
            }}
          >
            <NavBar />
            <NavBottom />
            <Content>
              {/* Rotas */}
              <Routes>
                <Route path="/" index element={<Home search={search} />} />
                <Route path="/palpites" element={<PalpitesHoje />} />
                <Route path="/palpites/placar-exato" element={<PlacaExato />} />
                {/* OK */}
                <Route path="/palpites/escanteios" element={<Escanteios />} />
                {/* NIVAL VAI ARRUMAR, LAYOUT INCORRETO! */}
                <Route
                  path="/palpites/gol-primeiro-tempo"
                  element={<GolPrimeiro />}
                />
                {/* OK */}
                <Route path="/palpites/amanha" element={<PalpitesAmanha />} />
                {/* OK */}
                <Route
                  path="/palpites/ambos-marcam"
                  element={<AmbosMarcam />}
                />
                {/* VALIDAR */}
                <Route
                  path="/palpites/favoritos-hoje"
                  element={<FavoritosHoje />}
                />
                {/* OK */}
                <Route
                  path="/palpites/palpite-certo"
                  element={<PalpiteCerto />}
                />
                {/* OK */}
                <Route path="/palpites/bilhete" element={<Bilhete />} />{" "}
                {/* OK */}
                <Route path="/palpites/gols-hoje" element={<GolsHoje />} />
                {/* OK*/}
                <Route
                  path="/palpites/league/:id"
                  element={<PalpitesLeague />}
                />
                {/* OK */}
                <Route
                  path="/jogo/:type/:league/:vs/:id/:leagueID/*"
                  // path="/jogo/:id/:league/:idHouse/:nameHouse/vs/:idOutside/:nameOutside"
                  element={<Game />}
                />
                {/* DÚVIDA */}
                <Route path="/equipe/:name/:id" element={<Equipe />} />
                {/* ESTATISTICAS */}
                <Route
                  path="/estatisticas/ambas-marca"
                  element={<EstatisticasAmbasMarcam />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/over-2-5"
                  element={<EstatisticasOverTwo />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/over-1-5"
                  element={<EstatisticasOverOne />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/gol-primeiro-tempo"
                  element={<EstatisticasFistTime />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/campeonatos/escanteios"
                  element={<EstatisticasEscanteios />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/campeonatos/ambas-marcam"
                  element={<EstatisticasCampeonatoAmbasMarcam />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/campeonatos/over-1-5"
                  element={<EstatisticasCampeonatoOverOne />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/campeonatos/over-2-5"
                  element={<EstatisticasCampeonatoOverTwo />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/campeonatos/over-3-5"
                  element={<EstatisticasCampeonatoOverTree />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/campeonatos/cartoes"
                  element={<EstatisticasCampeonatoCard />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/campeonatos/over-2-time"
                  element={<EstatisticasCampeonatoOverTwoTime />}
                />
                {/* OK */}
                <Route
                  path="/estatisticas/campeonatos/over-1-time"
                  element={<EstatisticasCampeonatoOverFirstTime />}
                />
                {/* OK */}
                <Route
                  path="/estatistica/league/:league/:id_footy/"
                  element={<LeagueInfo />}
                />
                <Route
                  path="/estatistica/champion/:league/:id_footy/"
                  element={<ChampionInfo />}
                />
              </Routes>
            </Content>
          </Wrapper>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 1280px;
  position: relative;
  margin: 0 auto;
  justify-content: space-between;
  width: 100%;
  gap: 1rem;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  width: 80%;
  @media screen and (max-width: 1100px) {
    & {
      width: 100%;
    }
  }
`;
