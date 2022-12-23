import React, { useEffect, useState } from "react";
import { Main, Title, Description } from "./styles";

import Card from "../../components/Card";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";
document.title = "Shaftscore: Jogos de Hoje e Campeoanto brasileiro 2022";

function Index() {
  const [loading, setLoading] = useState(true);
  const [jogos, setJogos] = useState();
  useEffect(() => {
    Axios.get("/melhores-campeonatos/escanteios/").then((res) => {
      setJogos(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <Main>
      <Title>Palpites de escanteios</Title>
      <Description>Palpites com propabilidade de escanteios</Description>
      <Skeleton loading={loading} />
      {jogos &&
        jogos.map((p) => (
          <Card key={p.league} type={"escanteio"} title={p.league} data={p} />
        ))}
    </Main>
  );
}

export default Index;
