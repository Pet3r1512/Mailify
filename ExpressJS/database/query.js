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

    await prisma.user.create({
        data: {
            fullname: fullname,
            username: username,
            phonenumber: phonenumber,
            password: encryptingPassword(password)
        }
    })

}

async function findUser(user) {
    const { username, password } = user
    await prisma.user.findFirst({
        where: {
            username: username,
            password: decryptingPassword(encryptingPassword(password))
        }
    })    
}

module.exports = { addUser, findUser }