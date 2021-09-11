import 'dotenv/config';
import 'reflect-metadata';
import App from './App';
import { createConnection } from 'typeorm';
import config from '../ormconfig';
import controllers from '../controllers';

const port = process.env.PORT || '8080';

(async () => {
  await createConnection(config).then(() => {
    console.log('☣️  Connected to MySQL Database! 🐢💨');
  });
  const server = new App(Number(port), controllers);
  server.startServer();
})();
