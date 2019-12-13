import { User, UserModel } from '../models/users.model';
import { createToken, destroyToken } from '../services/jwt.services';

export default class UserCRUD {

  static async getUsers(): Promise<UserModel[]> {
    const users = await User.find().limit(10);
    return users;
  }

  static async getUserByUsername(username: string): Promise<UserModel> {
    const user = await User.findOne({ userName: username });
    return user;
  }

  static async signUp(body: UserModel): Promise<string> {
    const { userName, email, password } = body;

    const newUser: UserModel = new User({
      userName,
      email,
      password,
      ingredientsPreferences: {
        preferent: [],
        ignore: []
      },
      follows: [],
      ownRecipes: [],
      otherRecipes: [],
      rol: 'user'
    });
    newUser.avatar = newUser.gravatar();
    await newUser.save(err => { if (err) throw err; });

    return createToken(newUser);
  }

  static async signIn(body: UserModel): Promise<string> {
    const { userName, password } = body;
    const user = await User.findOne({ userName });
    if (user === null) throw Error;
    user.comparePasswords(password, (error, isMatch) => {
      if (error) throw error;
      if (!isMatch) throw error;
    });
    const token = createToken(user);
    return token;
  }

  static async signOut(token: JsonWebKey): Promise<JsonWebKey> {
    return await destroyToken(token);
  }

  static async updateUser(id: string, body: string): Promise<UserModel> {
    const userUpdated = await User.findOneAndUpdate(id, body);
    return userUpdated;
  }

  static async deleteUser(id: string): Promise<UserModel> {
    const userDeleted = await User.findByIdAndDelete(id);
    return userDeleted;
  }

  static async getUserRecipes(username: string): Promise<string[]> {
    const user = await this.getUserByUsername(username);
    const ownRecipes = user.ownRecipes;
    return ownRecipes;
  }

  static async saveUserRecipe(username: string, body: string): Promise<string> {
    const user = await this.getUserByUsername(username);
    user.ownRecipes.push(body);
    await user.save();
    return user.userName;
  }

  static async deleteUserRecipe(username: string, rid: string): Promise<string> {
    const user = await this.getUserByUsername(username);
    user.ownRecipes.splice(user.ownRecipes.indexOf(rid), 1);
    await user.save();
    return user.userName;
  }

  static async getUserSavedRecipes(username: string): Promise<string[]> {
    const user = await this.getUserByUsername(username);
    const otherRecipes = user.otherRecipes;
    return otherRecipes;
  }

  static async saveRecipesFromOtherUsers(username: string, body: string): Promise<string> {
    const user = await this.getUserByUsername(username);
    user.otherRecipes.push(body);
    await user.save();
    return user.userName;
  }

  static async deleteUserSavedRecipes(username: string, rid: string): Promise<string> {
    const user = await this.getUserByUsername(username);
    user.otherRecipes.splice(user.otherRecipes.indexOf(rid), 1);
    await user.save();
    return user.userName;
  }
}
