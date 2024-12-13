const express = require('express')
const userController = require('../Controller/userController')
const productController = require('../Controller/productController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const adminMiddleware = require('../Middleware/adminMiddleware')
const multerConfig = require('../Middleware/multerMiddleware')
const router = new express.Router()

//register new user
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//add neew game
router.post('/addgame',jwtMiddleware,adminMiddleware,multerConfig.single('gameImage'),productController.addProduct)

//get all games (admin)
router.get('/games',jwtMiddleware,adminMiddleware,productController.getProducts)

//delete game
router.delete('/delete-game/:id',jwtMiddleware,adminMiddleware,productController.deleteGame)

//edit game
router.put('/edit-game/:id',jwtMiddleware,adminMiddleware,multerConfig.single('gameImage'),productController.editGame)

//get game based on genre
router.get('/get-genre/:gameGenre',productController.getcategory)

module.exports = router    