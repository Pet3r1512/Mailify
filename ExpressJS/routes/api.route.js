const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.get('/', async (req, res, next) => {
    const userData = req.body
    console.log(userData)
    return res.send(userData)
})

router.post('/', (req, res) => {
    const userData = req.body
    return res.send(userData)
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