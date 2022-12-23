import React, { useEffect, useState } from "react";
import { Main, Title, Description } from "../Escanteios/styles";
import Card from "../../components/Card";
import Axios from "../../services/Api";
import styled from "styled-components";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Palpites de gols hoje";
function Index() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [jogos, setJogos] = useState();
  useEffect(() => {
    Axios.get("/palpites/gols-hoje/").then((res) => {
      setJogos(res.data.data);
      setLoading(false);
    });
  }, [search]);
  return (
    <Main>
      <Title>Placar exato dos jogos de hoje</Title>
      <Description>Palpites com placares exatos e totais de gols</Description>
      <Skeleton loading={loading} />
      {jogos &&
        jogos.map((p, index) => (
          <Card
            key={index}
            title={p["league"]}
            type="golsHoje"
            data={p.games[0]}
          />
        ))}
    </Main>
  );
}

export default Index;
