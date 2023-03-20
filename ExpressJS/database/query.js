const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addUser(user) {
    const { fullname, phonenumber, username, password } = user

    await prisma.user.create({
        data: {
            fullname: fullname,
            username: username,
            phonenumber: phonenumber,
            password: password,
        }
    })
}

async function findUser(user) {
    const { username, password } = user
    await prisma.user.findUnique({
        where: {
            username: username,
            password: password
        }
    })    
}

module.exports = { addUser, findUser }