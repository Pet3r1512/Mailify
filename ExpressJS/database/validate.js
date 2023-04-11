const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

const findUsername = async (username) => {
    const currentUsername = prisma.user.findFirst({
        where: {
            username: username
        }
    })

    if(currentUsername) return {message: true}

    return {message: false}
}

module.exports = { findUsername }