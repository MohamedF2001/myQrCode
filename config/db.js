const mongoose = require('mongoose');
const dbConfig = require('./dbconfig');

//const uri = "mongodb+srv://MoussF:mohamed2001@cluster0.rde6y.mongodb.net/authflutter?retryWrites=true&w=majority";

const uri = "mongodb+srv://MoussF:mohamed2001@cluster0.rde6y.mongodb.net/codeqr?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        //const conn = await mongoose.connect(dbConfig.database);
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('Erreur de connexion MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
