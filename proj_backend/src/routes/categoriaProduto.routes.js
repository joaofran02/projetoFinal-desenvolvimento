const express = require('express')
const router = express.Router()

const {  
    cadastrar,
    atualizar
} = require('../controllers/categoriaProduto.controller')

// Middlewares
const authMiddleware = require('../middlewares/auth.middleware')
const isAdminMiddleware = require('../middlewares/isAdmin.middleware')

router.post(
    '/',
    authMiddleware,
    isAdminMiddleware,
    cadastrar
)

router.patch(
    '/:idProduto',
    authMiddleware,
    isAdminMiddleware,
    atualizar
)

module.exports = router
