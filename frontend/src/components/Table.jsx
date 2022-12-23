import React from "react";
import styled from "styled-components";
import color from "../assets/colors/color";

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
  @media (max-width: 700px) {
    overflow-x: scroll;
  }
`;
const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    background-color: var(--bg-blue);
    tr {
      font-size: 12px;
      gap: 10rem;
      th {
        font-weight: 400;
        padding: 0.25rem;
        p {
          color: var(--white);
        }
      }
    }
  }
  tbody {
    tr {
      background-color: var(--bg-gray-300);
      td {
        text-align: center;
      }
    }

    .bold {
      font-weight: 800;
    }
  }
  @media (max-width: 700px) {
    width: 700px;
    overflow-x: scroll;
    background-color: var(--bg-gray-300);
  }
`;

const Table = ({
  header,
  estatistica,
  escanteios,
  ambasLeague,
  overOneLeague,
  cardLeague,
  golTwoTime,
  TwoTemp,
  gols,
  over05,
  over15,
  over25,
  over35,
  over45,
  over55,
  over65,
  over75,
  over85,
  over95,
  over105,
  over115,
}) => {
  return (
    <Container>
      <TableStyle>
        <thead>
          <tr>
            {header.map((h) => (
              <th>
                <p>{h}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {console.log(estatistica)}
          {/* ESTATÍSTICAS */}
          {estatistica &&
            estatistica.map((i, index) => (
              <tr>
                <td className="bold" style={{ width: 10 }}>
                  {index + 1}
                </td>
                <td>{i.team}</td>
                <td>{i.league}</td>
                <td style={{ minWidth: 22 }}>{i.games}</td>
                <td style={{ minWidth: 22 }}>{i.bothMark}</td>
                <td style={{ width: 22 }}>{i.percentage}</td>
              </tr>
            ))}
          {/* ESCANTEIOS */}
          {escanteios &&
            escanteios.map((i, index) => (
              <tr>
                <td className="bold" style={{ width: 10 }}>
                  {index + 1}
                </td>
                <td>{i.league}</td>
                <td style={{ minWidth: 22 }}>{i.games}</td>
                <td style={{ minWidth: 22 }}>{i.gols}</td>
                <td style={{ width: 22 }}>{i.percentage}</td>
              </tr>
            ))}
          {/* AMBAS MARCAM  LEAGUE*/}
          {ambasLeague &&
            ambasLeague.map((i, index) => (
              <tr>
                <td className="bold" style={{ width: 10 }}>
                  {index + 1}
                </td>
                <td>{i.league}</td>
                <td style={{ minWidth: 22 }}>{i.games}</td>
                <td style={{ minWidth: 22 }}>{i.gols}</td>
                <td style={{ width: 22 }}>{i.percentage}</td>
              </tr>
            ))}
          {/* OVER LEAGUE*/}
          {overOneLeague &&
            overOneLeague.map((i, index) => (
              <tr>
                <td className="bold" style={{ width: 10 }}>
                  {index + 1}
                </td>
                <td>{i.league}</td>
                <td style={{ minWidth: 22 }}>{i.games}</td>
                <td style={{ minWidth: 22 }}>{i.gols}</td>
                <td style={{ width: 22 }}>{i.percentage}</td>
              </tr>
            ))}
          {/* CARD*/}
          {cardLeague &&
            cardLeague.map((i, index) => (
              <tr>
                <td className="bold" style={{ width: 10 }}>
                  {index + 1}
                </td>
                <td>{i.league}</td>
                <td style={{ minWidth: 22 }}>{i.games}</td>
                <td style={{ minWidth: 22 }}>{i.cards}</td>
                <td style={{ width: 22 }}>{i.average}</td>
              </tr>
            ))}
          {/* GOLs SEGUNDO TEMPO */}
          {golTwoTime &&
            golTwoTime.map((i, index) => (
              <tr>
                <td className="bold" style={{ width: 10 }}>
                  {index + 1}
                </td>
                <td>{i.league}</td>
                <td style={{ minWidth: 22 }}>{i.games}</td>
                <td style={{ minWidth: 22 }}>{i.gols}</td>
                <td style={{ width: 22 }}>{i.percentage}</td>
              </tr>
            ))}
          {gols && (
            <tr>
              <td>{gols[0]}</td>
              <td style={{ minWidth: 22 }}>{gols[1]}</td>
              <td style={{ minWidth: 22 }}>{gols[2]}</td>
              <td style={{ width: 22 }}>{gols[3]}</td>
            </tr>
          )}
          {over05 && (
            <tr>
              <td>{over05[0]}</td>
              <td style={{ minWidth: 22 }}>{over05[1]}</td>
              <td style={{ minWidth: 22 }}>{over05[2]}</td>
              <td style={{ width: 22 }}>{over05[3]}</td>
            </tr>
          )}
          {over15 && (
            <tr>
              <td>{over15[0]}</td>
              <td style={{ minWidth: 22 }}>{over15[1]}</td>
              <td style={{ minWidth: 22 }}>{over15[2]}</td>
              <td style={{ width: 22 }}>{over15[3]}</td>
            </tr>
          )}
          {over25 && (
            <tr>
              <td>{over25[0]}</td>
              <td style={{ minWidth: 22 }}>{over25[1]}</td>
              <td style={{ minWidth: 22 }}>{over25[2]}</td>
              <td style={{ width: 22 }}>{over25[3]}</td>
            </tr>
          )}
          {over35 && (
            <tr>
              <td>{over35[0]}</td>
              <td style={{ minWidth: 22 }}>{over35[1]}</td>
              <td style={{ minWidth: 22 }}>{over35[2]}</td>
              <td style={{ width: 22 }}>{over35[3]}</td>
            </tr>
          )}
          {over45 && (
            <tr>
              <td>{over45[0]}</td>
              <td style={{ minWidth: 22 }}>{over45[1]}</td>
              <td style={{ minWidth: 22 }}>{over45[2]}</td>
              <td style={{ width: 22 }}>{over45[3]}</td>
            </tr>
          )}
          {over55 && (
            <tr>
              <td>{over55[0]}</td>
              <td style={{ minWidth: 22 }}>{over55[1]}</td>
              <td style={{ minWidth: 22 }}>{over55[2]}</td>
              <td style={{ width: 22 }}>{over55[3]}</td>
            </tr>
          )}
          {over65 && (
            <tr>
              <td>{over65[0]}</td>
              <td style={{ minWidth: 22 }}>{over65[1]}</td>
              <td style={{ minWidth: 22 }}>{over65[2]}</td>
              <td style={{ width: 22 }}>{over65[3]}</td>
            </tr>
          )}
          {over75 && (
            <tr>
              <td>{over75[0]}</td>
              <td style={{ minWidth: 22 }}>{over75[1]}</td>
              <td style={{ minWidth: 22 }}>{over75[2]}</td>
              <td style={{ width: 22 }}>{over75[3]}</td>
            </tr>
          )}
          {over85 && (
            <tr>
              <td>{over85[0]}</td>
              <td style={{ minWidth: 22 }}>{over85[1]}</td>
              <td style={{ minWidth: 22 }}>{over85[2]}</td>
              <td style={{ width: 22 }}>{over85[3]}</td>
            </tr>
          )}

          {over95 && (
            <tr>
              <td>{over65[0]}</td>
              <td style={{ minWidth: 22 }}>{over95[1]}</td>
              <td style={{ minWidth: 22 }}>{over95[2]}</td>
              <td style={{ width: 22 }}>{over95[3]}</td>
            </tr>
          )}
          {over105 && (
            <tr>
              <td>{over105[0]}</td>
              <td style={{ minWidth: 22 }}>{over105[1]}</td>
              <td style={{ minWidth: 22 }}>{over105[2]}</td>
              <td style={{ width: 22 }}>{over105[3]}</td>
            </tr>
          )}
          {over115 && (
            <tr>
              <td>{over115[0]}</td>
              <td style={{ minWidth: 22 }}>{over115[1]}</td>
              <td style={{ minWidth: 22 }}>{over115[2]}</td>
              <td style={{ width: 22 }}>{over115[3]}</td>
            </tr>
          )}
          {/* <tr>
            <td className="bold">Obtidos / jogo</td>
            <td>0.82</td>
            <td>1</td>
            <td>0.6</td>
          </tr> */}
        </tbody>
      </TableStyle>
    </Container>
  );
};

export default Table;
