require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const appRoutes = require('./routes/app-routes')

const PORT = process.env.PORT || 3000

const app = express()
const hbs = exphbs.create({
    defaultLayout: 'index',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(appRoutes)

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@${MONGO_DB_CLUSTER}.mongodb.net/${MONGO_DB_DATABASE_NAME}`, {
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