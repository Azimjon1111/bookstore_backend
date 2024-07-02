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
  constructor(private readonly AuthorsService: AuthorsService) { }

  @ApiBearerAuth()
  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto, @Req() req: Request) {
    console.log(createAuthorDto, 'CreateAuthorDto')
    return await this.AuthorsService.create(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.AuthorsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.AuthorsService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.AuthorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.AuthorsService.remove(id);
  }
}
