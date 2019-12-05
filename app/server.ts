import express from 'express';
import config from './config/config';
import morgan from 'morgan';
import mongoose from 'mongoose';
import userRouter from './users/routers/user.router';

const server = express();

//settings

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
server.set('port', config.port);

// Middlewares

server.use(morgan('dev'));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use('/users', userRouter);
server.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err);
  }
  next();
});

//Starting the server


mongoose.connect(config.db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(server.get('port'), (err) => {
      if (err) console.error(err);

      console.log(`Listen on port: ${server.get('port')}`);
    });
  })
  .catch(err => console.error(`Failed to connect to database: ${err}`));

