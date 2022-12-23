import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  background-color: var(--bg-blue);
  height: 100vh;
  width: 20vw;
  left: 0;
  top: 0;
  z-index: 200;
  @media (max-width: 1260px) {
    width: 40vw;
  }
  @media (max-width: 660px) {
    width: 300px;
  }

  &.scale-out-left {
    -webkit-animation: scale-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53)
      both;
    animation: scale-out-left 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }

  @-webkit-keyframes scale-out-left {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      opacity: 1;
    }
  }
  @keyframes scale-out-left {
    0% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      opacity: 1;
    }
  }

  &.scale-in-left {
    -webkit-animation: scale-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
      both;
    animation: scale-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @-webkit-keyframes scale-in-left {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      opacity: 1;
    }
  }
  @keyframes scale-in-left {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 0% 50%;
      transform-origin: 0% 50%;
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  div {
    display: flex;
    justify-content: space-between;
    width: 200px;
    margin-top: 1rem;

    img {
      max-width: 160px;
    }
    @media (max-width: 460px) {
      margin-top: 1rem;
      img {
        max-width: 160px;
      }
    }
    svg {
      cursor: pointer;
      transition: 500ms;
      &:hover {
        fill: var(--color-red);
      }
    }
  }
  ul {
    list-style: none;
    li {
      a,
      p {
        padding: 0.75rem 1rem;
        border-radius: 2px;
        display: flex;
        color: white;
        cursor: pointer;
        font-weight: 600;
      }
      a:hover {
        background-color: white;
        color: var(--bg-blue);
      }
      div {
        margin-left: 1rem;
        width: 300px;
      }
      div.none {
        display: none;
      }
    }
  }
`;
const NavMenuLeft = ({ menuHambuer, setMenuHambuer }) => {
  const [prog, setProg] = useState(false);
  return (
    <Wrapper className={menuHambuer ? "scale-in-left " : "scale-out-left"}>
      <Header>
        <div>
          <img src={require("../assets/images/shaftlogo.png")} />
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            viewBox="0 0 121.31 122.876"
            enable-background="new 0 0 121.31 122.876"
            onClick={() => setMenuHambuer(!menuHambuer)}
          >
            <g>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M90.914,5.296c6.927-7.034,18.188-7.065,25.154-0.068 c6.961,6.995,6.991,18.369,0.068,25.397L85.743,61.452l30.425,30.855c6.866,6.978,6.773,18.28-0.208,25.247 c-6.983,6.964-18.21,6.946-25.074-0.031L60.669,86.881L30.395,117.58c-6.927,7.034-18.188,7.065-25.154,0.068 c-6.961-6.995-6.992-18.369-0.068-25.397l30.393-30.827L5.142,30.568c-6.867-6.978-6.773-18.28,0.208-25.247 c6.983-6.963,18.21-6.946,25.074,0.031l30.217,30.643L90.914,5.296L90.914,5.296z"
              />
            </g>
          </svg>
        </div>
        <ul>
          <li>
            <a
              href="https://shaftscore.com/sites-de-apostas-brasil/"
              target="_blank"
            >
              Melhores casas de apostas
            </a>
          </li>

          <li>
            <a
              href="https://shaftscore.com/bonus-casas-de-apostas-brasil/"
              target="_blank"
            >
              Bônus casas de apostas
            </a>
          </li>
          <li>
            <p onClick={() => setProg(!prog)}>Prognósticos</p>
            <div className={!prog && "none"}>
              <ul>
                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/"
                    target="_blank"
                  >
                    Prognósticos - Início
                  </a>
                </li>
                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/brasileirao-serie-a/"
                    target="_blank"
                  >
                    Prognósticos Brasileirão Série A
                  </a>
                </li>
                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/brasileirao-serie-b/"
                    target="_blank"
                  >
                    Prognósticos Brasileirão Série B
                  </a>
                </li>
                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/libertadores/"
                    target="_blank"
                  >
                    Prognósticos Libertadores
                  </a>
                </li>
                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/liga-dos-campeoes/"
                    target="_blank"
                  >
                    Liga dos campeões
                  </a>
                </li>
                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/ufc-273-2/"
                    target="_blank"
                  >
                    Prognósticos UFC
                  </a>
                </li>
                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/bundesliga/"
                    target="_blank"
                  >
                    Bundesliga
                  </a>
                </li>

                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/copa-do-brasil/"
                    target="_blank"
                  >
                    Prognósticos Copa do Brasil
                  </a>
                </li>

                <li>
                  <a
                    href="https://shaftscore.com/artigos/competicoes/campeonato-italiano-como-apostar-na-competicao/"
                    target="_blank"
                  >
                    Prognósticos Campeonato italiano
                  </a>
                </li>

                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/copa-do-mundo/"
                    target="_blank"
                  >
                    Prognósticos Copa do Mundo 2022
                  </a>
                </li>

                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/copa-sul-americana/"
                    target="_blank"
                  >
                    Prognósticos Copa Sul Americana
                  </a>
                </li>

                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/europa-league/"
                    target="_blank"
                  >
                    Prognósticos Europa League
                  </a>
                </li>

                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/la-liga/"
                    target="_blank"
                  >
                    La Liga
                  </a>
                </li>

                <li>
                  <a
                    href="https://shaftscore.com/prognosticos/futebol/premier-league/"
                    target="_blank"
                  >
                    Premier League
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <a href="https://shaftscore.com/artigos/" target="_blank">
              Artigos de apostas
            </a>
          </li>
          <li>
            <a
              href="https://shaftscore.com/noticias/apostas-online/"
              target="_blank"
            >
              Destaques
            </a>
          </li>
          <li>
            <a href="https://t.me/joinchat/VEQgorFvgLz1Svei" target="_blank">
              Grupo Telegram
            </a>
          </li>
          <li>
            <a
              href="https://shaftscore.zendesk.com/hc/pt-br/requests/new"
              target="_blank"
            >
              Contato
            </a>
          </li>
        </ul>
      </Header>
    </Wrapper>
  );
};

export default NavMenuLeft;
