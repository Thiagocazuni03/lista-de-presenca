const express = require('express')
const router = express.Router()
const listHandlers = require('../js/handler-list')
const {phoneSanitize, sendMessage} = require('../js/whatsapp-handler')
const fs = require('node:fs')


router.get('/confirmados',(req, res)=>{
    // res.send(list)
     listHandlers.showFile(process.cwd()+'../../files/confirmados.txt', (data)=>{
        res.status(200)
        res.send(JSON.stringify(data))
    }) 
})
 
router.post('/confirmar',express.json(),(req, res)=>{
    let path = '../confirmados.txt'
    let data = req.body

    let content = JSON.stringify(data)

    if(!fs.existsSync(process.cwd()+'../../files')){
        fs.mkdirSync('./files')
    }
  
    listHandlers.addFile(process.cwd()+'../../files/confirmados.txt', content, ()=>{
        res.status(200)
        
        res.send(JSON.stringify({
            message: `os seguintes arquivos foram adicionados! \n ${content} \n no arquivo ${path}`,
            errorCode:0,
            content: content,
        }))

        if(data[0].phone){
            let number = phoneSanitize(data[0].phone)
            sendMessage('*thiago cazuni - testando bot* Olá, obrigado por marcar presença no evento', number)
            
        }
        
    })  

})

module.exports = router