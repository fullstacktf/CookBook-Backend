import { Document, Schema, Model, model } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export interface UserModel extends Document {
  comparePasswords(password: string, callback): void;
  gravatar(): string;
  userName: string;
  avatar: string;
  email: string;
  password: string;
  ingredientsPreferences: Array<string>;
  follows: Array<string>;
  ownRecipes: Array<string>;
  otherRecipes: Array<string>;
  rol: string;
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
});

UserSchema.pre<UserModel>('save', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.userName = user.userName.toLowerCase();

  if (!user.isModified('password'))
    return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePasswords = function (candidatePassword: string, callback): void {
  console.log('model');
  bcrypt.compare(candidatePassword, this.password, function (err: Error, isMatch: boolean) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

UserSchema.methods.gravatar = function (): string {
  if (!this.userName) return 'https://gravatar.com/avatar/?s=200&d=retro';

  const md5 = crypto.createHash('md5').update(this.userName).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`;
};

export const User: Model<UserModel> = model<UserModel>('users', UserSchema);