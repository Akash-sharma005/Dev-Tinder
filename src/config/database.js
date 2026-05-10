const mongoose = require('mongoose')

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://akash_node:LUgJBe3yAu3gJP5k@akashnode.7rnezaw.mongodb.net/devTinder"
    );
}
module.exports=connectDB

// LUgJBe3yAu3gJP5k
// mongodb+srv://akash_node:LUgJBe3yAu3gJP5k@akashnode.7rnezaw.mongodb.net/