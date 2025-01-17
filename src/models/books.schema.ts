import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ collection: 'books', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Book {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  description: string;

  @Prop({ type: Date, required: true })
  published_date: Date;

  @Prop({ ref: 'Author', type: Types.ObjectId, default: null, required: true })
  author: Types.ObjectId;

  @Prop()
  rating: number;

  @Prop({})
  cover: string;

  @Prop({ type: [String] })
  genres: string[];

  @Prop({ type: [String] })
  tags: string[];
}

export const BooksSchema = SchemaFactory.createForClass(Book);