const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addUser(user) {
    const { username, password, email } = user

    await prisma.user.create({
        data: {
            username: username,
            password: password,
            email: email,
        }
    })
}

module.exports = { addUser }