import { Document, Schema, Model, model } from 'mongoose';
//import { Hash } from 'crypto';
//const { Schema } = mongoose;
//const bcrypt = require('bcryptjs');

export interface IntUserModel extends Document {
    userName: string;
    email: string;
    password: string;
    ingredientsPreferences: Array<string>;
    follows: Array<string>;
    ownRecipes: Array<string>;
    otherRecipes: Array<string>;
    rol: string
}

const UserSchema: Schema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
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




// UserSchema.methods.encryptPassword = async (password) => {
//     const salt = await bcrypt.genSalt(10);
//     const hash = bcrypt.hash(password, salt);
//     return hash;
// };

// UserSchema.methods.matchPassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };




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

export const User: Model<IntUserModel> = model<IntUserModel>('users', UserSchema);