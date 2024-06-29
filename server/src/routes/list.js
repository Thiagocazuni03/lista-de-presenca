const express = require('express')
const router = express.Router()
const listHandlers = require('../js/handler-list')
const fs = require('node:fs')
const list = [
    {
    name:'thiago Cazuni',
    email:"thiagocazunipsn@gmail.com"
    },
    {
    name:'Betynna Reis',
    email:"betynnareis4@gmail.com"
    }
]

router.get('/confirmados',(req, res)=>{
    // res.send(list)
     listHandlers.showFile(process.cwd()+'../../files/confirmados.txt', (data)=>{
        res.status(200)
        res.send(JSON.stringify(data))
    }) 
})
 
router.post('/confirmar',express.json(),(req, res)=>{
    let path = '../confirmados.txt'
    console.log(typeof req.body);
    let content = JSON.stringify(req.body)

    if(!fs.existsSync(process.cwd()+'../../files')){
        fs.mkdirSync('./files')
    }
 
    listHandlers.addFile(process.cwd()+'../../files/confirmados.txt', content, ()=>{
        res.status(200)
        res.send(`os seguintes arquivos foram adicionados! \n ${content} \n no arquivo ${path}` )
    }) 

})

module.exports = router