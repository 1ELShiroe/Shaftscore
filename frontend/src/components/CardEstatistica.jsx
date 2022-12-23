import React, { useEffect, useState } from "react";
import styled from "styled-components";
import color from "../assets/colors/color";

const Container = styled.div`
  width: 100%;
  margin-top: 1rem;

  @keyframes skeleton {
    to {
      opacity: 0.1;
    }
    from {
      opacity: 0.5;
    }
  }
`;
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    max-width: 30px;
  }
`;
const Date = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: var(--bg-gray);
`;
const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Description = styled.p`
  font-size: 16px;
  font-weight: 600;
  span {
    background-color: var(--bg-gray-300);
    padding: 0.25rem 0.5rem;
    display: inline-flex;
    border-radius: 10px;
  }
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const Card = styled.div`
  flex: 1;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--bg-blue);
  padding: 1rem;
  border-radius: 15px;
  gap: 1rem;
`;

const CardTitle = styled.h1`
  color: var(--bg-blue);
  width: 100%;
  font-weight: 600;
  border-radius: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  background-color: var(--white);
`;
const CardDescription = styled.p`
  color: var(--white);
  border-radius: 10px;
`;

const HeaderSkeleton = styled.div`
  animation: skeleton 1s ease infinite alternate;
  display: flex;
  justify-content: center;
  div {
    width: 80%;

    height: 100px;
    background-color: #313131;
    border-radius: 10px;
    overflow: hidden;
  }
`;

const CardSkeleton = styled.div`
  animation: skeleton 1s ease infinite alternate;

  flex: 1;
  min-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #313131;
  padding: 1rem;
  border-radius: 15px;
  gap: 1rem;
  min-height: 150px;
  margin-top: 15px;
`;

const CardEstatistica = ({ data }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [data]);

  return (
    <Container>
      {loading ? (
        <HeaderSkeleton>
          <div className="SkInfo">
            <img src="" />
            <h1></h1>
            <img src="" />
          </div>
        </HeaderSkeleton>
      ) : (
        <Header>
          <Title>
            {/* <img src={logoHouse?.logo} /> */}
            {data.teamOne} – {data.teamTwo}
            {/* <img src={data.icon_outside} /> */}
          </Title>
          <Date>{data.timestamp}</Date>
          <Description>Tendência estatística : {data.guesses}</Description>
        </Header>
      )}

      <Content>
        {loading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : (
          data.cards.map((d, index) => (
            <Card key={index}>
              <CardTitle>
                <img src="https://dicasbet.com.br/wp-content/uploads/2022/03/spacer.png" />{" "}
                {d.title}
              </CardTitle>
              <CardDescription>{d.description}</CardDescription>
            </Card>
          ))
        )}
        {}
      </Content>
    </Container>
  );
};

export default CardEstatistica;
