import React, { useEffect, useState } from "react";
import { Main, Title, Description } from "./styles";

import Card from "../../components/Card";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Ambas marcam";

function Index() {
  let JOGOS_PLACAR_EXATO = [];
  const [jogos, setJogos] = useState(JOGOS_PLACAR_EXATO);
  const [loading, seLoading] = useState(true);
  useEffect(() => {
    Axios.get("palpites/ambas-marcam/").then((res) => {
      setJogos(res.data);
      seLoading(false);
    });
  }, []);
  return (
    <Main>
      <Title>Ambos Marca</Title>
      <Description>Dica de aposta para ambos marcam</Description>
      <Skeleton loading={loading} />

      {jogos &&
        jogos.map((p, index) => (
          <Card type={"ambosMarcam"} key={index} title={p.title} data={p} />
        ))}
    </Main>
  );
}

export default Index;
