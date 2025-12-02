const {
    criarPedido,
    listarPedido,
    atualizarPedido
} = require('../services/pedido.service')

async function criar(req, res) {

    try{

        const { itens } = req.body
        const idUsuario = req.user.id

        const dados = { idUsuario, itens }
        const pedido = await criarPedido(dados)
        console.log('Pedido criado com sucesso.')
        return res.status(201).json({message: 'Pedido criado com sucesso.', pedido})
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

async function listar(req, res) {

    try{

        const idUsuario = req.user.id
        const tipo = req.user.tipo

        const pedidos = await listarPedido(idUsuario, tipo)
        return res.status(200).json(pedidos)
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

async function atualizar(req, res) {

    try{

        const { id } = req.params
        const { status } = req.body
        const tipo = req.user.tipo

        if (tipo !== 'ADMIN') {
            return res.status(403).json({error: 'Apenas admins podem atualizar status de pedidos'})
        }

        const pedidoAtualizado = await atualizarPedido(id, { status })

        return res.status(200).json({
            message: 'Status do pedido atualizado com sucesso',
            pedido: pedidoAtualizado
        })
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

module.exports = {
    criar,
    listar,
    atualizar
}