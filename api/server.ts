import 'dotenv/config';
import App from './App';
import controllers from '../controllers';

const port = process.env.PORT || '8080';

const server = new App(Number(port), controllers);

server.startServer();
