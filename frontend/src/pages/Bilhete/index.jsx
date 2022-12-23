import React, { useEffect, useState } from "react";
import { Container, Wrapper, Main, Title, Description } from "./styles";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import NavBottom from "../../components/NavBottom";
import Bilhete from "../../components/Bilhete";
import Axios from "../../services/Api";

document.title = "Shaftscore: Jogos de Hoje e Campeoanto brasileiro 2022";

function Index() {
  const [search, setSearch] = useState("");
  const [multiple, setMultiple] = useState();

  useEffect(() => {
    Axios.get("/bilhete-pronto").then((res) => {
      setMultiple(res.data.data);
    });
  }, []);
  return (
    <Main>
      <Title>Bilhete Pronto</Title>
      <Description>Melhores Bilhetes Prontos dos Jogos de Hoje</Description>
      {multiple && <Bilhete multiple={multiple} />}
    </Main>
  );
}

export default Index;
