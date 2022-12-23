import React, { useEffect, useState } from "react";
import {
  Container,
  ContentLeague,
  ContainerTitle,
  Title,
  ContainerContent,
  NoContent,
} from "./styles";
import { TiStarOutline } from "react-icons/ti"; //Vazio
import League from "../League";
import Api from "../../services/Api";
import { useDispatch, useSelector } from "react-redux";
import Country from "../Country";

export let DATA = {
  FAVORITOS: [],
};

function Index({ league, setLeague }) {
  const favorite = useSelector((state) => state.favorite);
  const [country, setCountry] = useState();

  useEffect(() => {
    Api.get("/country/league/").then((res) => {
      console.log(res.data);
      setCountry(res.data.data);
    });
  }, []);

  return (
    <Container>
      <ContentLeague>
        <ContainerTitle>
          <Title>Favoritos</Title>
        </ContainerTitle>
        <ContainerContent>
          {favorite ? (
            favorite.favorite.map((f) => (
              <League
                key={f.id}
                id={f.id}
                img={f.img}
                name={f.name}
                type={f.type}
              />
            ))
          ) : (
            <NoContent>
              <span>
                Para selecionar seus favoritos, basta clicar no ícone
                <TiStarOutline /> localizado junto ao nome das ligas/equipes
              </span>
            </NoContent>
          )}
        </ContainerContent>
      </ContentLeague>
      <ContentLeague>
        <ContainerTitle>
          <Title>Principais Ligas</Title>
        </ContainerTitle>
        <ContainerContent>
          {country &&
            country.top.map((p) => {
              const stringTrade = (name) => {
                return name
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/ +/g, "-")
                  .replace("/", "-")
                  .replace(".", "")
                  .replace("'", "")
                  .replace(":", "")
                  .replace(/ı+/g, "i")
                  .replace(/-{2,}/g, "-");
              };
              return (
                <League
                  key={p.id}
                  id={p.name}
                  img={`http://154.12.226.71:8087/api/img?type=league&name=${p.name
                    .toLowerCase()
                    .replace(/ +/g, "-")}`}
                  name={p.name_pt}
                  type={"top"}
                  href={`estatistica/${p.link}`}
                />
              );
            })}
        </ContainerContent>
      </ContentLeague>
      <ContentLeague>
        <ContainerTitle>
          <Title>Países</Title>
        </ContainerTitle>
        <ContainerContent>
          {country &&
            country.country.map((country) => (
              <Country name={country.country} data={country.data} />
            ))}
        </ContainerContent>
      </ContentLeague>
    </Container>
  );
}

export default Index;
