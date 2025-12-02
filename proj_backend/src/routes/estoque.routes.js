const express = require('express')
const router = express.Router()

const {  
    atualizar
} = require('../controllers/estoque.controller')

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware')
const isAdminMiddleware = require('../middlewares/isAdmin.middleware')

router.patch('/:idProduto',
    authMiddleware,
    isAdminMiddleware,
    atualizar
)

module.exports = router
