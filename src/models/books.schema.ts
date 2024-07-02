import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose'
import { HydratedDocument , Types} from 'mongoose'

export type BookDocument = HydratedDocument<Book>
@Schema({ collection: 'books', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Book {
  @Prop()
  name: string

  @Prop()
  description: string

  @Prop({ type: Date})
  published_date: Date;

  @Prop({ref:'Author', type: Types.ObjectId, default: null, required: true})
  author: Types.ObjectId;

  @Prop()
  rating: number

  @Prop()
  cover: string

  @Prop()
  genres: string

  @Prop()
  tags: string
}

export const BooksSchema = SchemaFactory.createForClass(Book)