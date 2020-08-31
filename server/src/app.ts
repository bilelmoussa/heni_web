import express from 'express';
import { urlencoded, json } from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
//  import path from 'path';
import session, { Store } from 'express-session';
import csrf from 'csurf';
import { SESSION_OPTIONS  } from './config';
import { login, verifyOpenSession, message, project } from './routes/api';
import { notFound, serverError } from './middleware';
import { setupSocket } from './sockets/socket';

const createApp = (store: Store) => {
  // INITIALIZE CSURF PROTECTION
  const csrfProtection = csrf({ cookie: true });

  //   CREATE EXPRESS APP SERVER
  const app = express();

  //  CREATE HTTP SERVER
  const server = http.createServer(app);

  //  USE BODY PARSER
  app.use(json({ strict: true, type: 'application/json' }));

  //  ENCODE URL
  app.use(urlencoded({ extended: true }));

  //  COOKIE PARSER
  app.use(cookieParser());

  //  COMPRESS FILES
  app.use(compression());

  //  CROSS BROWER
  app.use(cors());

  //  SECURE HEADERS
  app.use(helmet());

  //  FOR REVERSED PROXY USERS
  app.enable('trust proxy');

  //  INITIALIZE EXPRESS-SESSION TO TRACK THE LOGGED-IN USER ACROSS SESSIONS.
  const expressSession = session({ ...SESSION_OPTIONS, store });

  app.use(expressSession);

  //  LIMIT THE AMOUNT OF THE REQUEST OF API
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  });

  // CSRF PROTECTION
  app.use('/api/', csrfProtection);

  //  API ENDPOINT
  app.use('/api/', apiLimiter);

  //  REGISTER API
  //  app.use('/api/', register);

  //  LOGIN API
  app.use('/api/', login);

  // VERIFY OPEN SESSION API
  app.use('/api/', verifyOpenSession);

  //  SEND CSURF TOKEN
  app.use('/api/csrf-token', csrfProtection, (req, res) => {
    res.json({csrfToken: req.csrfToken()})
  });

  // MESSAGES API
  app.use('/api/message/', message);

  // PROJECT API
  app.use('/api/project/', project);

  app.get('/', (req, res) => {
    res.json({ data: 'success' });
  });


  //  SERVE STATIC FILES
  /*
  if (NODE_ENV && NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/build')));
  }
  */

    //  ERRORS MIDDLEWARES  
    app.use(notFound);
    app.use(serverError);

    //  SETUP SOCKET.IO
    setupSocket(server, expressSession);
    
  return { server };
};

export default createApp;
