import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly BooksService: BooksService) { }

  @ApiBearerAuth()
  @Post()
  async create(@Body() createShopDto: CreateShopDto, @Req() req: Request) {
    console.log(req['user'], 'sss')
    console.log(createShopDto, 'createShopDto')
    return await this.BooksService.create(createShopDto, String(req['user']['sub']));
  }
  @Get()
  findAll() {
    return this.BooksService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.BooksService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.BooksService.update(id, updateShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.BooksService.remove(id);
  }
}
