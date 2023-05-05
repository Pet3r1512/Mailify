const router = require('express').Router()
const { addUser, findUser, sendMail } = require('../database/query')
const { findUsername } = require('../database/validate')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/signin', async (req, res) => {
    const user = req.body
    const result = await findUser(user)
    if(result.message === true) {
        const accessToken = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET);
        return res.cookie("token", accessToken, { secure: true, maxAge: 18000 }).send({success: true, accessToken, fullname: result.fullname, username: result.username})
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
    const username = req.body.receiver
    const result = await findUsername(username)
    console.log(username)
    if (result.message === true) {
        return res.status(200).send({success: true})
    }
    return res.send({success: false, message: "Username is not existed"})
})

router.post('/send', async (req, res) => {
    const content = JSON.stringify(req.body.inbox)
    const sender= JSON.stringify(req.body.sender)
    const receivers = JSON.stringify(req.body.receivers)
    const result = await sendMail(content, sender, receivers)
    if(result.message === true) {
        return res.status(200).send({success: true})
    }
    return res.send({success: false, message: "Send failed"})
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