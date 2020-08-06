import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEraser, faEdit } from "@fortawesome/free-solid-svg-icons";

import api from "../api";
import LivroModel from "../models/Livro";

export default function Livros() {
  const [livros, setLivros] = useState<LivroModel[]>([]);
  const [nome, setNome] = useState("");
  const [autor, setAutor] = useState("");
  const [reloadLivros, setReloadLivros] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [livroId, setLivroId] = useState(0);
  const [alerta, setAlerta] = useState("");
  /**
   *
   */
  useEffect(() => {
    async function getLivros() {
      setIsLoading(true);
      const result = await api.get<LivroModel[]>("/livros");
      const c = await result.data;
      setLivros(c);
      setIsLoading(false);
    }
    getLivros();
  }, [reloadLivros]);
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
   * @param event
   */
  const handleNomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNome(event.target.value);
  };
  /**
   *
   * @param event
   */
  const handleAutorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(event.target.value);
  };
  /**
   * 
   * @param event 
   */
  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let result;
    if (livroId === 0) {
      result = await api.post("/livros", { nome: nome, autor: autor });
    } else {
      result = await api.put(`/livros/${livroId}`, {
        nome: nome,
        autor: autor,
      });
    }
    setReloadLivros(reloadLivros + 1);
    setLivroId(0);
    setNome("");
    setAutor("");
  };
  /**
   * 
   * @param event 
   * @param livro 
   */
  const deletaLivro = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    livro: number
  ) => {
    event.preventDefault();
    event.stopPropagation();
    api.delete(`/livros/${livro}`).catch((error) => {
      if (error.response.status === 400) {
        setAlerta("Livro possui aluguéis pendentes.");
      }
    });
    setReloadLivros(reloadLivros + 1);
    setLivroId(0);
  };
  /**
   * 
   * @param ev 
   * @param livro 
   */
  const edit = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    livro: number
  ) => {
    ev.preventDefault();
    ev.stopPropagation();
    setLivroId(livro);
    livros.forEach((liv) => {
      if (liv.id === livro) {
        setNome(liv.nome || "");
        setAutor(liv.autor || "");
      }
    });
  };
  /**
   * 
   */
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
          <label htmlFor="nomeLivro">Nome do Livro</label>
          <input
            type="text"
            className="form-control"
            id="nomeLivro"
            value={nome}
            onChange={handleNomeChange}
          />
          <small className="form-text text-muted">
            Exemplo: Engenharia de Software ed.10
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="autor">Autor</label>
          <input
            type="text"
            className="form-control"
            id="autor"
            value={autor}
            onChange={handleAutorChange}
          />
          <small className="form-text text-muted">Exemplo: Sommervile</small>
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
      {livros.length > 0 ? (
        <table className="table table-striped m-4 p-3">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Autor</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((l) => {
              return (
                <tr key={l.id}>
                  <th scope="row">{l.id}</th>
                  <td className="mw-100 w-50">{l.nome}</td>
                  <td className="mw-100 w-25">{l.autor}</td>
                  <td>
                    <div className="d-inline-block m-1">
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={(ev) => edit(ev, l.id)}
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
                          setLivroId(l.id);
                          deletaLivro(ev, l.id);
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
