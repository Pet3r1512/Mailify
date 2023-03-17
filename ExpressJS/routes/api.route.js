const router = require('express').Router()
const { addUser } = require('../database/query')

router.get('/', (req, res, next) => {
    return res.send('Get ok')
})

router.post('/', async (req, res) => {
    const userData = req.body
    addUser(userData)
    return res.send('Add database successfully')
})

router.get('/user/:id', async (req, res) => {
    return res.send('API ok')
})

router.post('/users', (req, res) => {
    return res.send('API ok')
})

router.delete('/user/:id', (req, res) => {
    return res.send('API ok')
})

router.patch('/user/:id', (req, res) => {
    return res.send('API ok')
})

module.exports = router