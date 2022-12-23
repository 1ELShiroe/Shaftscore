import React, { useState, useEffect } from "react";
import { Main, Title, Description } from "../Escanteios/styles";

import Table from "../../components/Table";
import Axios from "../../services/Api";

document.title = "Shaftscore: Estatísticas de ambas marcam";

function Index() {
  const [match, setMatch] = useState();
  useEffect(() => {
    Axios.get("/melhores-campeonatos/acima-ou-abaixo-de-3-5-gols/").then(
      (res) => {
        setMatch(res.data.data);
      }
    );
  }, []);

  return (
    <Main>
      <Title>Estatísticas para mais de 1.5 gols</Title>
      <Description>
        Procurando por estatística de mais de 1,5 metas para apostas? Encontre
        aqui estatísticas de futebol para mais de 1,5 gols. Os melhores jogos
        para mais de 1,5 gols.
      </Description>

      <Table
        header={["", "League", "Jogos", "+1.5", "%"]}
        overOneLeague={match}
      />
    </Main>
  );
}

export default Index;
