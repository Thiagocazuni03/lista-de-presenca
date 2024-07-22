const express = require('express');
const router = express.Router();
const path = require('path');
const listHandlers = require(path.resolve(__dirname, '../js/handler-list'));
const { phoneSanitize, sendMessage, isClientConnected } = require(path.resolve(__dirname, '../js/whatsapp-handler'));
const fs = require('fs');

// Caminho absoluto para a pasta 'files' baseado no diretório do projeto
const baseDir = path.resolve(__dirname, '../../../');
const filesDir = path.join(baseDir, 'files');

router.get('/confirmados', (req, res) => {
    console.log('confirmados etapa 1');
    console.log(process.cwd());
    console.log('confirmados etapa 2');
    console.log(__dirname);

    // Nome do arquivo 'confirmados.txt'
    const confirmadosFile = 'confirmados.txt';

    listHandlers.showFile(confirmadosFile, (data) => {
        console.log('confirmados etapa 3');
        res.status(200);

        console.log('data');
        console.log(data);
        console.log('confirmados etapa 4');
        if (data && data != '') {
            console.log('data');
            console.log(data);
            console.log('confirmados etapa 5');
            res.send(JSON.stringify(data));
        } else {
            console.log('confirmados etapa 6');
            res.send('');
        }
    });
});

router.post('/confirmar', express.json(), async (req, res) => {
    let data = req.body;

    console.log('não enviou a mensagem ainda');
    console.log(data);
    console.log(typeof data);
    let content = JSON.stringify(data);
    console.log('chegou aqui agr');

    if (!fs.existsSync(filesDir)) {
        fs.mkdirSync(filesDir, { recursive: true });
    }

    const confirmadosFile = 'confirmados.txt';

    listHandlers.addFile(confirmadosFile, content, async () => {
        res.status(200);
        console.log('enviando mensagem');
        res.send(JSON.stringify({
            message: `Os seguintes arquivos foram adicionados! \n ${content} \n no arquivo ${confirmadosFile}`,
            errorCode: 0,
            content: content,
        }));

        if (data[0].phone) {
            try {
                let number = phoneSanitize(data[0].phone);
                if (isClientConnected()) {
                    await sendMessage('*thiago cazuni - testando bot* Olá, obrigado por marcar presença no evento', number);
                } else {
                    console.error('Client is not connected');
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    });
});

module.exports = router;