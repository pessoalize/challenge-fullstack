import React, {Component} from "react";
import ProdutoDataService from "../../services/produto";

export default class AddProduto extends Component {
  constructor(props) {
    super(props);
    this.onChangeNome = this.onChangeNome.bind(this);
    this.onChangeDescricao = this.onChangeDescricao.bind(this);
    this.saveProduto = this.saveProduto.bind(this);
    this.newProduto = this.newProduto.bind(this);

    this.state = {
      id: null,
      nome: "",
      descricao: "",

      submitted: false
    };
  }

  onChangeNome(e) {
    this.setState({
      nome: e.target.value
    });
  }

  onChangeDescricao(e) {
    this.setState({
      descricao: e.target.value
    });
  }

  saveProduto() {
    var data = {
      nome: this.state.nome,
      descricao: this.state.descricao
    };

    ProdutoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data._id,
          nome: response.data.nome,
          descricao: response.data.descricao,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newProduto() {
    this.setState({
      id: null,
      nome: "",
      descricao: "",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Salvo com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newProduto}>
              Adicionar + 1
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Nome</label>
              <input
                type="text"
                className="form-control"
                id="nome"
                required
                value={this.state.nome}
                onChange={this.onChangeNome}
                name="nome"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição</label>
              <input
                type="text"
                className="form-control"
                id="desc"
                required
                value={this.state.descricao}
                onChange={this.onChangeDescricao}
                name="desc"
              />
            </div>

            <button onClick={this.saveProduto} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}