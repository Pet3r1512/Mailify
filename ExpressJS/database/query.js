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

module.exports = { addUser }