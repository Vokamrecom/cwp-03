const net = require('net');
const fs = require('fs');
const port = 8124;
const string = 'QA';
const bad = 'DEC';
const good = 'ACK';

const clientQa = new net.Socket();
let currentIndex = -1;
clientQa.setEncoding('utf8');

let questions = [];
clientQa.connect({port: port, host: '127.0.0.1'}, () => {
    fs.readFile("qa.json", (err, text) => {
        if (!err) {
            questions = JSON.parse(text);
            clientQa.write(string);
        }
        else console.error(err);
    });
});

clientQa.on('data', (data) => {
    if (data === bad)
        clientQa.destroy();
    if (data === good)
        sendQuestion();
    else {
        let qst = questions[currentIndex];
        let answer = qst.good;
        console.log('\n' + qst.quest);
        console.log('Answer:' + data);
        console.log('Server:' + answer);
        console.log('Result:' + (data === answer ? 'It is a right answer': 'Bad answer'));
        sendQuestion();
    }
});

clientQa.on('close', function () {
    console.log('Connection closed');
});



function sendQuestion() {
    if (currentIndex < questions.length -1) {
        let qst = questions[++currentIndex].quest;
        clientQa.write(qst);
    }
    else
        clientQa.destroy();
}