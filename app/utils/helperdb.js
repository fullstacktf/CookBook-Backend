const mongoose = require('mongoose');


export class HelperDB {

    static connectDB() {
        let URI = "mongodb://localhost:27017/recipes";
        mongoose.connect(URI, { useNewUrlParser: true });
        mongoose.set("useFindAndModify", false);
        console.log('DB connected :)');
    }

    
};