const mongoose = require('mongoose');

const connectDb = async () =>{
    try{
        const connect = await mongoose.connect(process.env.DB_CONNECTION);
        console.log("Connected", connect.connection.host, connect.connection.name);
    }catch(err){
        console.log();
        process.exit(1);
    }
}

module.exports = connectDb;