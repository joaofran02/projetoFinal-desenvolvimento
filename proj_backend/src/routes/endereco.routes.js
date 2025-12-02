const express = require('express')
const router = express.Router()

const {
    criar,
    listar,
    atualizar,
    apagar,
    consultar
} = require('../controllers/endereco.controller')

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware')

// POST /endereco
router.post(
    '/',
    authMiddleware,
    criar
)

// DELETE /endereco/:id
router.delete(
    '/:id',
    authMiddleware,
    apagar
)

// GET /endereco/:codigo
router.get(
    '/:codigo',
    authMiddleware,
    consultar
)

module.exports = router