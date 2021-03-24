import React, { useState, useEffect } from "react";
import ProdutoDataService from "../services/produto";

const Produto = props => {
    const initialProdutoState = {
        id: null,
        nome: "",
        descricao: ""
    };
    const [currentProduto, setCurrentProduto] = useState(initialProdutoState);
    const [message, setMessage] = useState("");

    const getTutorial = id => {
        ProdutoDataService.get(id)
            .then(response => {
                setCurrentProduto(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getTutorial(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentProduto({ ...currentProduto, [name]: value });
    };

    const updatePublished = status => {
        var data = {
            id: currentProduto.id,
            nome: currentProduto.nome,
            descricao: currentProduto.descricao
        };

        ProdutoDataService.update(currentProduto.id, data)
            .then(response => {
                setCurrentProduto({ ...currentProduto });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateTutorial = () => {
        ProdutoDataService.update(currentProduto.id, currentProduto)
            .then(response => {
                console.log(response.data);
                setMessage("O Produto foi atualizado com sucesso!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTutorial = () => {
        ProdutoDataService.remove(currentProduto.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/produtos");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentProduto ? (
                <div className="edit-form">
                    <h4>Produto</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Nome11</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={currentProduto.nome}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentProduto.descricao}
                                onChange={handleInputChange}
                            />
                        </div>

                    </form>

                    {currentProduto.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => updatePublished(true)}
                        >
                            Publish
                        </button>
                    )}

                    <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateTutorial}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a Produto...</p>
                </div>
            )}
        </div>
    );

};

export default Produto;