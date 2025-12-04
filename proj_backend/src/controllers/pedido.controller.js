const {
    criarPedido
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



module.exports = {
    criar
}