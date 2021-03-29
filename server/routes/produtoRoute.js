module.exports = app => {
    const produtos = require("../controllers/produtoController.js");
    const { authJwt } = require("../middleware");

    let router = require("express").Router();

    router.post("/", [authJwt.verifyToken], produtos.create);
    router.get("/", [authJwt.verifyToken], produtos.findAll);
    router.get("/:id", [authJwt.verifyToken], produtos.findOne);
    router.put("/:id", [authJwt.verifyToken], produtos.update);
    router.delete("/:id", [authJwt.verifyToken], produtos.delete);
    router.delete("/", [authJwt.verifyToken], produtos.deleteAll);

    app.use('/api/produtos', router);
};