module.exports = mongoose => {
    const Produto = mongoose.model(
        "produto",
        mongoose.Schema(
            {
                nome: String,
                descricao: String,
                status: Boolean,
                preco: Number
            },
            { timestamps: true }
        )
    );

    return Produto;
};