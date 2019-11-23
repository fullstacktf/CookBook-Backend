import express, { json, urlencoded } from 'express';
import config from './config/config';
import morgan from 'morgan';
import mongoose from 'mongoose';
import recipeRouter from './recipes/routers/recipe.router';

const server = express();

// settings

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
server.set('port', config.port);

// Middlewares

server.use(morgan('dev'));
server.use(urlencoded({ extended: false }));
server.use(json());

server.use('/recipes', recipeRouter);
server.use((req, res, err, next) => {
  if (err) {
    res.status(500).send(err);
  }
  next();
});

// Starting the server and DB

mongoose.connect(config.db, { useNewUrlParser: true })
  .then(db => {
    console.log('Connected to MongoDB');
    server.listen(server.get('port'), (err) => {
      if (err) console.error(err);

      console.log(`Listen on port: ${server.get('port')}`);
    });
  })
  .catch(err => console.error(`Failed to connect to database: ${err}`));
