const express = require('express')
const app = express()
const list = require('./src/routes/list')
const cors = require('cors');
const path = require('node:path')
app.use(cors());

console.log('__dirname');
console.log(__dirname);
app.use(express.static(path.join(__dirname, '..','client')))
app.use('/lista/', list)

app.get('/', (req, res)=>{
    const filePath = path.join(__dirname, '..','client', 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('Erro ao enviar o arquivo:', err);
            res.status(404).send('Arquivo não encontrado');
        }
    });
}) 
 


app.listen(3000, ()=>{
    console.log('ouvindo porta 3000');
}) 