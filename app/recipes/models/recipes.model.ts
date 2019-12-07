import { Document, Schema, Model, model } from 'mongoose';

export interface RecipeModel extends Document {
  title: string;
  owner: string;
  description: string;
  ingredients: Array<object>;
  likes: number;
  comments;
  date: Date;
  tags: Array<string>;
}

const RecipeSchema: Schema = new Schema({
  title: String,
  owner: String,
  description: String,
  ingredients: [{
    name: String,
    quantity: String
  }],
  likes: Number,
  comments: [{
    commentOwner: String,
    content: String,
    likes: Number,
    date: Date
  }],
  date: Date,
  tags: Array
});

export const Recipe: Model<RecipeModel> = model<RecipeModel>('Recipe', RecipeSchema);
