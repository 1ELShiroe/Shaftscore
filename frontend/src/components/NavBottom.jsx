import React, { useEffect, useState } from "react";
import styled from "styled-components";
import color from "../assets/colors/color";
import League from "./League";
import { Favorite, League as LeagueIcon, Match } from "../assets/svgs";
import Close from "../assets/svgs/close.svg";
import { DATA } from "./NavBar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Api from "../services/Api";

const Container = styled.div`
  position: fixed;
  z-index: 100;
  bottom: 0vh;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  background-color: var(--bg-blue);
  @media (min-width: 1100px) {
    display: none;
  }

  ul {
    list-style: none;
    display: inline-flex;
    padding: 0.25rem 1rem;
    border-radius: 0.5rem;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    li {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
        color: var(--white);
        color: white;
      }
    }
  }
`;

const Wrapper = styled.div`
  top: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: var(--white);
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding-bottom: 5rem;
  img {
    max-width: 20px;
    object-fit: contain;
    margin: 0.5rem;
    cursor: pointer;
  }
  &.none {
    display: none !important;
  }
`;
const Content = styled.div`
  width: 100%;
  height: 100vh;
`;

const ContentLeague = styled.div`
  width: 100%;
  height: 100vh;
`;
const ContainerTitle = styled.div`
  width: 100%;
  background-color: var(--bg-gray-300);
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--bg-gray);
  border-radius: 8px;
`;

const Title = styled.h4`
  color: var(--black);
  font-weight: 700;
  text-align: center;
`;
const ContainerContent = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 5rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 4px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    margin-top: 10px;
    background: var(--black);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--bg-gray);
    border-radius: 10px;
  }
`;

const NavBottom = ({ league, setLeague }) => {
  const [click, setClick] = useState("");
  const favorite = useSelector((state) => state.favorite.favorite);
  const [country, setCountry] = useState();

  useEffect(() => {
    Api.get("/country/league/").then((res) => {
      setCountry(res.data.data);
    });
  }, []);

  return (
    <>
      <Wrapper className={click === "" && "none"}>
        <img
          src={Close}
          onClick={() => {
            setClick("");
          }}
        />
        <Content>
          <ContentLeague>
            <ContainerTitle>
              <Title>
                {click === "ligas"
                  ? "Principais Ligas"
                  : click === "favoritos"
                  ? "Meus favoritos"
                  : null}
              </Title>
            </ContainerTitle>
            <ContainerContent>
              {click === "favoritos" &&
                favorite.map((f) => (
                  <League
                    key={f.id}
                    id={f.id}
                    img={f.img}
                    name={f.name}
                    href={f.href}
                    type={f.type}
                    setClick={setClick}
                  />
                ))}
              {click === "ligas" &&
                country &&
                country.top.map((p) => (
                  <League
                    key={p.id}
                    id={p.name}
                    img={`http://154.12.226.71:8087/api/img?type=league&name=${p.name
                      .toLowerCase()
                      .replace(/ +/g, "-")}`}
                    name={p.name_pt}
                    href={`estatistica/${p.link}`}
                    type={"top"}
                    setClick={setClick}
                  />
                ))}
            </ContainerContent>
          </ContentLeague>
        </Content>
      </Wrapper>
      <Container>
        <ul>
          <Link to={"/"}>
            <li
              onClick={() => {
                setClick("");
              }}
            >
              <Match width={30} color={color.WHITE} />
              <p>Partidas</p>
            </li>
          </Link>
          <li
            onClick={() => {
              setClick("ligas");
            }}
          >
            <LeagueIcon width={30} color={color.WHITE} />
            <p>Ligas</p>
          </li>

          <li
            onClick={() => {
              setClick("favoritos");
            }}
          >
            <Favorite width={30} color={color.WHITE} />
            <p>Favoritos</p>
          </li>
        </ul>
      </Container>
    </>
  );
};

export default NavBottom;
