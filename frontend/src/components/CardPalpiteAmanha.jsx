import React, { useEffect, useState } from "react";
import styled from "styled-components";
import color from "../assets/colors/color";
import moment from "moment";
import Skeleton from "./Skeleton";

const Container = styled.div`
  width: 95%;
  position: relative;
  margin: 0 auto;
  margin-bottom: 10px;
  scroll-behavior: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    height: 4px; /* width of the entire scrollbar */
  }

  ::-webkit-scrollbar-track {
    margin-top: 10px;
    background: var(--bg-gray-300);
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--bg-gray);
    border-radius: 10px;
  }
  @media (max-width: 600px) {
    overflow-x: scroll;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    background-color: var(--bg-blue);
    tr {
      font-size: 12px;
      th {
        width: 150px;
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: 400;
          padding: 0.25rem;
          color: var(--white);
        }

        span.white {
          color: var(--bg-blue);
          font-size: 12px;
          font-weight: 400;
          padding: 0.1rem;
          border-radius: 5px;
          background-color: var(--white);
        }
      }
      th:nth-child(1) {
        text-align: start;
        display: inline-flex;
        align-content: center;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      th:nth-child(2) {
        text-align: center;
        width: 350px;
      }
      th:not(th:nth-child(1)):not(th:nth-child(2)) {
        text-align: center;
      }
    }
  }
  tbody {
    tr {
      border-top: 5px solid var(--white);
      background-color: var(--white);
      td:nth-child(1) {
        display: inline-flex;
      }
      td {
        text-align: center;
        span.separator,
        span.date {
          background-color: var(--bg-gray);
          color: var(--white);
          padding: 0.25rem;
          font-size: 12px;
          border-radius: 5px;
          display: inline-flex;
        }
      }
      td:nth-child(2) {
        > div {
          display: flex;
          justify-content: center;
          align-content: center;
          gap: 5%;
          width: 300px;
          display: inline-flex;
          span {
            display: flex;
            width: 20px;
            text-align: center;
            justify-content: center;
          }

          @media (max-width: 600px) {
            p {
              min-width: 100px;
              max-width: 350px;
            }
          }
        }
      }
      td:nth-child(3) {
        width: 600px;
        span {
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 150px;
        }
      }
      .confronto {
        p {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 150px;
        }
      }
      span {
        min-width: 25px;
        display: flex;
        color: var(--white);
        text-align: center;
        justify-content: center;
        font-size: 12px;
        padding: 0.25rem;
        font-weight: 800;
        color: var(--white);
        border-radius: 8px;
      }
      span.palpite {
        background-color: #3886ba;
      }
      span.red_above_50 {
        background-color: red;
      }
      span.red_below_50 {
        background-color: #ff5c5c;
      }
      span.blue_above_50 {
        background-color: #00f;
      }
      span.blue_below_50 {
        background-color: #8ab3ff;
      }

      span.yellow_above_50 {
        background-color: #ffcc05;
      }
      span.yellow_below_50 {
        background-color: #ffed70;
      }
      span.green_below_50 {
        background-color: #030;
      }
      span.green_above_50 {
        background-color: #8cb88c;
      }
    }
  }

  &.skeleton {
    tbody > tr {
      height: 15px;
      border-radius: 15px;
      background-color: #dddbdd;
      animation: shimmer 2s infinite;
      transform: translateX(-100%);
      background-image: linear-gradient(
        90deg,
        rgba(#fff, 0) 0,
        rgba(#fff, 0.2) 20%,
        rgba(#fff, 0.5) 60%,
        rgba(#fff, 0)
      );
    }
    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  }
`;
const CardPalpiteAmanha = ({ title, data }) => {
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(data);
  moment.locale("pt-br");
  useEffect(() => {
    setDate(data);
    setLoading(false);
  }, [date]);
  return (
    <>
      <Skeleton loading={loading} />
      <Container>
        {title && (
          <Table border="0">
            <thead>
              <tr>
                <th colSpan={2}>
                  <p>{title}</p>
                </th>
                <th></th>
                <th>
                  <span className="white">PALPITES</span>
                </th>
                <th>
                  <p>1</p>
                </th>
                <th>
                  <p>X</p>
                </th>
                <th>
                  <p>2</p>
                </th>
                <th>
                  <p>ht1</p>
                </th>
                <th>
                  <p>htx</p>
                </th>
                <th>
                  <p>ht2</p>
                </th>
                <th>
                  <p>1.5</p>
                </th>
                <th>
                  <p>2.5</p>
                </th>
                <th>
                  <p>3.5</p>
                </th>
                <th>
                  <p>am</p>
                </th>
                <th>
                  <p>añ</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((d) => (
                  <tr>
                    <td>
                      <span className="date">
                        {moment(d.date).format("HH:mm")}
                      </span>
                    </td>
                    <td>
                      <div className="confronto">
                        <p>{d.teamOne}</p>
                        <span className="separator">-</span>
                        <p>{d.teamTwo}</p>
                      </div>
                    </td>
                    <td>
                      <span className="palpite">{d.palpite}</span>
                    </td>
                    <td>
                      <span className="red_above_50">{d.one}</span>
                    </td>
                    <td>
                      <span className="red_below_50">{d.x}</span>
                    </td>
                    <td>
                      <span className="red_below_50">{d.two}</span>
                    </td>
                    <td>
                      <span className="blue_below_50">{d.ht1}</span>
                    </td>
                    <td>
                      <span className="blue_above_50 ">{d.htx}</span>
                    </td>
                    <td>
                      <span className="blue_above_50 ">{d.ht2}</span>
                    </td>
                    <td>
                      <span className="yellow_below_50">{d.oneFive}</span>
                    </td>
                    <td>
                      <span className="yellow_above_50 ">{d.twoFive}</span>
                    </td>
                    <td>
                      <span className="yellow_above_50">{d.treeFive}</span>
                    </td>
                    <td>
                      <span className="green_above_50">{d.am ? d.am : 0}</span>
                    </td>
                    <td>
                      <span className="green_above_50">
                        {d.an ? d.an : "0"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default CardPalpiteAmanha;
