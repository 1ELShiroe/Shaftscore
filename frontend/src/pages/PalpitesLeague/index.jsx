import React, { useEffect, useState } from "react";
import { Main, Title, Description } from "./styles";

import CardEstatistica from "../../components/CardEstatistica";
import Axios from "../../services/Api";
import Skeleton from "../../components/Skeleton";
function Index() {
  const [leagueData, setLeagueData] = useState([]);
  const [loading, setLoading] = useState(true);

  document.title = "Shaftscore: Palpites do campeonato";
  console.log(window.location.pathname.split("/")[3]);
  useEffect(() => {
    Axios.get(
      `/ligas/${window.location.pathname.split("/")[3].toLocaleLowerCase()}`
    )
      .then((res) => {
        console.log(res)
        setLeagueData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLeagueData([]);
      });
  }, []);
  // window.location.pathname;
  return (
    <Main>
      <Title>Palpites </Title>
      <Description>
        Procurando palpites de futebol para os jogos de hoje ? Receba os
        palpites de hoje do.
      </Description>
      <Skeleton loading={loading} />
      {leagueData.length > 0 &&
        leagueData.map((c, index) => <CardEstatistica key={index} data={c} />)}
    </Main>
  );
}

export default Index;
