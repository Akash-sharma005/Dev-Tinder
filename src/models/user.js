const mongoose = require("mongoose");
const validator = require('validator')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address : " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password : " + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum:{
            values:["male", "female", "others"],
            message: `{VALUE} is not a valid gender type`
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.abasynisb.edu.pk/storage/faculty/284_1767159123.jpg",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL Address : " + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user"
    },
    skills: {
        type: [String]
    }
}, { timestamps: true })

userSchema.index({firstName:1})
userSchema.index({gender:1})


userSchema.methods.getJWT = async function () {
    const user =this //It is referring to the particular instances 

    const token = await jwt.sign({ _id: user._id }, "DEV@TINDER$970", { expiresIn: "7d" })

    return token;
}
userSchema.methods.validatePassword= async function(passwordInputByUser){
    const user= this;
    const passwordHash= user.password

    const isValidPassword= await bcrypt.compare(passwordInputByUser,passwordHash);
    return isValidPassword;
}

module.exports = mongoose.model("User", userSchema);
