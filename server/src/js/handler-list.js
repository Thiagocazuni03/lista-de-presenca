const fs = require('node:fs')
const listHandlers = {
    showFile:function(path,callback){
        fs.readFile(path,'UTF-8', (err, data)=>{
	console.log(data)
	
            if(err){
		console.log('opa')
                throw new Error(err)
            }

	   console.log('opa 2')

           callback & callback(data)
        })
    },
     addFile:function(path, newContent, callback){

        fs.readFile(path,'UTF-8', (err, data)=> {
            let content = new Array()
	
	  if (err) throw err;
	  
           if(data && data.trim().length > 0){
		content = new Array()
		console.log('see here 3')
		console.log('data')
		console.log(data)
		console.log('newcontent')
		console.log(newContent)

                content = [...JSON.parse(data), ...JSON.parse(newContent)]

		console.log('content')
		console.log(content)
            } else {
		
		content = JSON.parse(newContent)
	    }

            fs.writeFile(path, JSON.stringify(content, null,  3), (err)=>{
		console.log('see here 4')
                  if (err) throw err;
		console.log('see here 5')
                
                callback && callback()
                console.log(`arquivo ${path} atualizado com sucesso!`)
            })
        })

    },
    remove:function(){

    }
}

module.exports = listHandlers

