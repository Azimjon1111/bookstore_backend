import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './modules/books/books.module';
import {AuthorsModule} from './modules/authors/authors.module'
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    BooksModule,
    AuthorsModule
  ],
  providers: [],
})
export class AppModule {}
