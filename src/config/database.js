const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Akash_Nodejs:IrsfNWEzyrHk8uHu@akashnodejs.cwfzpfy.mongodb.net/devTinder"
    );
}
module.exports=connectDB
