import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { serverPORT } from './config.js';
import pool from './data/pool.js';
import bing from './services/bing.js';
import usersController from './controllers/users-controller.js';
import authController from './controllers/auth-controller.js';
import jwtStrategy from './auth/strategy.js';
import passport from 'passport';
import adminsController from './controllers/admins-controller.js';
const PORT = process.env.PORT || serverPORT;
import path from 'path';
import cluster from 'cluster';

import os from 'os';
const numCPUs = os.cpus().length;

const isDev = process.env.NODE_ENV !== 'production';


// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();
  app.use(cors());
  app.use(helmet());
  app.use(express.json());

  // Priority serve any static files.
  app.use(express.static(path.resolve('../client/build')));

  // Answer API requests.
  // app.get('/api', function (req, res) {
  //   res.set('Content-Type', 'application/json');
  //   res.send('{"message":"Hello from Teodor!"}');
  // });

  app.use('/users', usersController);
  app.use('/admins', adminsController);

  app.use('/app', express.static('public/avatars'));

  passport.use(jwtStrategy);
  app.use(passport.initialize());
  app.use('/auth', authController);

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve('../client/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
