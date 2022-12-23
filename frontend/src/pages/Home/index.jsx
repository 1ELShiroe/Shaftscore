import React, { useEffect, useState } from "react";
import { Main, SubHeader } from "./styles";
import Games from "../../components/Games";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from "../../services/Api";
import DatePicker from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
registerLocale("pt-br", ptBR);

function Index({ search }) {
  const [actived, setActived] = useState("todo");
  const [startDate, setStartDate] = useState(new Date());
  const [finish, setFinish] = useState([]);
  const [how, setHow] = useState([]);
  const [all, setAll] = useState([]);

  var dateINPUT = new window.Date(startDate);
  var dateFinish =
    dateINPUT.getFullYear() +
    "-" +
    ((dateINPUT.getMonth() + 1 < 10 ? "0" : "") + (dateINPUT.getMonth() + 1)) +
    "-" +
    ((dateINPUT.getDate() < 10 ? "0" : "") + dateINPUT.getDate());

  useEffect(() => {
    setActived("todos");
    const collection = [];
    Axios.get(`/partidas/encerradas?date=${dateFinish}`).then((res) => {
      if (!res.data.error) {
        let finishDATA = res.data.data.map((item) => {
          const array = item.matchs.map((match) => {
            if (!match.season !== "-1") {
              let how = new Date();
              let date_match = new Date(match.date_unix * 1000);
              if (match.status.includes("suspended" || "complete"))
                return match;
              if (date_match.getTime() < how.getTime()) return match;
              else return;
            }
          });
          return {
            name: item.league,
            logo: item.logo,
            type: item.type,
            data: array.filter(function (i) {
              return i;
            }),
          };
        });
        setFinish(finishDATA);
      }
    });
    Axios.get(`/partidas/hoje`).then((res) => {
      if (!res.data.error) {
        let howDATA = res.data.data.map((item) => {
          const array = item.matchs.map((match) => {
            if (!match.season !== "-1") {
              let how = new Date();
              let date_match = new Date(match.date_unix * 1000);
              if (match.status.includes("suspended" || "complete"))
                return match;
              if (date_match.getTime() > how.getTime()) return match;
              else return;
            }
          });
          return {
            name: item.league,
            logo: item.logo,
            type: item.type,
            data: array.filter(function (i) {
              return i;
            }),
          };
        });
        collection.push(...howDATA);
        setHow(howDATA);
        setAll(collection);
      }

      setAll(collection.filter((i) => i.season !== "-1"));
    });
  }, [startDate]);

  return (
    <Main>
      <SubHeader>
        <span
          onClick={() => setActived("todos")}
          className={actived === "todos" ? "actived" : ""}
        >
          Todos os Jogos
        </span>

        <span
          onClick={() => setActived("encerrados")}
          className={actived === "encerrados" ? "actived" : ""}
        >
          Jogos Encerrados
        </span>
        <span
          onClick={() => setActived("proximo")}
          className={actived === "proximo" ? "actived" : ""}
        >
          Próximos Jogos
        </span>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          locale={ptBR}
        />
      </SubHeader>
      {actived === "encerrados" && <Games key={0} data={finish} />}
      {actived === "todos" && <Games key={1} data={all} />}
      {actived === "proximo" && <Games key={2} data={how} />}

      {finish && finish.length === 0 && (
        <p style={{ textAlign: "center" }}>Nenhum jogo encontrado</p>
      )}
    </Main>
  );
}

export default Index;
