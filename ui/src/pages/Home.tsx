import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faBookReader } from "@fortawesome/free-solid-svg-icons";

import Reserva from "../models/Reserva";
import Aluguel from "../models/Aluguel";
import api from "../api";
function Home() {
  /**
   *
   */
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [alugueis, setAlugueis] = useState<Aluguel[]>([]);
  useEffect(() => {
    async function load() {
      const resultReservas = await api.get<Reserva[]>("/operacoes/reservas");
      const resultAlugueis = await api.get<Aluguel[]>("/operacoes/alugueis");
      setReservas(await resultReservas.data);
      setAlugueis(await resultAlugueis.data);
    }
    load();
  }, []);
  /**
   *
   */
  return (
    <div className="containter-xl mt-5">
      <div className="d-flex justify-content-around">
        <div className="m-5">
          <h1 className="display-3 ml-3">Reservas</h1>
          {reservas.reverse().map((reserva) => (
            <div className="card m-2 shadow" key={Number(reserva.id)}>
              <div className="card-body">
                <h5 className="card-title">{reserva.reservante?.nome}</h5>
                <h5 className="card-subtitle mb-2 text-muted">
                  <FontAwesomeIcon
                    icon={faBook}
                    style={{
                      width: "35px",
                      height: "35px",
                      marginRight: "15px",
                    }}
                  />
                  {reserva.livro?.nome} - {reserva.livro?.autor}
                </h5>
                <div className="d-flex d-flex-row">
                  <p className="text-white bg-success p-1 m-1 rounded-pill">
                    {new Date(reserva.dataInicio).toLocaleString("pt-BR")}
                  </p>
                  <p className="text-white bg-danger p-1 m-1 rounded-pill">
                    {new Date(reserva.dataFim).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="m-5">
          <h1 className="display-3 ml-3">Aluguéis</h1>
          {alugueis.map((aluguel) => (
            <div className="card m-2 shadow" key={Number(aluguel.id)}>
              <div className="card-body">
                <h5 className="card-title">{aluguel.cliente.nome}</h5>
                <h5 className="card-subtitle mb-2 text-muted">
                  <FontAwesomeIcon
                    icon={faBookReader}
                    style={{
                      width: "35px",
                      height: "35px",
                      marginRight: "15px",
                    }}
                  />
                  {aluguel.livro?.nome} - {aluguel.livro?.autor}
                </h5>
                <div className="d-flex d-flex-row">
                  <p className="text-white bg-success p-1 m-1 rounded-pill">
                    {new Date(aluguel.dataInicio).toLocaleString("pt-BR")}
                  </p>
                  <p className="text-white bg-danger p-1 m-1 rounded-pill">
                    {new Date(aluguel.dataFim).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
