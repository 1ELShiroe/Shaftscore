import React, { useEffect, useState } from "react";
import { Main, Title, Description } from "./styles";

import CardPalpiteAmanha from "../../components/CardPalpiteAmanha";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Jogos de Hoje e Campeoanto brasileiro 2022";

function Index() {
  const [tomorrow, setTomorrow] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/palpites/amanha").then((res) => {
      setTomorrow(res.data.data);
    });
    setLoading(false);
  }, []);
  return (
    <Main>
      <Title>Palpites de amanhã</Title>
      <Description>
        Procurando palpites de futebol para os jogos de amanhã ? Receba as
        melhores dicas grátis e palpites para apostas de futebol amanhã
      </Description>
      <Skeleton loading={loading} />
      {tomorrow &&
        tomorrow.map((t) => (
          <CardPalpiteAmanha title={t.league} data={t.games} />
        ))}
    </Main>
  );
}

export default Index;
