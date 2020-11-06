

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

userSchema.pre('save', async function() {
    return new Promise(async (resolve, reject) => {
       try {
            const salt = await bcrypt.genSalt(10)
            resolve(this.password = await bcrypt.hash(this.password, salt))
       } catch (error) {
           reject(new Error(error))
       }
        
    })
})

userSchema.methods.validPassword = async function(password){
    return new Promise(async (resolve, reject) => { 
        try {
            resolve(await bcrypt.compare(password, this.password))
        } catch (error) {
           reject(new Error(error)) 
        }
        
    })
}

module.exports = mongoose.model('user', userSchema)