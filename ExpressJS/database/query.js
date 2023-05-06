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
        return {message: true, fullname: currentUser.fullname, username: currentUser.username}
        else return {
            message: false, error: "Incorrect password"
        }
}

async function sendMail(content, title, type, sender, receivers) {
    await prisma.mail.create({
        data: {
            title: title,
            content: content,
            sender: sender,
            type: type,
            receivers: receivers,
        }
    })
    return {message: true}
}

async function findReceives(user) {
    const inboxes = await prisma.mail.findMany({
        where: {
            receivers: {
                hasEvery: [user]
            }
        }
    })
    if(inboxes) return {success: true, inboxes: inboxes}

    return {success: false}
}

async function findSents(user) {
    const sents = await prisma.mail.findMany({
        where: {
            sender: user
        }
    })
    if(sents) return {success: true, sents: sents}

    return {success: false}
}

async function findImportants(user) {
    const importants = await prisma.mail.findMany({
        where: {
            sender: user, 
            type: "Important"
        }
    })
    if(importants) return {success: true, importants: importants}

    return {success: false}
}

async function findSpams(user) {
    const spams = await prisma.mail.findMany({
        where: {
            receivers: {
                hasEvery: [user]
            },
            type: "Spam"
        }
    })
    if(spams) return {success: true, spams: spams}

    return {success: false}
}

async function findDeletes(user) {
    const deletes = await prisma.mail.findMany({
        where: {
            receivers: {
                hasEvery: [user]
            },
            type: "Deletes"
        }
    })
    if(deletes) return {success: true, deletes: deletes}

    return {success: false}
}

async function findOneMail(id) {
    const mail = await prisma.mail.findUnique({
        where: {
            id: id
        }
    })
    if(mail) return {success: true, mail: mail}

    return {success: false}
}

async function findSocails(user) {
    const socails = await prisma.mail.findUnique({
        where: {
            receivers: {hasEvery: [user]},
            type: "Social Media"
        }
    })
    if(socails) return {success: true, socails: socails}

    return {success: false}
}

async function findAds(id) {
    const ads = await prisma.mail.findUnique({
        where: {
            receivers: {hasEvery: [user]},
            type: "Advertisment"
        }
    })
    if(ads) return {success: true, ads: ads}

    return {success: false}
}

async function findUserProfile(username) {
    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    if(user) return {success: true, user: user}

    return {success: false}
}

module.exports = { addUser, findUser, sendMail, findReceives, findSents, findImportants, findSpams, findDeletes, findOneMail, findSocails, findAds, findUserProfile }