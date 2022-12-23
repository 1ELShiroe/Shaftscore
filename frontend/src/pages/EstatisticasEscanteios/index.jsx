import React, { useState, useEffect } from "react";
import { Main, Title, Description } from "../Escanteios/styles";

import Table from "../../components/Table";
import Axios from "../../services/Api";

document.title = "Shaftscore: Estatísticas de ambas marcam";

function Index() {
  const [match, setMatch] = useState();
  useEffect(() => {
    Axios.get("/melhores-campeonatos/escanteios/").then((res) => {
      setMatch(res.data.data);
    });
  }, []);

  return (
    <Main>
      <Title>Estatísticas de gol no primeiro tempo</Title>
      <Description>
        Procurando estatísticas de gols no primeiro tempo? Encontre aqui
        estatísticas de futebol para gols no primeiro tempo. Os melhores jogos
        para mais de HT.
      </Description>

      <Table
        header={["", "League", "Jogos", "Escanteios gerados", "MÉdia"]}
        escanteios={match}
      />
    </Main>
  );
}

export default Index;
