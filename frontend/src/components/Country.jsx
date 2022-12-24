import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { TiStar } from "react-icons/ti"; //Preenchido
import { TiStarOutline } from "react-icons/ti"; //Vazio
import { removeFavorite, addFavorite } from "../redux/favoritesRedux";
import { useDispatch, useSelector } from "react-redux";
import color from "../assets/colors/color";
import League from "./League";
import { BASE_URL } from "../services/Api";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  svg {
    font-size: 20px;
    cursor: pointer;
    &:hover {
      transition: all 0.5s;
      fill: var(--bg-gray);
    }
  }
`;
export const Left = styled.div`
  text-decoration: none;
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const Title = styled.div`
  color: var(--black);
  font-weight: 700;
  text-align: center;
`;

const Country = ({ name, data, id }) => {
  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Title
        onClick={() => setOpen(!open)}
        style={{
          textAlign: "left",
          marginTop: 10,
          cursor: "pointer",
        }}
      >
        <img
          style={{
            width: "7%",
            marginRight: 10,
          }}
          src={
            name == "International"
              ? "https://static.shaftscore.com/wp-content/uploads/2021/07/logo-shaftscore-site-outubro-2022.png"
              : `${BASE_URL}/img?type=country&name=${name
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(".", "")
                  .replace(/ +/g, "-")
                  .replace(/[\u0300-\u036f]/g, "")}`
          }
        />

        {name == "Brazil" ? "Brasil" : name}
      </Title>
      {open &&
        data.map((p) => {
          let name_clear = p.league_name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ +/g, "-")
            .replace("/", "-")
            .replace(".", "")
            .replace("'", "")
            .replace(":", "")
            .replace(/ı+/g, "i")
            .replace(/[ÀÁÂÃÄÅ]/g, "a")
            .replace(/[ÀÁÂÃÄÅ]/g, "A")
            .replace(/-{2,}/g, "-");
          return (
            <League
              key={p.season[p.season.length - 1].id}
              id={p.season[p.season.length - 1].id}
              img={`https://cdn.footystats.org/img/competitions/${p.country
                .toLowerCase()
                .replace(/ +/g, "-")}-${name_clear}.png`}
              name={p.league_name}
              href={p.link}
            />
          );
        })}
    </Container>
  );
};

export default Country;
