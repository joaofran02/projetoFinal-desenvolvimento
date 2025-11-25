const Pedido = require('../models/Pedido')

async function criarPedido(dados){

    const { 
        idUsuario, 
        dataPedido, 
        status, 
        valorSubtotal, 
        valorFrete, 
        valorTotal 
    } = dados

    // Validações simples antes de salvar
    if(!idUsuario || !dataPedido || !status || !valorSubtotal || !valorFrete){

        throw new Error('Todos os campos são obrigatórios.')
    }

    const novoPedido = await Pedido.create({
        idUsuario,
        dataPedido,
        status,
        valorSubtotal,
        valorFrete,
        valorTotal
    })

    return novoPedido
}

async function listarPedido(){

    const pedido = await Pedido.findAll()
    return pedido
}

async function atualizarPedido(id, dados){

    // Buscar o Pedido no banco
    const pedido = await Pedido.findByPk(id)
    if(!pedido){

        throw new Error('Pedido não encontrado.')
    }

    // Atualizar apenas os campos enviados
    await Pedido.update(dados)
    return pedido
}

async function atualizarPedidoCompleto(id, dados) {

    const pedido = await Pedido.findByPk(id)
    if(!pedido){
        throw new Error('Pedido não encontrado')
    }

    const { 
        idUsuario, 
        dataPedido, 
        status, 
        valorSubtotal, 
        valorFrete,
        valorTotal 
    } = dados

    // Validações básicas
    if(!idUsuario || !dataPedido || !status || !valorSubtotal || !valorFrete){

        throw new Error('Todos os campos são obrigatórios.')
    }

    await pedido.update({
        idUsuario,
        dataPedido,
        status,
        valorSubtotal,
        valorFrete,
        valorTotal
    })
    return pedido
}

async function apagarPedido(id){

    const pedido = await Pedido.findByPk(id)
    if(!pedido){

        throw new Error('Pedido não encontrado')
    }

    await pedido.destroy()
    return true
}

module.exports = { 
    criarPedido, 
    listarPedido, 
    atualizarPedido, 
    atualizarPedidoCompleto, 
    apagarPedido 
}
