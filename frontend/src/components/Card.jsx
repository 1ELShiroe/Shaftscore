import React, { useEffect, useState } from "react";
import styled from "styled-components";
import color from "../assets/colors/color";

const Container = styled.div`
  width: 90%;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 10px;
`;

const Header = styled.div`
  padding: 1rem 2rem;
  border-radius: 10px;
  background-color: var(--color-red);
  border-left: 5px solid red;
  cursor: pointer;
  margin-bottom: 1rem;
  overflow: hidden;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 800;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;

  &.ShowHide {
    animation: ShowHide 1s ease-in-out;
  }
  &.noHide {
    height: 0px;
    animation: noHide 1s ease-in-out;
  }
  @keyframes ShowHide {
    0% {
      height: 0px;
    }
    100% {
      height: 100%;
    }
  }

  @keyframes noHide {
    0% {
      height: 100%;
    }
    100% {
      height: 0px;
    }
  }
`;
const ItemCard = styled.div`
  border-left: 5px solid red;
  padding: 1rem 2rem;
  border-radius: 10px;
  align-items: center;
  background: var(--bg-gray-300);
  overflow: hidden;
`;
const Date = styled.p`
  font-size: 14px;
  font-weight: 400;
`;
const WrapperCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Confrontation = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const SuggestionWraper = styled.div`
  display: inline-flex;
  max-width: 40%;
  width: 100%;
  justify-content: space-around;
  flex-wrap: wrap;
  .green {
    color: #56c000;
    font-weight: 800;
    letter-spacing: 2px;
  }

  @media screen and (max-width: 700px) {
    max-width: 100%;
    justify-content: space-between;
  }
`;
const SuggestionText = styled.div`
  font-weight: 800;
  @media screen and (max-width: 700px) {
    font-size: 14px;
  }
`;
const Suggestion = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  @media screen and (max-width: 700px) {
    span {
      font-size: 14px;
    }
  }
`;

const Card = ({ data, title, type, reason }) => {
  const [actived, setActived] = useState(true);
  console.log(data);
  return (
    <Container>
      <Header
        onClick={() => {
          setActived(!actived);
        }}
      >
        <Title>{title}</Title>
      </Header>

      <Content className={actived ? "ShowHide" : "noHide"}>
        {data instanceof Object  && type !== "golsHoje" ? (
          <>
            <ItemCard>
              <Date>{data.date}</Date>
              <WrapperCard>
                <Confrontation>{data.confront && data.confront}</Confrontation>
                <Confrontation>
                  {data.teamOne && `${data.teamOne} x ${data.teamTwo}`}
                </Confrontation>
                <SuggestionWraper>
                  {type == "escanteio" ? (
                    <>
                      <SuggestionText>Escanteios:</SuggestionText>
                      <Suggestion>
                        <span className="green">+ {data.escanteios}</span>
                      </Suggestion>
                    </>
                  ) : (
                    <>
                      <SuggestionText>Gol :</SuggestionText>
                      <Suggestion>
                        <span>{data.guesses}</span>
                      </Suggestion>
                    </>
                  )}
                </SuggestionWraper>
              </WrapperCard>
            </ItemCard>
          </>
        ) : (
          data &&
          data.map(
            (item) =>
              item && (
                <ItemCard>
                  <Date>{item.date}</Date>
                  {console.log(item)}
                  <WrapperCard>
                    <Confrontation>
                      {item.confront && item.confront}
                    </Confrontation>
                    <Confrontation>
                      {item.teamOne && `${item.teamOne} x ${item.teamTwo}`}
                    </Confrontation>

                    <SuggestionWraper>
                      {type === "ambosMarcam" && (
                        <>
                          <SuggestionText>Ambos marcam:</SuggestionText>
                          <Suggestion>
                            <span>{item.guesses}</span>
                          </Suggestion>
                        </>
                      )}
                      {type === "palpiteCerto" && (
                        <>
                          <SuggestionText>:</SuggestionText>
                          <Suggestion>
                            <span>{item.guesses}</span>
                          </Suggestion>
                        </>
                      )}
                      {type === "golsHoje" && (
                        <>
                          <SuggestionText>Gols:</SuggestionText>
                          <Suggestion>
                            <span className="green">{item.gols}</span>
                          </Suggestion>
                        </>
                      )}
                      {!type && (
                        <>
                          <SuggestionText>{item.guesses}</SuggestionText>
                          <Suggestion>
                            <span className="green">{item.guesses}</span>
                          </Suggestion>
                        </>
                      )}
                    </SuggestionWraper>
                  </WrapperCard>
                  {reason && (
                    <>
                      <SuggestionText>Motivo</SuggestionText>
                      <Suggestion>{item.reason}</Suggestion>
                    </>
                  )}
                </ItemCard>
              )
          )
        )}
      </Content>
    </Container>
  );
};

export default Card;
