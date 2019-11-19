const express = require('express');
const config = require('./config/config');
const morgan = require('morgan');
const mongoose = require('mongoose');

const server = express();

//settings

server.set('port', config.port);
mongoose.set("useFindAndModify", false);

// Middlewares

server.use(morgan('dev'));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
// server.use('/api/users', userRouter);
// server.use('/api/recipes', recipeRouter); 

//Starting the server


mongoose.connect(config.db, { useNewUrlParser: true })
    .then(db => {
        console.log('Connected to MongoDB');
        server.listen(server.get('port'), (err) => {
            if (err) console.error(err);

            console.log(`Listen on port: ${server.get('port')}`);
        });
    })
    .catch(err => console.err(`Failed to connect to database: ${err}`));

