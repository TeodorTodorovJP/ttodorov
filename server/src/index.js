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

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/users', usersController);
app.use('/admins', adminsController);

app.use('/app', express.static('public/avatars'));

passport.use(jwtStrategy);
app.use(passport.initialize());
app.use('/auth', authController);

// app.get('/', async (req, res) => {
//   res.send({ message: 'We did it.' });
// })

//     .get('/db', async (req, res) => {
//       try {
//         const result = await pool.query('SELECT * FROM genres');
//         res.send(result);
//       } catch (err) {
//         console.error(err);
//         res.send('Error ' + err);
//       }
//     })

//     .get('/bing', async (req, res) => {
//       try {
//         const result = await bing();

//         console.log(result);

//         res.send({ result: result.travelDistance });
//       } catch (err) {
//         console.error(err);

//         res.send('Error ' + err);
//       }
//     });

app.all('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found!' })
);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}...`));

