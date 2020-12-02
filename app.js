const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminDATA = require('./routes/admin')
const shopRoutes = require('./routes/shop')
var exphbs  = require('express-handlebars');
const errorController = require('./controllers/errors')
const sequelize = require('./routes/util/dataBase')

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const OrderItem = require('./models/order-item');
const Order = require('./models/order');


const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err))
})

app.use('/admin', adminDATA)
app.use(shopRoutes)


app.use('/', errorController.notFoundError )

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})
Order.belongsTo(User);
User.hasMany(Order)
Order.belongsToMany(Product, {through: OrderItem})





sequelize
    .sync()
    .then(() => {
        return User.findByPk(1)
    })
    .then((user) => {
        if (!user){
            return User.create({name: 'franco', email: 'franco@gmail.com'})
        }
        return user;
    })
    .then((user) => {
        //console.log('cart creada!!')
        //return user.createCart();
    })
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err)
    })