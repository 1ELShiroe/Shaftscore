import React, { useEffect, useState } from "react";
import { Main, Title, Description } from "./styles";

import CardPlacaExato from "../../components/CardPlacaExato";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Jogos de Hoje e Campeoanto brasileiro 2022";

function Index() {
  const [jogos, setJogos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/jogos-hoje-placar/").then((res) => {
      setJogos(res.data.data);
      setLoading(false);
    });
  }, []);
  return (
    <Main>
      <Title>Placar exato dos jogos de hoje</Title>
      <Description>Palpites com placares exatos e totais de gols</Description>
      <Skeleton loading={loading} />

      {jogos.map((p, index) => (
        <CardPlacaExato key={index} title={p["title"]} data={p.data} />
      ))}
    </Main>
  );
}

export default Index;
