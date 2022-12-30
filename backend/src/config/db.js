const mongoose = require('mongoose');
const env=require('dotenv').config();
mongoose.set('strictQuery', false);

const connect = ()=>{
    return mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.ihfaecs.mongodb.net/?retryWrites=true&w=majority`)
}

module.exports=connect;




//mongodb+srv://Shikha:Shikha%4009@cluster0.ihfaecs.mongodb.net/?retryWrites=true&w=majority