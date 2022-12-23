import React, { useState, useEffect } from "react";
import { Main, Title, Description } from "../Escanteios/styles";

import Table from "../../components/Table";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Estatísticas de ambas marcam";

function Index() {
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    Axios.get("/estatisticas/over-2-5/").then((res) => {
      setMatch(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <Main>
      <Title>Estatísticas para mais de 2.5 gols</Title>
      <Description>
        Procurando por estatística de mais de 2,5 metas para apostas? Encontre
        aqui estatísticas de futebol para mais de 2,5 gols. Os melhores jogos
        para mais de 2,5 gols.
      </Description>

      <Table
        header={["", "Times", "League", "Jogos", "2.5", "%"]}
        estatistica={match}
      />
      <Skeleton loading={loading} />
    </Main>
  );
}

export default Index;
