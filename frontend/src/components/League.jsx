import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TiStar } from "react-icons/ti"; //Preenchido
import { TiStarOutline } from "react-icons/ti"; //Vazio
import { Link } from "react-router-dom";
import { removeFavorite, addFavorite } from "../redux/favoritesRedux";
import { useDispatch, useSelector } from "react-redux";

export const Container = styled.div`
  display: flex;
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
export const Img = styled.img`
  object-fit: contain;
  max-width: 20px;
`;
export const Title = styled.p`
  font-size: 14px;
  font-weight: 300;
  &::first-letter {
    text-transform: uppercase;
  }
`;

const League = ({ id, img, name, href, setClick, type }) => {
  var hrefDefault;
  const dispatch = useDispatch();
  const favorite_ = useSelector((state) => state.favorite.favorite);
  var isFavorite;
  favorite_.filter((f) => {
    if (f.id === id) {
      isFavorite = true;
    }
  });
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

  if (type == "team" && !href)
    hrefDefault = `/equipe/${stringTrade(name)}/${id}`;
  else if (type == "top") hrefDefault = href;
  else hrefDefault = `/estatistica/league/${stringTrade(name)}/${id}`;

  return (
    <Container>
      <Link to={hrefDefault ? hrefDefault : href}>
        <Left
          onClick={() => {
            setClick("");
          }}
        >
          <Img src={img} />
          <Title>{name}</Title>
        </Left>
      </Link>
      {isFavorite ? (
        <TiStar
          onClick={() =>
            dispatch(
              removeFavorite({
                id: id,
              })
            )
          }
        />
      ) : (
        <TiStarOutline
          onClick={() =>
            dispatch(
              addFavorite({
                id: id,
                name: name,
                img: img,
                href: href,
              })
            )
          }
        />
      )}
    </Container>
  );
};

export default League;
