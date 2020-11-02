

const User = require('../user')
const mongoose = require('mongoose')


const testUser = async() => {

    const user = await User.create({
        name: 'Godwin Alexander',
        email: 'alecgee73@gmail.com',
        password: 'hybridtechnol123'
    })

    console.log(user)
    console.log(await user.validPassword('hybridtechnol123'))

}

testUser()