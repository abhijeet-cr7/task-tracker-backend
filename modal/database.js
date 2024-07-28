const mongoose = require("mongoose");
const connectDB = async () => {
    try{
        const conn = await mongoose.connect(`mongodb+srv://abhijeet:mukherjee@cluster0.lwi4805.mongodb.net/`, {useNewUrlParser : true});
        console.log(`MongoDB Connected : {conn.connection.host}`);
    }
    catch(error){
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;