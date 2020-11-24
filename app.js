const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminDATA = require('./routes/admin')
const shopRoutes = require('./routes/shop')
var exphbs  = require('express-handlebars');
const errorController = require('./controllers/errors')
const db = require('./routes/util/dataBase')

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminDATA)
app.use(shopRoutes)

db.execute('SELECT * FROM products').then(
    (resultado) => {
        console.log(resultado[0]);
    }
).catch(
    (err) => {  
        console.log(err);
    }
)

app.use('/', errorController.notFoundError )


app.listen(3000)