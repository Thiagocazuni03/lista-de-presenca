const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const readline = require('node:readline'); // Use 'node:readline' se estiver usando Node.js v16 ou superior
// Ou use 'require('readline')' para versões anteriores

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});




rl.on('close', ()=> { //callback após o evento close ser disparado
	rl.write('Saindo...')
	// process.exit(0) // se passar 0 deu tudo certo
	// process.exit(1)// se passar 1 é por que deu erro
})

const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Cliente está pronto!');
    buildMenu()
});

client.on('message', (message) => {
    if(message.body.toLowerCase().includes('bom dia')){
        message.reply('*thiagocazuni - TESTANDO BOT* - Olá! você está recebendo uma mensagem personalizada do meu bot de whatsapp, tenha um bom dia! *mensagem automática*');
    }

    if(message.body.toLowerCase().includes('sarah')){
        message.reply('*thiagocazuni - TESTANDO BOT* - Você digitou a palavra chave ${sarah}, sarah esta bem- *mensagem automática*');
    }
    
    if (message.body.startsWith('!ping')) {
        message.reply('pong');
    }
});

client.initialize();

function buildMenu(){

    rl.question('1 - enviar mensagem padrão, 2 - fechar instancia do input', (answer)=>{
        // rl.write('olá' + answer +'\n')
        if(answer == 1){
            sendMessage('olá betynna, essa é uma mensagem automática', '+555496531849')
            buildMenu()
        }
        if(answer == 2){
            rl.close() //fecha o rl.question
        }
      
    })
}
function sendMessage(msg, number){
    
  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
 const chatId = number.substring(1) + "@c.us";

 // Sending message.
 client.sendMessage(chatId, msg);

}

