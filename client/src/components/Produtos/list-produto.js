import React, {Component} from "react";
import ProdutoDataService from "../../services/produto";
import {Link} from "react-router-dom";
import socketIOClient from "socket.io-client";
import authHeader from "../../services/auth-header";

const ENDPOINT = "http://localhost:8080";

export default class ListProdutos extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchNome = this.onChangeSearchNome.bind(this);
    this.retrieveProdutos = this.retrieveProdutos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveProduto = this.setActiveProduto.bind(this);
    this.removeAllProdutos = this.removeAllProdutos.bind(this);
    this.searchNome = this.searchNome.bind(this);
    this.callSocket = this.callSocket.bind(this);

    this.state = {
      produtos: [],
      currentProduto: null,
      currentIndex: -1,
      searchNome: "",
      testeSocket: ""
    };
  }

  componentDidMount() {
    this.retrieveProdutos();
    this.callSocket();
  }

  onChangeSearchNome(e) {
    const searchNome = e.target.value;

    this.setState({
      searchNome: searchNome
    });
  }

  retrieveProdutos() {
    ProdutoDataService.getAll()
      .then(response => {
        this.setState({
          produtos: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveProdutos();
    this.setState({
      currentProduto: null,
      currentIndex: -1
    });
  }

  setActiveProduto(produto, index) {
    this.setState({
      currentProduto: produto,
      currentIndex: index
    });

  }

  removeAllProdutos() {
    ProdutoDataService.removeAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchNome() {
    ProdutoDataService.findByTitle(this.state.searchNome)
      .then(response => {
        this.setState({
          produtos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  callSocket() {
    const socket = socketIOClient(ENDPOINT, {
      extraHeaders: { Authorization: authHeader }
    });

    socket.on("FromAPI", data => {
      // setResponse(data);
      console.log('callSocket', data);
      this.setState({testeSocket: data});
    });
  }

  render() {
    const {searchNome, produtos, currentProduto, currentIndex} = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="pesquise pelo nome"
              value={searchNome}
              onChange={this.onChangeSearchNome}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchNome}
              >
                Pesquisar
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Lista de Produtos</h4>

          <ul className="list-group">
            {produtos &&
            produtos.map((produto, index) => (
              <li
                className={
                  "list-group-item " +
                  (index === currentIndex ? "active" : "")
                }
                onClick={() => this.setActiveProduto(produto, index)}
                key={index}
              >
                {produto.nome}
              </li>
            ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllProdutos}
          >
            Remover todos
          </button>
        </div>
        <div className="col-md-6">
          {currentProduto ? (
            <div>
              <h4>Produto</h4>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentProduto._id}
              </div>
              <div>
                <label>
                  <strong>Nome:</strong>
                </label>{" "}
                {currentProduto.nome}
              </div>
              <div>
                <label>
                  <strong>Desecrição:</strong>
                </label>{" "}
                {currentProduto.descricao}
              </div>

              <Link
                to={"/produtos/" + currentProduto._id}
                className="badge badge-warning"
              >
                Editar
              </Link>
            </div>
          ) : (
            <div>
              <br/>
              <p>Clique em produto...</p>
            </div>
          )}
        </div>
        <p> Socket <time dateTime={this.testeSocket}>{this.testeSocket}</time></p>
      </div>
    );
  }
}