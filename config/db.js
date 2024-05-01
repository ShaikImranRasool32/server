const mongoose = require('mongoose'); 
require('dotenv').config(); 
 
const uri = process.env.MONGODB_URL;
const options = { 
  useNewUrlParser: true,  
 useUnifiedTopology: true, 


}; 
 
mongoose.connect(uri, options) 
  .then(() => console.log('Connected to MongoDB...')) 
  .catch((err) => console.error('Could not connect to MongoDB.', err)); 
 
const db = mongoose.connection; 
module.exports = db;
