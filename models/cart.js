const path = require("path");
const fs = require('fs');

const p = path.join(__dirname, '..', 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, precioProducto){
        fs.readFile(p, (err, fileContent) => {
            let cart = {productos: [], totalPrecio: 0}
            if (!err){
                cart = JSON.parse(fileContent)
            }
            const productoExistenteIndex = cart.productos.findIndex(prods => prods.id === id);
            const productoExistente = cart.productos[productoExistenteIndex];
            let productoActualizado;
            if (productoExistente){
                productoActualizado = {...productoExistente};
                productoActualizado.cantidad = productoActualizado.cantidad + 1;
                cart.productos = [...cart.productos];
                cart.productos[productoExistenteIndex] = productoActualizado
            }else {
                productoActualizado = {id: id, cantidad: 1};
                cart.productos = [...cart.productos, productoActualizado]
            }
            
            cart.totalPrecio = Number(cart.totalPrecio) + Number(precioProducto);
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id, precio) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const cartActualizada = {...JSON.parse(fileContent)}
            const producto = cartActualizada.productos.find(p => p.id === id)
            if (!producto){
                return;
            }
            const productoCantidad = producto.cantidad;
            cartActualizada.productos = cartActualizada.productos.filter(p => p.id !== id)
            cartActualizada.totalPrecio = cartActualizada.totalPrecio - precio * productoCantidad;
            fs.writeFile(p, JSON.stringify(cartActualizada), (err) => {
                console.log(err)
            })
        })
    }

    static getProducts(cb){
        fs.readFile(p, (err, fileContent) => { 
            if (err) {
                cb(null)
            }
            const cart = JSON.parse(fileContent);
            cb(cart);
        }) 
    }
}