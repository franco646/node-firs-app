const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin')


router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts)

router.get('/edit-product/:productId', adminController.getEditProducts)

router.post('/edit-product', adminController.postEditProducts)

router.post('/delete-product/:productId', adminController.postDeleteProduct);

router.post('/add-product', adminController.postAddProducts);

module.exports = router;