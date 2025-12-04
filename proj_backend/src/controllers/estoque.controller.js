const {
    atualizarEstoque
} = require('../services/estoque.service')

async function atualizar(req, res) {

    try{

        const { idProduto } = req.params
        const { movimentacao, tipo } = req.body

        if(!movimentacao || !tipo){
            return res.status(400).json({error: 'Movimentação e tipo são obrigatórios'})
        }

        const estoqueAtualizado = await atualizarEstoque(idProduto, parseInt(movimentacao), tipo)

        return res.status(200).json({
            message: 'Estoque atualizado com sucesso',
            estoque: estoqueAtualizado
        })
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

module.exports = {
    atualizar
}
