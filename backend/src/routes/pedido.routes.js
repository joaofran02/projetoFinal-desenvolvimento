const express = require('express')
const router = express.Router()

const { 
    criar, 
    listar, 
    atualizar, 
    atualizarCompleto, 
    apagar 
} = require('../controllers/pedido.controller')

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware')

// POST /produto
router.post(
    '/',
    authMiddleware,      
    criar
)

// GET – Listar pedidos (qualquer usuário logado)
router.get(
    '/',
    authMiddleware,
    listar
)

// Atualizar parcialmente
router.patch(
    '/:id',
    authMiddleware,
    atualizar
)

// PUT - completo
router.put(
    '/:id', 
    authMiddleware, 
    atualizarCompleto
)

// DELETE
router.delete(
    '/:id',
    authMiddleware,
    apagar
)

module.exports = router
