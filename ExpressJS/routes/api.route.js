const router = require('express').Router()
const { addUser, findUser } = require('../database/query')
const { findUsername } = require('../database/validate')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/signin', async (req, res) => {
    const user = req.body
    const result = await findUser(user)
    if(result.message === true) {
        const accessToken = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET);
        return res.cookie("token", accessToken, { secure: true, maxAge: 1800000 }).send({success: true, accessToken, fullname: result.fullname})
    }
    return res.send({success: false, message: result.error})
})

router.post('/', async (req, res) => {
    const userData = req.body
    const result = await addUser(userData)
    if(result.message === true) {
        return res.status(200).send({success: true})
    }
    return res.send({success: false, message: result.message})
})

router.post('/checkUsername', async(req, res) => {
    const username = req.body
    return res.send(findUsername(username))
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