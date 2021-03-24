import React, { useState, useEffect } from "react";
import ProdutoDataService from "../services/produto";
import { Link } from "react-router-dom";

const ListProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [currentProduto, setcurrentProduto] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        retrieveProdutos();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveProdutos = () => {
        ProdutoDataService.getAll()
            .then(response => {
                setProdutos(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveProdutos();
        setcurrentProduto(null);
        setCurrentIndex(-1);
    };

    const setActiveTutorial = (produto, index) => {
        setcurrentProduto(produto);
        setCurrentIndex(index);
    };

    const removeAllProdutos = () => {
        ProdutoDataService.removeAll()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        ProdutoDataService.findByTitle(searchTitle)
            .then(response => {
                setProdutos(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
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
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveTutorial(produto, index)}
                            key={index}
                        >
                            {produto.nome}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllProdutos}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentProduto ? (
                    <div>
                        <h4>Tutorial</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentProduto.nome}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentProduto.descricao}
                        </div>

                        <Link
                            to={"/produtos/" + currentProduto.id}
                            className="badge badge-warning"
                        >
                            Editar
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListProdutos;