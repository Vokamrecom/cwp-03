const net = require('net');
const port = 8124;

const server = net.createServer((client) => {
    console.log('Client ' + client.id +  ' connected');

    client.setEncoding('utf8');

    client.on('data', (data) => {
        console.log(data);
        client.write('\r\nHello!\r\nRegards,\r\nServer\r\n');
    });

    client.on('end', () => console.log('Client '+ client.id +  'disconnected'));
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});