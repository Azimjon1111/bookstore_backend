import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsMongoId, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBookDto {
  @ApiProperty({
    description: 'Name of the book',
    example: 'The Great Gatsby',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'A novel written by American author F. Scott Fitzgerald.',
  })
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Published date of the book',
    example: '1925-04-10',
    type: String,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  published_date: Date;

  @ApiProperty({
    description: 'ID of the author of the book',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsMongoId()
  author: string;

  @ApiProperty({
    description: 'Rating of the book',
    example: 4.5,
  })
  @IsNumber()
  @IsOptional()
  rating: number;

  @ApiProperty({
    description: 'URL of the cover image of the book',
    example: 'http://example.com/cover.jpg',
  })
  @IsString()
  @IsOptional()
  cover: string;

  @ApiProperty({
    description: 'Genres of the book',
    example: ['Fiction', 'Drama'],
  })
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @ApiProperty({
    description: 'Tags associated with the book',
    example: ['classic', 'American literature'],
  })
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
