const fs = require('fs');
const path = require('path');

const Cart = require('./cart')

const p = path.join(__dirname, '..', 'data', 'producs.json');


const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
};

module.exports = class Product {
    constructor(id, nombre, imagenURL, descripcion, precio) {
        this.id = id;
        this.nombre = nombre;
        this.imagenURL = imagenURL;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    save() {
      getProductsFromFile(products => {
        if  (this.id) {
          const productoExistenteIndex = products.findIndex(prods => prods.id === this.id)
          const productosActualizado = [...products]
          productosActualizado[productoExistenteIndex] = this;
          fs.writeFile(p, JSON.stringify(productosActualizado), err => {
            console.log(err);
          });
        }
        else {
          this.id = Math.random().toString();
          products.push(this);
          fs.writeFile(p, JSON.stringify(products), err => {
            console.log(err);
          });
        }
      });
    }

    static delete(id){
      getProductsFromFile(products => {
        const product = products.find(prods => prods.id === id);
        const productosActualizados = products.filter(producto => producto.id != id)
        fs.writeFile(p, JSON.stringify(productosActualizados), err => {
          if (!err){
            Cart.deleteProduct(id, product.precio)
          }
        });
      })
    }
    
    static fetchAll(cb) {
      getProductsFromFile(cb);
    }

    static fetchId(id, cb){
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id)
            cb(product)
        })
    }
}