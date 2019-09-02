const express = require('express');
const path = require('path');

const app = express();

app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, '/views/index.html'));
});
app.use('/components',express.static(path.join(__dirname, '/views/components')));
app.use('/extra',express.static(path.join(__dirname, '/views/')));
app.use('/database',express.static(path.join(__dirname, '/views/database')));
app.use('/public',express.static(path.join(__dirname, '/public')));
app.use('/name',express.static(path.join(__dirname, '/public')));




app.listen(3000, ()=>{
    console.log("listening on port 3000");
})