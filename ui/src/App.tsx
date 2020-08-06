import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import Cliente from "./pages/Cliente";
import Home from "./pages/Home";
import Livros from "./pages/Livros";
import Reserva from "./pages/Reserva";
import Aluguel from "./pages/Aluguel";

export default function App() {
  const [navBar, setNavBar] = useState("home");
  return (
    <Router>
      <div className="bg-light">
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <span className="navbar-brand">
            <FontAwesomeIcon icon={faBookOpen} />
          </span>
          <ul className="navbar-nav  mr-auto">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${navBar === "home" ? "active" : ""}`}
                onClick={(ev) => {
                  setNavBar("home");
                }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/clientes"
                className={`nav-link ${navBar === "clientes" ? "active" : ""}`}
                onClick={(ev) => {
                  setNavBar("clientes");
                }}
              >
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/livros"
                className={`nav-link ${navBar === "livros" ? "active" : ""}`}
                onClick={(ev) => {
                  setNavBar("livros");
                }}
              >
                Livros
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/reservas"
                className={`nav-link ${navBar === "reservas" ? "active" : ""}`}
                onClick={(ev) => {
                  setNavBar("reservas");
                }}
              >
                Reservas
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/alugueis"
                className={`nav-link ${navBar === "alugueis" ? "active" : ""}`}
                onClick={(ev) => {
                  setNavBar("alugueis");
                }}
              >
                Aluguéis
              </Link>
            </li>
          </ul>
        </nav>
        <div className="h-100 mh-100">
          <Switch>
            <Route path="/clientes">
              <Cliente></Cliente>
            </Route>
            <Route path="/livros">
              <Livros></Livros>
            </Route>
            <Route path="/reservas">
              <Reserva></Reserva>
            </Route>
            <Route path="/alugueis">
              <Aluguel></Aluguel>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}
