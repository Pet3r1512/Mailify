const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addUser(user) {
    const { phonenumber, username } = user

    await prisma.user.create({
        data: {
            username: username,
            phonenumber: phonenumber,
        }
    })
}

module.exports = { addUser }