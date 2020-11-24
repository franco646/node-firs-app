const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        let hayProductos;
        if (products.length > 0){hayProductos = true}else{hayProductos = false}
        res.render('shop/products-list', {
            prductsActive: true,
            hayProductos,
            products
        })
    });
}

exports.getIndex = (req, res) => {
    Product.fetchAll((products) => {
        if (products.length > 0){
            res.render('shop/index', {
                indexActive: true,
                hayProductos: true,
                products
            })
        }else {
            res.render('shop/index', {
                indexActive: true,
                hayProductos: false
            })
        }
    })

}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        checkoutActive: true,
    })
}

exports.getCart = (req, res) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (producto of products){ 
                const cartProductData = cart.productos.find(prods => prods.id === producto.id)
                if (cartProductData){
                    cartProducts.push({productData: producto, cantidad: cartProductData.cantidad})
                }
            }
            let hayProductos = false;
            if (cart.productos.length > 0){hayProductos = true} 
            res.render('shop/cart', {
                hayProductos,
                cartActive: true,
                products: cartProducts
            })
        })
    })
}

exports.postCart = (req, res) => {
    const productId = req.body.productId;
    Product.fetchId(productId, product => {
        Cart.addProduct(product.id, product.precio)
        res.redirect('/')
    })
}

exports.deleteCartProduct = (req, res) => {
    const productId = req.body.cartProduct;
    Cart.deleteProduct(productId)
    res.redirect('/cart')
}

exports.getOrders = (req, res) => {
    res.render('shop/orders', {
        ordersActive: true
    })
}

exports.getProduct = (req, res) => {
    const id = req.params.productId
    Product.fetchId(id, product => {
        res.render('shop/product-detail', { 
            product,
            prductsActive: true
        })
    });
  
}
