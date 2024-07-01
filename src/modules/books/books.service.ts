import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../../models/books.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author, AuthorDocument } from '../../models/author.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    @InjectModel(Book.name) private booksModel: Model<BookDocument>,
  ) {}  

  async create(createBookDto: CreateBookDto) {
    console.log(createBookDto, 'CreateBookDto')
    const createdBook = new this.booksModel({...createBookDto});
    return createdBook.save();
  }

  async findAll(): Promise<BookDocument[]> {
    return this.booksModel.find().populate('author');
  }

  async findById(id: string): Promise<BookDocument> {
    return this.booksModel.findById(id).populate('author');
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<BookDocument> {
    return this.booksModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
  }

  async remove(id: string): Promise<BookDocument> {
    return this.booksModel.findByIdAndDelete(id).exec();
  }
}