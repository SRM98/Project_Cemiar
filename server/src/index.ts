import {server, ServerRoute } from '@hapi/hapi';
import Message from './models/Message';
const fs = require('fs');

const init = async () => {
  const hapiServer = server({
    port: 3000,
    host: 'localhost',
    routes: {
      "cors": {
        "origin": ["https://localhost:8080"],
        "headers": ["Accept", "Content-Type", "Access-Control-Allow-Origin"],
    }
    }
  });

  const routes: ServerRoute[] = [
    {
      method: 'POST',
      path: '/message',
      handler: (request, h) => {
        const  message = request.payload as { text: Message };
        var allData = fs.readFileSync('db.json');
        var messageArray= JSON.parse(allData);
        messageArray.push(message);
        let data = JSON.stringify(messageArray, null, 2);
        fs.writeFileSync('db.json', data);

        return messageArray ;
      },
    },
    {
      method: 'GET',
      path: '/messages',
      handler: (request, h) => {
        var allData = fs.readFileSync('db.json');
        var messageArray : Array<Message> = JSON.parse(allData);
        return messageArray;
      },
    },
  ];

  hapiServer.route(routes);

  await hapiServer.start();
  console.log('Server running on %s', hapiServer.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
