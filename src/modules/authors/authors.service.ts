import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../../models/books.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author, AuthorDocument } from '../../models/author.schema';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    @InjectModel(Book.name) private booksModel: Model<BookDocument>,
  ) {}  

  async create(createAutCreateAuthorDto: CreateAuthorDto) {
    console.log(createAutCreateAuthorDto, 'CreateAuthorDto')
    const createdBook = new this.authorModel({...createAutCreateAuthorDto});
    return createdBook.save();
  }

  async findAll(): Promise<AuthorDocument[]> {
    return this.authorModel.find();
  }

  async findById(id: string): Promise<AuthorDocument> {
    return this.authorModel.findById(id);
  }

  async update(id: string, updateAutUpdateAuthorDto: UpdateAuthorDto): Promise<AuthorDocument> {
    return this.authorModel.findByIdAndUpdate(id, updateAutUpdateAuthorDto, { new: true }).exec();
  }

  async remove(id: string): Promise<AuthorDocument> {
    return this.authorModel.findByIdAndDelete(id).exec();
  }
}