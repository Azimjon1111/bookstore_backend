import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsMongoId, IsDate, IsArray, IsDefined, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'First name of the author',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'Last name of the author',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'Date of birth of the author',
    example: '1970-01-01',
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date_of_birth: Date;

  @ApiProperty({
    description: 'Date of death of the author',
    example: '2020-01-01',
    required: false,
  })
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  date_of_death?: Date;

  @ApiProperty({
    description: 'Photo URL of the author',
    example: 'http://example.com/photo.jpg',
  })
  @IsString()
  @IsNotEmpty()
  photo: string;
}
