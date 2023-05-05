const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const findUsername = async (username) => {
    const currentUsername = prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if(currentUsername) return {message: true}

    return {message: false}
}

module.exports = { findUsername }