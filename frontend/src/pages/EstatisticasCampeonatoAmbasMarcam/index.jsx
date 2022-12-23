import React, { useState, useEffect } from "react";
import { Main, Title, Description } from "../Escanteios/styles";

import Table from "../../components/Table";
import Axios from "../../services/Api";
document.title = "Shaftscore: Estatísticas de ambas marcam";

function Index() {
  const [match, setMatch] = useState();
  useEffect(() => {
    Axios.get("/melhores-campeonatos/ambos-marcam/").then((res) => {
      setMatch(res.data.data);
    });
  }, []);

  return (
    <Main>
      <Title>Melhores campeonatos para ambas marcam</Title>
      <Description>
        Procurando os melhores campeonato de futebol para ambas marcam? Encontre
        aqui todos os campeonatos de futebol com mais jogos de ambas marcam.
      </Description>

      <Table
        header={["", "League", "Jogos", "Ambas marcam", "%"]}
        ambasLeague={match}
      />
    </Main>
  );
}

export default Index;
