const express = require('express');
const app = express();
const port = 9000;


app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended:true}));

const route = require('./route');
app.use('/api/v1/student', route);


app.get('/api/v1/test', (req,res) => {
    res.send('CRUD-Assignment');
})

app.listen(port,function(){
    console.log('Server is Running on Port 9000');
})