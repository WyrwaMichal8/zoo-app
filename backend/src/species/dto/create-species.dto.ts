import { IsString, IsInt, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeciesDto {
  @ApiProperty({ example: 'Lew afrykański', description: 'Nazwa gatunku' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Panthera leo', description: 'Nazwa łacińska' })
  @IsString()
  scientificName: string;

  @ApiProperty({ example: 12, minimum: 1, description: 'Średnia długość życia w latach' })
  @IsInt()
  @Min(1)
  averageLifespanYears: number;

  @ApiProperty({ 
    enum: ['ssak', 'ptak', 'gad', 'plaz', 'ryba'],
    description: 'Kategoria gatunku'
  })
  @IsEnum(['ssak', 'ptak', 'gad', 'plaz', 'ryba'])
  category: string;
}