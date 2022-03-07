const mongoose =  require("mongoose");
require("dotenv").config();

const Connection = async () => {
    const URL = process.env.DATABASE;
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true})
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

module.exports = Connection;