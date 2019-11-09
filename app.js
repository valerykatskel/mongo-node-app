require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const appRoutes = require('./routes/app-routes')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'index',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) // specify the view engine you will use
app.set('view engine', 'hbs') // specify the view engine you will use
app.set('views', path.join(__dirname, 'src/views')) // specify the folder where all views will be placed                    

app.use(express.urlencoded({ extended: true })) // to allow Express.js understand req.body
app.use(appRoutes) // where are app routes
app.use(express.static(path.join(__dirname, 'public'))) // to allow Express.js understand where there are static files such as css, images

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.mongodb.net/${process.env.MONGO_DB_DATABASE_NAME}`, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
    } catch (e) {
        console.log(e)
    }
}

app.listen(PORT, () => {
    console.log('Server has been started...')
})

start()