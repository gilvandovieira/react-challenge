import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEdit } from "@fortawesome/free-solid-svg-icons";

import api from "../api";
import ClienteModel from "../models/Cliente";

function Cliente() {
  const [clientes, setClientes] = useState<ClienteModel[]>([]);
  const [nome, setNome] = useState("");
  const [reloadClientes, setReloadClientes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [clienteId, setClienteId] = useState<Number | number>(0);
  const [alerta, setAlerta] = useState("");
  /**
   *
   */
  useEffect(() => {
    async function getClientes() {
      setIsLoading(true);
      const result = await api.get<ClienteModel[]>("/clientes");
      const c = await result.data;
      setClientes(c);
      setIsLoading(false);
    }
    getClientes();
  }, [reloadClientes]);
  /**
   *
   */
  useEffect(() => {
    const timeout = setTimeout(() => setAlerta(""), 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alerta]);

  /**
   *
   * @param event evento quando muda o estado do input
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let result;
    if (clienteId === 0) {
      result = await api.post("/clientes", { nome: nome });
    } else {
      result = await api.put(`/clientes/${clienteId}`, { nome: nome });
    }
    setReloadClientes(reloadClientes + 1);
    setClienteId(0);
    setNome("");
  };
  /**
   *
   * @param event evento disparado pelo react
   * @param cliente id do cliente para deleção
   */
  const deleteCliente = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cliente: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    api.delete(`/clientes/${cliente}`).catch((reject) => {
      if (reject.response.status === 400) {
        setAlerta("Cliente possui aluguéis pendentes.");
      }
    });

    setReloadClientes(reloadClientes + 1);
    setClienteId(0);
  };
  /**
   *
   * @param ev evento disparado pelo react
   * @param cliente id do cliente para envio ediçao
   */
  const edit = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    cliente: number
  ) => {
    ev.preventDefault();
    ev.stopPropagation();
    setClienteId(cliente);
    clientes.forEach((cli) => {
      if (cli.id === cliente) {
        setNome(cli.nome || "");
      }
    });
  };
  return (
    <div className="container-xl mt-5 bg-white h-100">
      {alerta !== "" ? (
        <div className="mt-5 p-3">
          <div className="alert alert-danger" role="alert">
            {alerta}
          </div>
        </div>
      ) : (
        ""
      )}
      <form className="m-5 p-3" onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={handleChange}
          />
          <small className="form-text text-muted">Exemplo: John Smith</small>
        </div>
        <button type="submit" className="btn btn-info">
          Enviar
        </button>
      </form>
      {isLoading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        ""
      )}
      {clientes.length > 0 ? (
        <table className="table table-striped m-4 p-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((c) => {
              return (
                <tr key={Number(c.id)}>
                  <th scope="row">{c.id}</th>
                  <td className="mw-100 w-75">{c.nome}</td>
                  <td>
                    <div className="d-inline-block m-1">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={(ev) => edit(ev, Number(c.id))}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                        <small className="d-block">Editar</small>
                      </button>
                    </div>
                    <div className="d-inline-block m-1">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={(ev) => {
                          setClienteId(Number(c.id));
                          deleteCliente(ev, Number(c.id));
                        }}
                      >
                        <FontAwesomeIcon icon={faEraser} />
                        <small className="d-block">Remover</small>
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

export default Cliente;
