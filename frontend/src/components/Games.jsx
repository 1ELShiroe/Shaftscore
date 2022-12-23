import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Game from "./Game";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 90%;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.div`
  color: var(--black);
  font-weight: 700;
  text-align: left;
  margin-right: 50px;
`;

const Games = ({ data }) => {
  const [open, setOpen] = useState(true);
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
    <Container key={554548848848}>
      {data &&
        data.map((i) => {
          if (i.data.length > 0)
            return (
              <>
                <Link
                  to={`/estatistica/${
                    i && i.type == "Cup" ? "champion" : "league"
                  }/${stringTrade(i.name)}/${i.data[0].competition_id}`}
                >
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
                        width: "30px",
                        marginRight: 10,
                        textAlign: "center",
                      }}
                      src={i.logo}
                    />
                    {i.name}
                  </Title>
                </Link>
                {open &&
                  i.data.map((item) => (
                    <Game
                      key={item.id}
                      leagueID={item.competition_id}
                      type={i.type}
                      leagueName={i.name}
                      data={item}
                    />
                  ))}
              </>
            );
        })}
    </Container>
  );
};

export default Games;
