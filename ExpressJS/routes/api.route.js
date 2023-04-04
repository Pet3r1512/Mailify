const router = require('express').Router()
const { addUser, findUser } = require('../database/query')

router.post('/signin', async (req, res) => {
    const user = req.body
    findUser(user)
    return res.send({success: true})
})

router.post('/', async (req, res) => {
    const userData = req.body
    return res.send(addUser(userData))
})

router.delete('/user/:id', (req, res) => {
    return res.send('API ok')
})

router.put('/:id', async (req, res) => {
    return res.send("API PUT ok")
})

router.patch('/user/:id', (req, res) => {
    return res.send('API ok')
})

module.exports = router