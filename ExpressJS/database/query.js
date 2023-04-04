const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

const saltRounds = 10

function encryptingPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds))
}

function decryptingPassword(hash) {
    return bcrypt.compareSync(password, hash)
}

async function addUser(user) {
    const { fullname, phonenumber, username, password } = user

    const userExists = prisma.user.count({
        where: {
            username: username,
            phonenumber: phonenumber
        }
    })

    if(userExists) return {message: false}

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
    if(encryptingPassword(password) === currentUser.password) return {message: true}
}

module.exports = { addUser, findUser }