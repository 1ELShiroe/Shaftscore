import React, { useState, useEffect } from "react";
import { Main, Title, Description } from "../Escanteios/styles";

import Table from "../../components/Table";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Estatísticas de ambas marcam";

function Index() {
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("/estatisticas/ambos-marcam/").then((res) => {
      setMatch(res.data.data);
      setLoading(false);
    });
  }, []);
  return (
    <Main>
      <Title>Estatísticas de ambas marcam</Title>
      <Description>
        Procurando as estatísticas de pontuação de ambas as equipes? Encontre
        estatísticas de ambas as pontuações e veja melhores jogos para pontuação
        de ambas as equipes.
      </Description>
      <Table
        header={["", "Times", "League", "Jogos", "Ambas marcam", "%"]}
        estatistica={match}
      />
      <Skeleton loading={loading} />
    </Main>
  );
}

export default Index;
