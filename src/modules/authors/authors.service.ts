import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from '../../models/author.schema';
import { Book, BookDocument } from '../../models/books.schema';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<AuthorDocument>,
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    console.log(createAuthorDto, 'CreateAuthorDto');
    const createdAuthor = new this.authorModel({ ...createAuthorDto });
    return createdAuthor.save();
  }

  async findAll(): Promise<AuthorDocument[]> {
    return this.authorModel.find().exec();
  }

  async findById(id: string): Promise<AuthorDocument> {
    return this.authorModel.findById(id).exec();
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<AuthorDocument> {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorDto, { new: true }).exec();
  }

  async remove(id: string): Promise<AuthorDocument> {
    return this.authorModel.findByIdAndDelete(id).exec();
  }

  async findAllWithTopBooks() {
    const authors = await this.authorModel.find().exec();
    const authorWithTopBooks = await Promise.all(
      authors.map(async (author) => {
        const topBooks = await this.bookModel
          .find({ author: author._id })
          .sort({ rating: -1 })
          .limit(3)
          .exec();
        return { ...author.toObject(), topBooks };
      }),
    );
    return authorWithTopBooks;
  }
}
