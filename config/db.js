const { MongoClient } = require("mongodb");
const { default: mongoose } = require("mongoose");
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://<username>:<password>@cluster0.iyd2ufh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = {connectDB};