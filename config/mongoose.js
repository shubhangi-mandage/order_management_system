const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ecommerce',{
    useNewUrlParser: true,
    useUnifieldTopology: true,    
});

const db = mongoose.connection;

db.on('error',console.error.bind(console.log('Mongodb connection error')));
db.once('open', ()=>{
    console.log('connected to mongodb');
});

module.exports = mongoose;