const db = require("../models");
const Produto = db.produtos;

exports.create = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({message: "Erro na requisição para criar o produto!"});
    }

    const produto = new Produto({
        nome: req.body.nome,
        descricao: req.body.descricao
    });

     await produto
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            return res.status(500).send({
                message:
                    err.message || "Ocorreu um enquanto na criação do Produto."
            });
        });
};

exports.findAll = (req, res) => {
    const nome = req.query.nome;
    let condition = nome ? {nome: {$regex: new RegExp(nome), $options: "i"}} : {};

    Produto.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro na listagem de produtos."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Produto.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Produto não econtrado com este ID " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error ao pesquisar o produto" });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Erro na atualização de dados!"
        });
    }

    const id = req.params.id;

    Produto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não pode atualizar o produto com o id=${id}. Produto não encontrado!`
                });
            } else res.send({ message: "Produto atualizado com sucesso." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Erro na atualização do produto"
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Produto.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não pode deletar o Produto com o id=${id}. Produto não foi encontrado!`
                });
            } else {
                res.send({
                    message: "Produto deletado com sucesso!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error ao delatar o Produto"
            });
        });
};

exports.deleteAll = (req, res) => {
    Produto.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Produtos foram deletados!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocurrido durente a deletação."
            });
        });
};