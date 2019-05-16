const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose
.connect('mongodb://jiten:jiten1@ds237858.mlab.com:37858/rest_api',{useNewUrlParser:true})
.then(()=> console.log('connect to db...'))
.catch(err => console.log(err));
