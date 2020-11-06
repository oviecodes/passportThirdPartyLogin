

const generator = require('generate-password');

const findOrCreateUser = async(User, email, username, done) => {
    const user = await User.findOne({ email })
    if(user) {
        return done(null, user)
    }
    
    const newUser = await User.create({
        username,
        email,
        password: generator.generate({
            length: 10,
            numbers: true
        }), 
    })
    return done(null, newUser)
}

module.exports = {
    findOrCreateUser
}