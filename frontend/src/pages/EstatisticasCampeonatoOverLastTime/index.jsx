import React, { useState } from "react";
import { Main, Title, Description } from "../Escanteios/styles";

import Table from "../../components/Table";

document.title = "Shaftscore: Estatísticas de ambas marcam";

const DATA = [
  {
    times: "Teste",
    league: "Teste",
    jogos: "Teste",
    ambas: 14,
    percent: "100%",
  },
  {
    times: "Teste",
    league: "Teste",
    jogos: "Teste",
    ambas: 14,
    percent: "100%",
  },
  {
    times: "Teste",
    league: "Teste",
    jogos: "Teste",
    ambas: 14,
    percent: "100%",
  },
  {
    times: "Teste",
    league: "Teste",
    jogos: "Teste",
    ambas: 14,
    percent: "100%",
  },
];

function Index() {
  return (
    <Main>
      <Title>Estatísticas para mais de 2.5 gols</Title>
      <Description>
        Procurando por estatística de mais de 2,5 metas para apostas? Encontre
        aqui estatísticas de futebol para mais de 1,5 gols. Os melhores jogos
        para mais de 2,5 gols.
      </Description>

      <Table
        header={["", "League", "Jogos", "+2.5", "%"]}
        overOneLeague={DATA}
      />
    </Main>
  );
}

export default Index;
