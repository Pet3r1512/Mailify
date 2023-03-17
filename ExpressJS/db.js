const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            username: 'Thanh Phong',
            password: '15122002',
            email: 'phong@gmail.com'
        }
    })
    console.log(user)
}

module.exports = main