import React, { useState } from "react";
import ProdutoDataService from "../services/produto";

const AddProduto = () => {
    const initialProdutoState = {
        id: null,
        nome: "",
        descricao: ""
    };
    const [produto, setProduto] = useState(initialProdutoState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        console.log('handleInputChange',event.target);
        const { name, value } = event.target;
        setProduto({ ...produto, [name]: value });
    };

    const saveProduto = () => {
        var data = {
            nome: produto.nome,
            descricao: produto.descricao
        };

        ProdutoDataService.create(data)
            .then(response => {
                setProduto({
                    id: response.data.id,
                    nome: response.data.nome,
                    descricao: response.data.descricao
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newProduto = () => {
        setProduto(initialProdutoState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newProduto}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="title">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={produto.nome}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição</label>
                        <input
                            type="text"
                            className="form-control"
                            id="descricao"
                            required
                            value={produto.descricao}
                            onChange={handleInputChange}
                            name="descricao"
                        />
                    </div>

                    <button onClick={saveProduto} className="btn btn-success">
                        Salvar
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddProduto;