import { Document, Schema, Model, model } from 'mongoose';

export interface ImageModel extends Document {
  imgTitle: string;
  imgPath: string;
  imgDate: Date;
}


export interface RecipeModel extends Document {
  title: string;
  owner: string;
  description: string;
  ingredients: Array<object>;
  images;//: Array<ImageModel>;
  likes: number;
  comments;// : Array<object>;
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
  images: [{
    imgTitle: String,
    imgPath: String,
    imgDate: Date
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
