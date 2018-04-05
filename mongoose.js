var mongoose=require('mongoose');
mongoose.connect('mongodb://testuser:123@ds145750.mlab.com:45750/my_db');
console.log("Mongodb connect!");
module.exports=mongoose;

