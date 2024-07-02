import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorDto {
  @ApiProperty({
    description: 'First name of the author',
    example: 'John',
  })
  first_name: string;

  @ApiProperty({
    description: 'Last name of the author',
    example: 'Doe',
  })
  last_name: string;

  @ApiProperty({
    description: 'Date of birth of the author',
    example: '1970-01-01',
  })
  date_of_birth: Date;

  @ApiProperty({
    description: 'Date of death of the author',
    example: '2020-01-01',
    required: false,
  })
  date_of_death?: Date;

  @ApiProperty({
    description: 'Photo URL of the author',
    example: 'http://example.com/photo.jpg',
  })
  photo: string;
}
