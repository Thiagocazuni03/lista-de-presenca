const express = require('express')
const app = express()
const list = require('./src/routes/list')
const cors = require('cors');

app.use(cors());
app.use('/', list)

app.listen(3000, ()=>{
    console.log('ouvindo porta 3000');
})