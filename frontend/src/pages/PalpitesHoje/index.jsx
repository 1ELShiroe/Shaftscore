import React, { useEffect, useState } from "react";
import { Main, Title, Description } from "./styles";

import CardPalpiteAmanha from "../../components/CardPalpiteAmanha";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Jogos de Hoje e Campeoanto brasileiro 2022";
let JOGOS_PLACAR_EXATO = [];
function Index() {
  const [Jogos, setJogos] = useState(JOGOS_PLACAR_EXATO);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/palpites/hoje").then((res) => {
      setJogos(res.data.data);
      setLoading(false);
    });
  }, []);
  return (
    <Main>
      <Title>Palpites de Hoje</Title>
      <Description>
        Procurando palpites de futebol para os jogos de hoje ? Receba as
        melhores dicas grátis e palpites para apostas de futebol
      </Description>
      <Skeleton loading={loading} />
      {Jogos &&
        Jogos.map((p) => (
          <CardPalpiteAmanha
            key={p["league"]}
            title={p["league"]}
            data={p["games"]}
          />
        ))}
    </Main>
  );
}

export default Index;
