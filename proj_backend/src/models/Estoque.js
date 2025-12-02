const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Estoque = db.define('estoque',{
    codEstoque: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idProduto: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, // Garante o relacionamento 1:1
        references: {
            model: 'produtos', 
            key: 'codProduto'  
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0 // Saldo atual do item no estoque
    },
    movimentacao: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 // Última quantidade movimentada
    },
    tipo: {
        type: DataTypes.ENUM('ENTRADA', 'SAIDA'),
        allowNull: false,
        defaultValue: 'ENTRADA'
    }
},{
    // ALTERADO: Manter timestamps (createdAt e updatedAt) é útil para auditoria do estoque
    timestamps: true, 
    tableName: 'estoques'
})

module.exports = Estoque