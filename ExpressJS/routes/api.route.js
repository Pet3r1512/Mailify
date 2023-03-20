const router = require('express').Router()
const { addUser, findUser } = require('../database/query')

router.post('/signin', async (req, res) => {
    const user = req.body
    findUser(user)
    return res.send({success: true})
})

router.post('/', async (req, res) => {
    const userData = req.body
    addUser(userData)
    return res.send({success: true})
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