const express = require('express');
const morgan = require('morgan');

const app = express();

// Middlewares

/* app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/recipes', recipeRouter); */

//Starting the server


app.listen(process.env.PORT || 3000, err => {
    if(err) {
        console.log(err);
    }
    else {
        console.log('listening on port 3000');
    }
})

