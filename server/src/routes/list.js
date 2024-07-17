const express = require('express')
const router = express.Router()
const listHandlers = require('../js/handler-list')
const {phoneSanitize, sendMessage} = require('../js/whatsapp-handler')
const fs = require('node:fs')
const path = require('node:path')


 
router.get('/confirmados',(req, res)=>{
    // res.send(list)
	console.log('confirmados etapa 1')    
    console.log(process.cwd());
	console.log('confirmados etapa 2')
	console.log(__dirname)

     listHandlers.showFile(process.cwd()+'/files/confirmados.txt', (data)=>{
	console.log('confirmados etapa 3')
        res.status(200)

	console.log('data')
	console.log(data)
	console.log('confirmados etapa 4')
	if(data && data != ''){
		console.log('data')
		console.log(data)
		console.log('confirmados etapa 5')
	   res.send(JSON.stringify(data))
	}else {
	console.log('confirmados etapa 6')
	  res.send('')
	}
        
    }) 
})
 
router.post('/confirmar',express.json(),(req, res)=>{
    let path = '../confirmados.txt'
    let data = req.body

	console.log('não enviou a mensagem ainda')
	console.log(data)
	console.log(typeof data)
    let content = JSON.stringify(data)
	console.log('chegou aqqui agr')

    if(!fs.existsSync(process.cwd()+'/files')){
        fs.mkdirSync('./files')
    }
  
    listHandlers.addFile(process.cwd()+'/files/confirmados.txt', content, ()=>{
        res.status(200)
  	console.log('enviando mensagem')      
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
