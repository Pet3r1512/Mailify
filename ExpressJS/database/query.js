const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

const saltRounds = 10

function encryptingPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds))
}

function decryptingPassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

async function addUser(user) {
    const { fullname, phonenumber, username, password, confirm_password } = user

    const phonenumberExists = await prisma.user.count({
        where: {
            phonenumber: phonenumber,
        }
    })

    const usernameExists = await prisma.user.count({
        where: {
            username: username,
        }
    })

    if(password !== confirm_password) {
        return {message: "Confirm password does not match!"}
    }

    if(usernameExists > 0) return {message: "Username is existed!"}

    if(phonenumberExists > 0) return {message: "Phone number is existed!"}

    else {
        await prisma.user.create({
            data: {
                fullname: fullname,
                username: username,
                phonenumber: phonenumber,
                password: encryptingPassword(password)
            }
        })
        return {message: true}
    }
}

async function findUser(user) {
    const { username, password } = user
    const currentUser = await prisma.user.findFirst({
        where: {
            username: username,
        }
    })    

    if(currentUser === null)  return {message: false, error: "Invalid username or password"}
    
    else if(decryptingPassword(password, currentUser.password) && currentUser.username === username) 
        return {message: true, fullname: currentUser.fullname}
}

async function sendMail(content) {
    await prisma.mail.create({
        data: {
            title: "content",
            content: content,
            sender: "Thanh Phong",
            receivers: {"name": "Thuy Vi"},
        }
    })
    return {message: true}
}

module.exports = { addUser, findUser, sendMail }