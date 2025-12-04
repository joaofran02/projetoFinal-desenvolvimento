const {
    cadastrarUsuario
} = require('../services/usuario.service')

async function cadastrar(req, res) {

    try {

        const valores = req.body
        const resultado = await cadastrarUsuario(valores)

        return res.status(201).json({message: 'Usuário cadastrado com sucesso', resultado})
    } catch (err) {

        console.error('Erro no controller de cadastro:', err)
        return res.status(500).json({mensage: 'Erro ao cadastrar usuário', err})
    }
}

module.exports = { 
    cadastrar  
}
