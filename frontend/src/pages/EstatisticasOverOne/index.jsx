import React, { useState, useEffect } from "react";
import { Main, Title, Description } from "../Escanteios/styles";
import Axios from "../../services/Api";
import Table from "../../components/Table";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Estatísticas de ambas marcam";

function Index() {
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/estatisticas/over-1-5/").then((res) => {
      setMatch(res.data);
    });
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
        header={["", "Times", "League", "Jogos", "1.5", "%"]}
        estatistica={match}
      />
      <Skeleton loading={loading} />
    </Main>
  );
}

export default Index;
