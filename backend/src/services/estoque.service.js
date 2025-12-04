const Estoque = require('../models/Estoque')

async function atualizarEstoque(idProduto, movimentacao, tipo){

    // Buscar o estoque do produto
    const estoque = await Estoque.findOne({where:{idProduto}})
    if(!estoque){

        throw new Error('Estoque não encontrado para este produto')
    }

    let novaQuantidade = estoque.quantidade

    if(tipo === 'ENTRADA'){

        novaQuantidade += movimentacao
    }else if(tipo === 'SAIDA'){

        if(movimentacao > novaQuantidade){
            
            throw new Error('Quantidade insuficiente em estoque')
        }
        novaQuantidade -= movimentacao
    }

    // Atualizar quantidade e movimentacao
    await estoque.update({
        quantidade: novaQuantidade,
        movimentacao: movimentacao
    })

    return estoque
}

module.exports = {
    atualizarEstoque
}