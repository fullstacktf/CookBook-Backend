import express, { json, urlencoded, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import config from './config/config';
import morgan from 'morgan';
import mongoose from 'mongoose';
import recipeRouter from './recipes/routers/recipe.router';


const server = express();

// settings

mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
server.set('port', config.port);

// Middlewares

server.use(morgan('dev'));
server.use(urlencoded({ extended: false }));
server.use(json());

server.use('/recipes', recipeRouter);

server.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(500).json(err);
  }
  next();
});

// Starting the server and DB

mongoose.connect(config.db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(server.get('port'), (err) => {
      if (err) console.error(err);

      console.log(`Listen on port: ${server.get('port')}`);
    });
  })
  .catch(err => console.error(`Failed to connect to database: ${err}`));
