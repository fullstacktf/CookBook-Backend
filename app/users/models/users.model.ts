import { Document, Schema, Model, model } from 'mongoose';
import { Hash } from 'crypto';
//import { Hash } from 'crypto';
const bcrypt = require('bcryptjs');

export interface UserModel extends Document {
  userName: string;
  avatar: string
  email: string;
  password: string;
  ingredientsPreferences: Array<string>;
  follows: Array<string>;
  ownRecipes: Array<string>;
  otherRecipes: Array<string>;
  rol: string
}

const UserSchema: Schema = new Schema({
  userName: String,
  avatar: String,
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

UserSchema.pre<UserModel>('save', function (next) {
  if (!this.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  })
})

export const User: Model<UserModel> = model<UserModel>('users', UserSchema);