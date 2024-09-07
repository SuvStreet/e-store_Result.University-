const express = require('express')

const router = express.Router({ mergeParams: true })

router.use('/', require('./auth.routes'))
router.use('/order', require('./order.routes'))
router.use('/products', require('./product.routes'))
router.use('/user', require('./user.routes'))
router.use('/categories', require('./category.routes'))
router.use('/sub-category', require('./sub-category.routes'))
router.use('/cart', require('./cart.routes'))
router.use('/main', require('./main.routes'))

module.exports = router
