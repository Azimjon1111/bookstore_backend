import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose'
import { HydratedDocument , Types} from 'mongoose'

export type AuthorDocument = HydratedDocument<Author>
@Schema({ collection: 'authors', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Author {
  @Prop()
  first_name: string

  @Prop()
  last_name: string

  @Prop({ type: Date})
  date_of_birth: Date;

  @Prop({ type: Date})
  date_of_death: Date;

  // @Prop({ref:'books', type: Types.ObjectId, default: null})
  // books: Types.ObjectId[];

  @Prop()
  photo: string
}

export const AuthorSchema = SchemaFactory.createForClass(Author)