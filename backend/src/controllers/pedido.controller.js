const { 
    criarPedido, 
    listarPedido, 
    atualizarPedido, 
    atualizarPedidoCompleto,
    apagarPedido 
} = require('../services/pedido.service')

async function criar(req, res) {

    try{

        const pedido = await criarPedido(req.body)
        console.log('Pedido criado com sucesso.')
        return res.status(201).json({message: 'Pedido criado com sucesso.', pedido})
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

async function listar(req, res) {

    try{

        const pedido = await listarPedido()
        return res.status(200).json(pedido)
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