const fs = require('node:fs')
const listHandlers = {
    showFile:function(path,callback){
        fs.readFile(path,'UTF-8', (err, data)=>{

            if(err){
                throw new Error(err)
            }

           callback & callback(data)
        })
    },
    addFile:function(path, newContent, callback){

        fs.readFile(path,'UTF-8', (err, data)=> {
            let content = [
                ...JSON.parse(newContent)
            ]

            if(data !=""){
                content = [...JSON.parse(data), ...JSON.parse(newContent) ]
            }

            fs.writeFile(path, JSON.stringify(content, null,  3), (err)=>{
                if(err){
                    return console.log('erro tá' + err)
                }

                
                callback && callback()
                console.log(`arquivo ${path} atualizado com sucesso!`)
            })
        })

    },
    remove:function(){

    }
}

module.exports = listHandlers
