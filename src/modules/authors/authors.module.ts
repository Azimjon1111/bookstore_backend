import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorsController } from './authors.controller';
import { Book, BooksSchema } from '../../models/books.schema';
import { AuthorsService } from './authors.service';
import { Author, AuthorSchema } from '../../models/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Author.name, schema: AuthorSchema }]),
    MongooseModule.forFeature([{ name: Book.name, schema: BooksSchema }]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
