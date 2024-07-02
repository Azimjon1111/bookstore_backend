import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsMongoId, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'First name of the author',
    example: 'John',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    description: 'Last name of the author',
    example: 'Doe',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    description: 'Date of birth of the author',
    example: '1950-01-01',
    type: String,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date_of_birth: Date;

  @ApiProperty({
    description: 'Date of death of the author',
    example: '2000-01-01',
    type: String,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date_of_death: Date;

  @ApiProperty({
    description: 'ID of the books authored',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsMongoId()
  @IsOptional()
  books: string;

  @ApiProperty({
    description: 'Photo of the author',
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  photo: number;

  @ApiProperty({
    description: 'URL of the cover image of the author',
    example: 'http://example.com/photo.jpg',
  })
  @IsString()
  @IsOptional()
  cover: string;
}