const { 
    criarProduto, 
    listarProdutos, 
    atualizarProduto,
    atualizarProdutoCompleto, 
    apagarProduto 
} = require('../services/produto.service')

async function criar(req, res){

    try{

        const produto = await criarProduto(req.body)

        return res.status(201).json({
            message: 'Produto criado com sucesso',
            produto
        })
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

async function listar(req, res){

    try{

        const produto = await listarProdutos()
        return res.status(200).json(produto)
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

// Atualizar parcialmente produto (PATCH /produto/)
async function atualizar(req, res){

    try{

        const { id } = req.params
        const dados = req.body

        const produtoAtualizado = await atualizarProduto(id, dados)

        return res.status(200).json({
            message: 'Produto atualizado com sucesso',
            produto: produtoAtualizado
        })
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

async function atualizarCompleto(req, res) {
    
    try{

        const { id } = req.params
        const dados = req.body

        const produtoAtualizado = await atualizarProdutoCompleto(id, dados)

        return res.status(200).json({
            message: 'Produto atualizado completamente com sucesso',
            produto: produtoAtualizado
        })
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

// DELETE - apagar
async function apagar(req, res){

    try{

        const { id } = req.params
        await apagarProduto(id)

        return res.status(204).json({message: 'Produto apagado com sucesso'})
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

module.exports = { 
    criar, 
    listar, 
    atualizar,
    atualizarCompleto, 
    apagar 
}
