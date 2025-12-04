const { DataTypes } = require('sequelize')
const db = require('../db/conn') 

const Pedido = db.define('pedido',{
    codPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    idUsuario: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', 
            key: 'codUsuario'  
        }
    },
    dataPedido: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('PENDENTE_PAGAMENTO', 'PAGO', 'ENVIADO', 'ENTREGUE', 'CANCELADO'),
        allowNull: false,
        defaultValue: 'PENDENTE_PAGAMENTO'
    },
    valorTotal: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0.00
    },
    idEndereco: {
        type: DataTypes.INTEGER,
        allowNull: true, // Pode ser null se endereço for deletado
        references: {
            model: 'enderecos',
            key: 'codEndereco'
        }
    }
},{
    timestamps: true,
    tableName: 'pedidos'
})

module.exports = Pedido