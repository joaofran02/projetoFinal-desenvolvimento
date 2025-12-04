const {
    criarEndereco,
    apagarEndereco,
    consultarEndereco
} = require('../services/endereco.service')

async function criar(req, res) {

    try{

        const endereco = await criarEndereco(req.body, req.user.id)
        return res.status(201).json({message: 'Endereço criado com sucesso.', endereco})
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

async function apagar(req, res){

    try{

        const { id } = req.params
        await apagarEndereco(id, req.user.id)

        return res.status(204).json({message: 'Endereço apagado com sucesso'})
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

async function consultar(req, res) {

    try{

        const { codigo } = req.params
        const cod = parseInt(codigo)
        if (isNaN(cod)) {
            return res.status(400).json({error: 'Código inválido'})
        }
        const endereco = await consultarEndereco(cod, req.user.id)
        if (!endereco) {
            return res.status(404).json({error: 'Endereço não encontrado'})
        }
        return res.status(200).json(endereco)
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

module.exports = {
    criar,
    apagar,
    consultar
}