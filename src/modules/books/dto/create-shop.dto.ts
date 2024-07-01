import { ApiProperty } from '@nestjs/swagger';
export class CreateShopDto {
  @ApiProperty({
    description: `name`,
    example: "name",
  })
  name: string;
  
  @ApiProperty({
    description: `location`,
    example: 'location',
  })
  location: string;
}
