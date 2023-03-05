import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose';
import { User } from './user.schemas';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: true
})
export class Post {
  @Prop()
  categoria: string;

  @Prop()
  title: string

  @Prop()
  Image: string;

  @Prop()
  Description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
