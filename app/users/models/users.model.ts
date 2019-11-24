import mongoose from 'mongoose';
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    userName: String,
    email: String,
    password: String,
    ingredientsPreferences: {
        preferent: Array,
        ignore: Array
    },
    follows: Array,
    ownRecipes: Array,
    otherRecipes: Array,
    rol: String
}, {
    collection: 'UsersData'
});

// UserSchema.pre('save', function (next) {
//     const user = this;
//     if (!user.isModified('password')) return next();

//     bcrypt.genSalt(10, (err, salt) => {
//         if (err) return next();

//         bcrypt.hash(ser.password, salt, null, (err, hash) => {
//             if (err) return next(err);

//             user.password = hash;
//             next();
//         });
//     });
// });

export default mongoose.model('User', UserSchema);