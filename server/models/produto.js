module.exports = mongoose => {
    const Produto = mongoose.model(
        "produto",
        mongoose.Schema(
            {
                nome: String,
                descricao: String,
                ativo: Boolean,
                preco: Number
            },
            { timestamps: true }
        )
    );

    return Produto;
};