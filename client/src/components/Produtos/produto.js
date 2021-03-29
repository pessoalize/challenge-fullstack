import React, {Component} from "react";
import ProdutoDataService from "../../services/produto";

export default class Produto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.getProduto = this.getProduto.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateProduto = this.updateProduto.bind(this);
    this.deleteProduto = this.deleteProduto.bind(this);

    this.state = {
      currentProduto: {
        id: null,
        nome: "",
        descricao: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getProduto(this.props.match.params._id);
  }

  onChangeNome(e) {
    const nome = e.target.value;

    this.setState(function (prevState) {
      return {
        currentProduto: {
          ...prevState.currentProduto,
          nome: nome
        }
      };
    });
  }

  onChangeDescricao(e) {
    const descricao = e.target.value;

    this.setState(prevState => ({
      currentProduto: {
        ...prevState.currentProduto,
        descricao: descricao
      }
    }));
  }

  getProduto(id) {
    ProdutoDataService.get(id)
      .then(response => {
        this.setState({
          currentProduto: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentProduto._id,
      nome: this.state.currentProduto.nome,
      descricao: this.state.currentProduto.descricao,
      published: status
    };

    ProdutoDataService.update(this.state.currentProduto._id, data)
      .then(response => {
        this.setState(prevState => ({
          currentProduto: {
            ...prevState.currentProduto,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateProduto() {
    ProdutoDataService.update(
      this.state.currentProduto._id,
      this.state.currentProduto
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "O produto foi atualizado com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProduto() {
    ProdutoDataService.remove(this.state.currentProduto._id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/produtos')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const {currentProduto} = this.state;

    return (
      <div>
        {currentProduto ? (
          <div className="edit-form">
            <h4>Produto</h4>
            <form>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  value={currentProduto.nome}
                  onChange={this.onChangeNome}
                />
              </div>
              <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  id="descricao"
                  value={currentProduto.descricao}
                  onChange={this.onChangeDescricao}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteProduto}
            >
              Remover
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateProduto}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br/>
            <p>Clique em um Produto...</p>
          </div>
        )}
      </div>
    );
  }
}