import { IsString, IsInt, Min, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAnimalDto {
  @ApiProperty({ example: 'Simba', description: 'Imię zwierzęcia' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1, description: 'ID gatunku' })
  @IsInt()
  @Min(1)
  speciesId: number;

  @ApiProperty({ example: '2023-05-15', description: 'Data przybycia (YYYY-MM-DD)' })
  @IsDateString()
  dateOfArrival: string;

  @ApiProperty({ example: 1, minimum: 1, description: 'Numer wybiegu' })
  @IsInt()
  @Min(1)
  enclosureNumber: number;

  @ApiProperty({ 
    enum: ['ok', 'observation', 'treatment'],
    description: 'Status zdrowia'
  })
  @IsEnum(['ok', 'observation', 'treatment'])
  healthStatus: string;
}