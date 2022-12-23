import React, { useState, useEffect } from "react";
import { Main, Title, Description } from "../Escanteios/styles";

import Table from "../../components/Table";
import Axios from "../../services/Api";

document.title = "Shaftscore: Estatísticas de ambas marcam";

function Index() {
  const [match, setMatch] = useState();
  useEffect(() => {
    Axios.get("/melhores-campeonatos/2-tempo-gols/").then((res) => {
      setMatch(res.data.data);
    });
  }, []);

  return (
    <Main>
      <Title>Melhores campeonatos para gol no 2° tempo</Title>
      <Description>
        Procurando os melhores campeonato de futebol para cartões? Encontre aqui
        todos os campeonatos que geram mais cartões nos jogos. Abaixo confira os
        campeonatos que mais geram cartões no momento. Você pode conferir a
        nossa lista ordenada abaixo das principais ligas de futebol do mundo que
        mais geram cartões com detalhes do números de jogos e a média de cartões
        para cada campeonato.
      </Description>

      <Table
        header={["", "League", "Jogos", "Gol no 2° tempo", "Média"]}
        cardLeague={match}
      />
    </Main>
  );
}

export default Index;
