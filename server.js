const express = require ('express');
const app = express();
const mongoose = require ('mongoose');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

const passport = require ('passport');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false, useNewUrlParser: true}));
app.use(bodyParser.json());



const db = require('./config/keys').mongoUri;

mongoose.connect(db, { useNewUrlParser: true })
.then(()=>console.log('connected to mongodb server'))
.catch(err=>console.log(err));
 
//passport middleware
app.use(passport.initialize());

//passport config strategy
require('./config/passport')(passport);


app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);


const port = process.env.PORT||5000;

app.listen(port, ()=> console.log(`server runs on port ${port}`));