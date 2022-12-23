import React, { useEffect, useState } from "react";
import { Main, Title, Description } from "./styles";
import Card from "../../components/Card";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Ambas marcam";

function Index() {
  const [jogos, setJogos] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Axios.get("/palpites/certo").then((res) => {
      setJogos(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <Main>
      <Title>Palpite Certo</Title>
      <Description>Dica de aposta e palpite certo de hoje</Description>
      <Skeleton loading={loading} />
      {jogos &&
        jogos.map((p, index) => (
          <Card
            type={"palpiteCerto"}
            key={index}
            title={p["title"]}
            data={p}
            reason
          />
        ))}
    </Main>
  );
}

export default Index;
