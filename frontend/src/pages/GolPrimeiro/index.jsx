import React, { useEffect, useState } from "react";
import { Main, Title, Description } from "../Escanteios/styles";
import Card from "../../components/Card";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Jogos de Hoje e Campeoanto brasileiro 2022";

function Index() {
  const [loading, setLoading] = useState(true);
  const [jogos, setJogos] = useState();
  useEffect(() => {
    Axios.get("/palpites/1-tempo-gols").then((res) => {
      setJogos(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <Main>
      <Title>Palpites de gol no primeiro tempo</Title>
      <Description>Palpites de futebol para gol no primeiro tempo</Description>
      <Skeleton loading={loading} />

      {jogos &&
        jogos.map((p, index) => (
          <Card key={index} title={p.league} type="golPrimeiro" data={p} />
        ))}
    </Main>
  );
}

export default Index;
