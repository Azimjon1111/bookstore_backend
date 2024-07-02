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

import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authors')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiBearerAuth()
  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    console.log(createAuthorDto, 'CreateAuthorDto');
    return await this.authorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }
  @Get('with-top-books')
  findAllWithTopBooks() {
    return this.authorsService.findAllWithTopBooks();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.authorsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }


}
