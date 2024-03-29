const router = require('express').Router()
const { addUser, findUser, sendMail, findReceives, findSents, findImportants, findSpams, findStars, findDeletes, findOneMail, findSocails, findAds, findUserProfile, updateDelete, updateSpam, updateStar } = require('../database/query')
const { findUsername } = require('../database/validate')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

router.post('/signin', async (req, res) => {
    const user = req.body
    const result = await findUser(user)
    if(result.message === true) {
        const accessToken = jwt.sign({ username: user.username }, process.env.TOKEN_SECRET);
        return res.cookie("token", accessToken, { secure: true, maxAge: 1800 }).send({success: true, accessToken, fullname: result.fullname, username: result.username})
    }
    else return res.send({success: false, message: result.error})
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
    const title = req.body.title
    const content = req.body.inbox
    const sender = req.body.sender
    const receivers = req.body.receivers
    const type = req.body.type
    const result = await sendMail(content, title, type, sender, receivers)
    if(result.message === true) {
        return res.status(200).send({success: true})
    }
    return res.send({success: false, message: "Send failed"})
})

router.post('/inbox', async(req, res) => {
    const user = req.body.user
    const type = req.body.type
    const result = await findReceives(user, type)
    if(result.success === true) {
        return res.status(200).send({mails: result.inboxes})
    }
    return res.send({success: false, message: result.message})
})

router.post('/sent', async(req, res) => {
    const user = req.body.user
    const result = await findSents(user)
    if(result.success === true) {
        return res.status(200).send({mails: result.sents})
    }
    return res.send({success: false, message: result.message})
})

router.post('/important', async(req, res) => {
    const user = req.body.user
    const result = await findImportants(user)
    if(result.success === true) {
        return res.status(200).send({mails: result.importants})
    }
    return res.send({success: false, message: result.message})
})

router.get('/mail/:id', async(req, res) => {
    const id = req.params.id
    const result = await findOneMail(id)
    if(result.success === true) {
        return res.status(200).send({mail: result.mail})
    }
    return res.send({success: false, message: "Mail does not existed"})
})

router.get('/user/:username', async(req, res) => {
    const username = req.params.username
    const result = await findUserProfile(username)
    if(result.success === true) {
        return res.status(200).send({user: result.user})
    }
    return res.send({success: false})
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