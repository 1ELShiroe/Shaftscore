import React, { useEffect, useState } from "react";
import { Main, Title, Description } from "../Escanteios/styles";

import CardTable from "../../components/CardTable";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";

document.title = "Shaftscore: Favoritos de hoje";

function Index() {
  const [jogos, setJogos] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Axios.get("/favoritos-hoje").then((res) => {
      setJogos(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <Main>
      <Title>Favoritos de hoje</Title>
      <Description>
        Procurando times favoritos para apostar nos jogos de hoje? Encontre os
        melhores times favoritos para ganhar hoje nos jogos de futebol.
      </Description>
      <Skeleton loading={loading} />
      {jogos && jogos.map((f, index) => <CardTable key={index} data={f} />)}
    </Main>
  );
}

export default Index;
