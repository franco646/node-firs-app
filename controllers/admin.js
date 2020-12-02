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
    req.user.createProduct({
        nombre: nombre,
        imagenUrl: imagenUrl,
        descripcion: descripcion,
        precio: precio,
    })
    .then(() => { 
        res.redirect('/admin/products')
    }).catch(err => console.log(err))
}

exports.getEditProducts = (req, res) => {
    const editionMode = req.query.edit;
    if (!editionMode) {
        res.redirect('/')
    }else {
        const id = req.params.productId;
        Product.findByPk(id, {raw: true})
            .then(productos => {
                res.render('admin/add-product', {
                    editionMode: true,
                    product: productos
                })
            })
            .catch(err => console.log(err))
    }
}

exports.postEditProducts = (req, res) => {
    const productId = req.body.productId;
    const nuevoNombre = req.body.nombre;
    const nuevoImagenUrl = req.body.imagenUrl;
    const nuevoPrecio = req.body.precio;
    const nuevoPescripcion = req.body.descripcion ;
    Product.findByPk(productId)
        .then(producto => {
            producto.nombre = nuevoNombre;
            producto.imagenUrl = nuevoImagenUrl;
            producto.descripcion = nuevoPescripcion;
            producto.precio = nuevoPrecio;
            return producto.save();
        })
        .then(() => res.redirect('/admin/products'))
        .catch((err) => console.log(err))
}

exports.postDeleteProduct = (req, res) => {
    const productId = req.params.productId;
    Product.findByPk(productId)
        .then(producto => {
            return producto.destroy()
        })
        .then(() => {
            res.redirect('/admin/products')
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.getProducts = (req, res) => {
    Product.findAll({raw: true})
        .then(productos => {
            if (productos.length > 0){hayProductos = true}
            res.render('admin/products', {
                adminProductsActive: true,
                hayProductos,
                products: productos
            })
        })
        .catch(err => console.log(err))
}