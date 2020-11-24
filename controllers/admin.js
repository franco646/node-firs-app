const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        addProductActive: true,
    })
}

exports.postAddProducts = (req, res) => {
    const nombre = req.body.nombre;
    const imagenUrl = req.body.imagenUrl;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion ;
    const product = new Product(null, nombre, imagenUrl,descripcion, precio);
    product.save();
    res.redirect('/')
}

exports.getEditProducts = (req, res) => {
    const editionMode = req.query.edit;
    if (!editionMode) {
        res.redirect('/')
    }else {
        const id = req.params.productId;
        Product.fetchId(id, product => {
            res.render('admin/add-product', {
                editionMode: true,
                product
            })
        })
    }
}

exports.postEditProducts = (req, res) => {
    const productId = req.body.productId;
    const nombre = req.body.nombre;
    const imagenUrl = req.body.imagenUrl;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion ;
    const productoActualizado = new Product(
        productId,
        nombre,
        imagenUrl,
        descripcion,
        precio
    )
    productoActualizado.save();
    res.redirect('/')
}

exports.postDeleteProduct = (req, res) => {
    const productId = req.params.productId;
    Product.delete(productId);
    res.redirect('/admin/products')
}

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        let hayProductos;
        if (products.length > 0){
            hayProductos = true
        }else{hayProductos = false}

        res.render('admin/products', {
            adminProductsActive: true,
            hayProductos,
            products
        })

    })
}