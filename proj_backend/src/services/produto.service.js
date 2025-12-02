const Produto = require('../models/Produto')
const Estoque = require('../models/Estoque')

async function criarProduto(dados){

    const {
        nome,
        descricao,
        modelo,
        preco,
        imagem_url,
        ativo
    } = dados

    // Validações simples antes de salvar
    if(!nome || !modelo || !preco){

        throw new Error('Nome, modelo e preço são obrigatórios')
    }

    const novoProduto = await Produto.create({
        nome,
        descricao,
        modelo,
        preco,
        imagem_url,
        ativo
    })

    // Criar entrada no estoque automaticamente
    await Estoque.create({
        idProduto: novoProduto.codProduto,
        quantidade: 0, // Inicia com quantidade 0
        movimentacao: 0
    })

    return novoProduto
}

async function listarProdutos(){

    const produtos = await Produto.findAll({
        include: [{
            model: Estoque,
            as: 'estoqueProduto',
            attributes: ['quantidade', 'movimentacao']
        }]
    })
    return produtos
}

async function atualizarProduto(id, dados){

    // Buscar o produto no banco
    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado')
    }

    // Atualizar apenas os campos enviados
    await produto.update(dados)
    return produto
}

async function atualizarProdutoCompleto(id, dados) {

    const produto = await Produto.findByPk(id)
    if(!produto){

        throw new Error('Produto não encontrado')
    }

    const {
        nome,
        descricao,
        modelo,
        preco,
        imagem_url, 
        ativo 
    } = dados

    // Validações básicas
    if(!nome || !modelo || !preco){

        throw new Error('Nome, modelo e preço são obrigatórios')
    }

    await produto.update({
        nome,
        descricao,
        modelo,
        preco,
        imagem_url,
        ativo
    })
    return produto
}

async function apagarProduto(id){

    const produto = await Produto.findByPk(id)

    if (!produto) {
        throw new Error('Produto não encontrado')
    }

    await produto.destroy()
    return true
}


module.exports = { 
    criarProduto, 
    listarProdutos, 
    atualizarProduto,
    atualizarProdutoCompleto,
    apagarProduto 
}
