const fs = require('node:fs')
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// const SESSION_FILE_PATH = './session.json';
// let ws;
// let dataSession;

// // OPÇÃO 2
// // Válida a sessão
// const withSession = () => {
//   console.log('withsession');
//     dataSession = require(SESSION_FILE_PATH);
//     ws = new Client({ session: dataSession });
//     ws.on('ready', () => console.log('Cliente está pronto!'));
//     ws.on('auth_failure', () => {
//         console.log('** O erro de autenticação regenera o QRCODE (Excluir o arquivo session.json) **');
//     })
//     ws.initialize();
// } 

// const withOutSession = () => { 
//   console.log('withOutSession');
//   const client = new Client({
//       webVersionCache: {
//         type: "remote",
//         remotePath:
//           "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
//       },
//     });

//     client.on('qr', (qr) => {
//         qrcode.generate(qr, { small: true });
//     });

//     client.on('ready', () => {
//         console.log('Cliente está pronto!');
//     });
 
//     client.on('auth_failure', ()=>{
//         console.log('** O erro de autenticação regenera o QRCODE (Excluir o arquivo session.json)')
//     })

//     client.on('authenticated', (session) => {
//     console.log('Evento authenticated disparado');
//     console.log('Valor de session:', session); // Adicionando um log para verificar o valor de session

//     if (!session) {
//         console.log('Erro: session está undefined');
//         return;
//     }

//     dataSession = session;
//     console.log('dataSession:', dataSession);

//     fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
//         console.log('writeFile'); 
//         if (err) {
//             console.log('Erro ao escrever o arquivo:', err);
//         } else {
//             console.log('Arquivo escrito com sucesso');
//         }
//     });
// });


  

//     client.initialize();
// }
 
// /**
//  * Verificamos se existe um arquivo com credenciais!
// */
// (fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withOutSession();

// FINAL OPÇÃO 2

// OPÇÃO 1 FUNCIONANDO 
 
const client = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new LocalAuth({
        dataPath: 'session-whatsapp'
  }) 
 
});
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});


client.on('ready', () => {
    console.log('Cliente está pronto!');
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