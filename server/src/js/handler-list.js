const fs = require('node:fs');
const path = require('path');

// Caminho absoluto para a pasta 'files' baseado no diretório do projeto
const baseDir = path.resolve(__dirname, '../../../');
const filesDir = path.join(baseDir, 'files');

const listHandlers = {
    showFile:function(fileName,callback){
        console.log(__dirname);
        console.log('showfile');
        console.log(path.join(filesDir, fileName));
        const absoluteFilePath = path.join(filesDir, fileName);
        fs.readFile(absoluteFilePath,'UTF-8', (err, data)=>{
	    console.log(data)
	
        if(err){
            console.error(`Error reading file ${absoluteFilePath}:`, err);
        }

	   console.log('opa 2')

           callback & callback(data)
        })
    },
     addFile:function(fileName, newContent, callback){
            const absoluteFilePath = path.join(filesDir, fileName);
        fs.readFile(absoluteFilePath,'UTF-8', (err, data)=> {
            let content = new Array()
	
	  if (err) {
         console.error(`Error writing to file ${absoluteFilePath}:`, err);
      }else{
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
    
              fs.writeFile(absoluteFilePath, JSON.stringify(content, null,  3), (err)=>{
          console.log('see here 4')
                    if (err) throw err;
          console.log('see here 5')
                  
                  callback && callback()
                  console.log(`arquivo ${fileName} atualizado com sucesso!`)
              })
      }
      })
	  

    },
    remove:function(){

    }
}

module.exports = listHandlers

