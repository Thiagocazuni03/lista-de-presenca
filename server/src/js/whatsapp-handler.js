const fs = require('node:fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Configuração do cliente com autenticação local
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: 'session-whatsapp'
    }),
    restartOnAuthFail: true,
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

// Evento de autenticação
client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

// Geração do QR Code
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

// Cliente pronto
client.on('ready', async () => {
    const version = await client.getWWebVersion();
    console.log(`WWeb v${version}`);
    console.log('Cliente está pronto!');
    
    // Enviar mensagem de teste ao estar pronto
    try {
        const testNumber = '1234567890@c.us'; // Substitua pelo número de teste correto
        const testMessage = 'Mensagem de teste';
        console.log('Enviando mensagem de teste...');
        await client.sendMessage(testNumber, testMessage);
        console.log('Mensagem de teste enviada com sucesso');
    } catch (error) {
        console.error('Erro ao enviar mensagem de teste:', error);
    }
});

// Cliente desconectado
client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});

const isClientConnected = () => {
    console.log(client.info);
    return client.info && client.info.wid;
};

// Inicializa o cliente
client.initialize();

// Função para enviar mensagem
async function sendMessage(msg, number) {
    if (!client || !client.info || !client.info.wid) {
        throw new Error('Client is not connected');
    }
    try {
        const chatId = number.substring(1) + "@c.us";
        console.log(`Enviando mensagem para ${chatId}`);
        await client.sendMessage(chatId, msg);
        console.log('Mensagem enviada com sucesso para', number);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
}

// Função para sanitizar o número de telefone
function phoneSanitize(str) {
    let val = '+55';
    let number = str.replace(/\D/g, ''); // Removendo caracteres não numéricos
    number = number.slice(0, 2) + number.slice(3); // Ajustando o número
    console.log('Sanitized number:', `${val}${number}`);
    return `${val}${number}`;
}

module.exports = { client,  sendMessage, isClientConnected, phoneSanitize };

