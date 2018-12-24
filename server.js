const express = require ('express');
const app = express();
const mongoose = require ('mongoose');

const db = require('./config/keys').mongoUri;

mongoose.connect(db)
.then(()=>console.log('connected to mongodb server'))
.catch(err=>console.log(err));
 
app.get('/', (req, res)=>{
    res.send('hello')
});

const port = process.env.PORT||5000;

app.listen(port, ()=> console.log(`server runs on port ${port}`));