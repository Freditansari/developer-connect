const express = require ('express');
const app = express();
const mongoose = require ('mongoose');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');


const db = require('./config/keys').mongoUri;

mongoose.connect(db)
.then(()=>console.log('connected to mongodb server'))
.catch(err=>console.log(err));
 
app.get('/', (req, res)=>{
    res.send('hello')
});

app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);


const port = process.env.PORT||5000;

app.listen(port, ()=> console.log(`server runs on port ${port}`));