const mongoose = require('mongoose')
const emailValidator = require('email-validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!emailValidator.validate(value)){
                throw new Error('emailid is in wrong format')
            }
        },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        },
    
    tokens: [{
        type: String,
        required: false
    }]
    }
})



userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
const User = mongoose.model('User', userSchema)

module.exports = User
