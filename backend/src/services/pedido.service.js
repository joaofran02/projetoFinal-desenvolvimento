const Pedido = require('../models/Pedido')
const ItemPedido = require('../models/ItemPedido')
const Produto = require('../models/Produto')
const Estoque = require('../models/Estoque')
const db = require('../db/conn')

async function criarPedido(dados){

    const { idUsuario, itens } = dados

    if (!idUsuario || !itens || itens.length === 0) {
        throw new Error('Usuário e itens são obrigatórios')
    }

    const transaction = await db.transaction()

    try {
        // Criar pedido inicialmente com valorTotal 0
        const novoPedido = await Pedido.create({
            idUsuario,
            valorTotal: 0
        }, { transaction })

        let total = 0

        for (const item of itens) {
            const { idProduto, quantidade } = item

            if (!idProduto || !quantidade || quantidade <= 0) {
                throw new Error('Produto e quantidade válida são obrigatórios para cada item')
            }

            // Verificar se produto existe e está ativo
            const produto = await Produto.findByPk(idProduto, { transaction })
            if (!produto || !produto.ativo) {
                throw new Error(`Produto ${idProduto} não encontrado ou inativo`)
            }

            // Verificar estoque
            const estoque = await Estoque.findOne({ where: { idProduto }, transaction })
            if (!estoque || estoque.quantidade < quantidade) {
                throw new Error(`Estoque insuficiente para produto ${idProduto}`)
            }

            // Calcular valores
            const precoUnitario = produto.preco
            const valorTotalItem = quantidade * precoUnitario

            // Criar item do pedido
            await ItemPedido.create({
                idPedido: novoPedido.codPedido,
                idProduto,
                quantidade,
                precoUnitario,
                valorTotalItem
            }, { transaction })

            // Atualizar estoque
            await estoque.update({
                quantidade: estoque.quantidade - quantidade,
                movimentacao: quantidade,
                tipo: 'SAIDA'
            }, { transaction })

            total += valorTotalItem
        }

        // Atualizar valor total do pedido
        await novoPedido.update({ valorTotal: total }, { transaction })

        await transaction.commit()

        // Retornar pedido com itens
        const pedidoCompleto = await Pedido.findByPk(novoPedido.codPedido, {
            include: [{
                model: ItemPedido,
                as: 'itensPedido',
                include: [{
                    model: Produto,
                    as: 'produtoItem',
                    attributes: ['nome', 'preco']
                }]
            }]
        })

        return pedidoCompleto

    } catch (error) {
        await transaction.rollback()
        throw error
    }
}



module.exports = {
    criarPedido
}
