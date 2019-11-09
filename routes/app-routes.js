const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Todos list'
    })
})

router.get('/create', (req, res) => {
    res.render('pages/create', {
        title: 'Create a new todo'
    })
})

module.exports = router