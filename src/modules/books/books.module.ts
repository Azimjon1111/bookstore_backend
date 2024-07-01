import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { Book, BooksSchema } from '../../models/books.schema';
import { BooksService } from './books.service';
import { Author, AuthorSchema } from '../../models/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: BooksSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
