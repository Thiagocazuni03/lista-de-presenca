const fs = require('node:fs')
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
 
const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new LocalAuth({
        dataPath: 'session-whatsapp'
  }),
   puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--disable-gpu',
            '--window-size=1920x1080'
        ]
    }
 
});
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Cliente está pronto!');
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});
client.pupBrowser.on('disconnected', () => {
    console.log('Puppeteer browser disconnected');
});

client.pupBrowser.on('targetdestroyed', () => {
    console.log('Puppeteer target destroyed');
});

client.initialize();

// FINAL OPÇÃO 1 FUNCIONANDO 

function sendMessage(msg, number){
    
  //pegando o chatId do número
  //deletando "+" do início e adicionando "@c.us" no final do número
 const chatId = number.substring(1) + "@c.us";

 // enviando mensagem para número
 client.sendMessage(chatId, msg);

}


function phoneSanitize(str){
    let val = '+55'
    let number = str.replace(/\D/g, ''); // Aplicando o regex para remover os caracteres não numéricos
 
    number = number.slice(0, 2) + number.slice(3);

    console.log('number');
    console.log( `${val}${number}`);

    return `${val}${number}`
}



module.exports = {phoneSanitize, sendMessage}