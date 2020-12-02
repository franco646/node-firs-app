const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
    Product.findAll({raw: true})
        .then(productos => {
            if (productos.length > 0){hayProductos = true}
            res.render('shop/products-list', {
                prductsActive: true,
                hayProductos,
                products: productos,
            })
        }).catch(err => console.log(err))
}

exports.getIndex = (req, res) => {
    Product.findAll({raw: true})
        .then((productos) => {
            res.render('shop/index', {
                indexActive: true,
                hayProductos: true,
                products: productos
            })
        }).catch(err => console.log(err))
}

exports.getCheckout = (req, res) => {
    res.render('shop/checkout', {
        checkoutActive: true,
    })
}

exports.getCart = (req, res) => {
    req.user.getCart()
        .then(cart => {
            cart.getProducts({raw: true})
                .then(products => {
                    for(let i = 0; products.length > i; i++){
                        products[i].cuenta = products[i]["cartItem.cuenta"]
                    }
                    //console.log(products)
                    if (products.length > 0){ hayProductos = true}
                    res.render('shop/cart', {
                        hayProductos,
                        cartActive: true,
                        products: products
                    })
                })
        })
        .catch((err) => console.log(err))
}

exports.postCart = (req, res) => {
    const productId = req.body.productId;
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({where: {id: productId}})
        })
        .then(products => {
            let product;
            if(products.length > 0){
                product = products[0]
            }
            let nuevaCantidad = 1;
            if (product){
                const cantidadVieja = product.cartItem.cuenta
                nuevaCantidad = cantidadVieja + 1;
            }            
            return Product.findByPk(productId)
                .then(product => {
                    return fetchedCart.addProduct(product, {through: {cuenta: nuevaCantidad}})
                })
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch (( err ) => console.log(err))
}


exports.deleteCartProduct = (req, res) => {
    const productId = req.body.cartProduct;
    console.log('DELETE PRODUCT', productId)
    req.user.getCart()
        .then((cart) => {
            return cart.getProducts({where: {id: productId}})
        })
        .then(product => {
           return product[0].cartItem.destroy();
        })
        .then(() => {
            res.redirect('/cart')
        })
        .catch(err => console.log(err))
}

exports.getOrders = (req, res) => {
    req.user.getOrders({include: ['products']})
        .then((orders) => {
            console.log(orders[1].products[0].dataValues)
            res.render('shop/orders', {
                hayProductos: true,
                ordersActive: true,
                orders
            })
        })

}

exports.getProduct = (req, res) => {
    const id = req.params.productId
    Product.findByPk(id, {raw: true})
        .then((producto) => {
            res.render('shop/product-detail', { 
                product: producto,
                prductsActive: true
            })
        })
        .catch(err => console.log(err))
  
}

exports.postCreateOrder = (req, res) => {
    let fetchedCart;
    req.user.getCart()
        .then(cart => {
            fetchedCart = cart;
            cart.getProducts()
                .then(products => {
                    req.user.createOrder()
                        .then(order => {
                            order.addProducts(products.map(product => {
                                product.orderItem = {cuenta: product.cartItem.cuenta};
                                return product
                            }))
                        })
                })
        })
        .then(() => {
            return fetchedCart.setProducts(null)
        })
        .then(() => {
            res.redirect('/orders')
        })
}
