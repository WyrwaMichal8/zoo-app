import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAnimalDto {
  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({ default: 0, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @ApiPropertyOptional({ description: 'Wyszukaj po imieniu' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: ['ok', 'observation', 'treatment'] })
  @IsOptional()
  @IsString()
  healthStatus?: string;

  @ApiPropertyOptional({ description: 'Filtruj po ID gatunku' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  speciesId?: number;
}