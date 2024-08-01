import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function UpdateEstoque() {
  const [nome, setNome] = useState("");
  const [modelo, setModelo] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");
  const [local, setLocal] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse URL parameters from location search
    const queryParams = new URLSearchParams(location.search);

    // Set the initial values of the state variables based on URL parameters
    setNome(queryParams.get("nome") || "");
    setModelo(queryParams.get("modelo") || "");
    setPatrimonio(queryParams.get("patrimonio") || "");
    setEntrada(queryParams.get("entrada") || "");
    setSaida(queryParams.get("saida") || "");
    setLocal(queryParams.get("local") || "");
  }, [location.search]);

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`http://localhost:8081/update/${id}`, {
        nome,
        modelo,
        patrimonio,
        entrada,
        saida,
        local,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <div className="containerForm">
        <form onSubmit={handleSubmit}>
          <h2>Atualizar produto</h2>
          <div className="mb-2">
            <label htmlFor="">Nome</label>
            <input
              type="text"
              placeholder="Enter Nome"
              className="form-control inputEntrada"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Modelo</label>
            <input
              type="text"
              placeholder="Enter Modelo"
              className="form-control"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Patrimônio</label>
            <input
              type="text"
              placeholder="Enter Patrimônio"
              className="form-control"
              value={patrimonio}
              onChange={(e) => setPatrimonio(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Entrada</label>
            <input
              type="text"
              placeholder="Enter Entrada"
              className="form-control"
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Saída</label>
            <input
              type="text"
              placeholder="Enter Saída"
              className="form-control"
              value={saida}
              onChange={(e) => setSaida(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Local</label>
            <input
              type="text"
              placeholder="Enter Local"
              className="form-control"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn w-50 align-center btn-primary botao">
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateEstoque;
