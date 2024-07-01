import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BooksSchema, BookDocument } from '../../models/books.schema';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Author, AuthorSchema, AuthorDocument } from '../../models/author.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Author.name) private AuthorModel: Model<AuthorDocument>,
    @InjectModel(Book.name) private BooksModel: Model<BookDocument>,
) {}  
  async create(createShopDto: CreateShopDto, userId: string) {
    // console.log(CreateShopDto.prototype, 'prototype')
    // console.log(CreateShopDto.arguments, 'arguments')
    // const User = await this.AuthorModel.findOne({ _id: userId })
    const createdShops = new this.BooksModel({...createShopDto, author: userId});
    // User.shops.push(createdShops.id)
    // User.save()
    return createdShops.save();
  }

  async findAll(): Promise<BookDocument[]> {
    return this.BooksModel.find().populate('author')
  }

  async findById(id: string): Promise<BookDocument> {
    return this.BooksModel.findById(id);
  }

  async update(id: string, updateShopDto: UpdateShopDto): Promise<BookDocument> {
    return this.BooksModel.findByIdAndUpdate(id, updateShopDto, {new: true}).exec();
  }

  async remove(id: string): Promise<BookDocument> {
    return this.BooksModel.findByIdAndDelete(id).exec();
  }
}
