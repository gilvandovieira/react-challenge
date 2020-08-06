import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

import api from "../api";
import ReservaModel from "../models/Reserva";
import LivroModel from "../models/Livro";
import ClienteModel from "../models/Cliente";

export default function Reserva() {
  const [clientes, setClientes] = useState<ClienteModel[]>([]);
  const [livros, setLivros] = useState<LivroModel[]>([]);
  const [reservas, setReservas] = useState<ReservaModel[]>([]);
  const [cliente, setCliente] = useState(0);
  const [livro, setLivro] = useState<number[]>([]);
  const [reloadReservas, setReloadReservas] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  /**
   *
   */
  useEffect(() => {
    async function getLivros() {
      setIsLoading(true);
      const resultLivro = await api.get<LivroModel[]>("/livros");
      let livros = await resultLivro.data;
      setLivros(livros);
      const resultClientes = await api.get<ClienteModel[]>("/clientes");
      const clientes = await resultClientes.data;
      setClientes(clientes);
      const resultReservas = await api.get<ReservaModel[]>(
        "/operacoes/reservas"
      );
      const reservas = await resultReservas.data;
      setReservas(reservas);
      setIsLoading(false);
    }
    getLivros();
  }, [reloadReservas]);
  /**
   * 
   * @param event evento disparado pelo React quando é selecionado uma das opções
   */
  const handleClienteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCliente(Number(event.target.value));
  };
  /**
   * 
   * @param event evento possui HTMLCollection que indica os livros selecionados
   */
  const handleLivroChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let livros = [];
    setLivro([]);
    for (let i = 0; i < event.target.selectedOptions.length; i++) {
      livros.push(Number(event.target.selectedOptions[i].value));
    }
    setLivro(livros.reverse());
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    livro.forEach((liv) => {
      api.post("/operacoes/reservar", {
        cliente: cliente,
        livro: liv,
      });
    });
    setLivro([]);
    setCliente(0);
    setReloadReservas(reloadReservas + 1);
  };

  const cancelarReserva = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    reserva: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    await api.post("/operacoes/cancelar", { reserva: reserva });
    setReloadReservas(reloadReservas + 1);
  };

  return (
    <div className="container-xl mt-5 bg-white h-100">
      <form className="m-5 p-3" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="nomeCliente">Selecione o cliente</label>
          <select
            className="form-control"
            id="nomeCliente"
            onChange={handleClienteChange}
            value={cliente}
          >
            <option value="0">-</option>
            {clientes.map((cliente) => (
              <option key={Number(cliente.id)} value={Number(cliente.id)}>
                {cliente.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="livro">Selecione o livro</label>
          <select
            multiple
            className="form-control"
            id="livro"
            onChange={handleLivroChange}
            disabled={cliente === 0 || cliente === null}
          >
            {livros.map((livro) => (
              <option key={livro.id} value={livro.id}>
                {livro.nome} - {livro.autor}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-info">
          Confirmar reserva
        </button>
      </form>
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        ""
      )}
      {reservas.length > 0 ? (
        <table className="table table-striped m-4 p-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Cliente</th>
              <th scope="col">Livro/Autor</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r) => {
              return (
                <tr key={Number(r.id)}>
                  <th scope="row">{r.id}</th>
                  <td className="mw-100 w-25">{r.reservante?.nome}</td>
                  <td className="mw-100 w-50">
                    {r.livro?.nome} - {r.livro?.autor}
                  </td>
                  <td>
                    <div className="d-inline-block m-1">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(ev) => {
                          cancelarReserva(ev, Number(r.id));
                        }}
                      >
                        <FontAwesomeIcon icon={faWindowClose} />
                        <small className="d-block">Cancelar reserva</small>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}
