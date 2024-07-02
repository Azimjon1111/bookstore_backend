import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './books.service';
import { CreateBookDto, CreateBookWithCoverDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiBearerAuth()
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Req() req: Request) {
    console.log(createBookDto, 'CreateBookDto');
    return await this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }
  @Get('top-10')
  findTop10Books() {
    return this.booksService.findTop10Books();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.booksService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
  @Post(':id/rate')
  @ApiBody({
    description: 'Rate a book',
    schema: {
      properties: {
        rating: { type: 'number', example: 4.5 },
      },
    },
  })
  async rateBook(@Param('id') id: string, @Body('rating') rating: number) {
    return this.booksService.rateBook(id, rating);
  }
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create book with cover image',
    type: CreateBookWithCoverDto,
  })
  @UseInterceptors(
    FileInterceptor('cover', {
      storage: diskStorage({
        destination: './src/uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          console.log(filename, 'filename');
          callback(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBookWithCoverDto: CreateBookWithCoverDto,
  ) {
    console.log(file, 'file');
    console.log(createBookWithCoverDto, 'createBookWithCoverDto');
    return this.booksService.createWithCover(createBookWithCoverDto, file.filename);
  }
}
