import { Controller, Get, Post, Put, Delete, Body, Param, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { QuerySpeciesDto } from './dto/query-species.dto';

@ApiTags('species')
@Controller('api/species')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz listę gatunków z paginacją' })
  @ApiResponse({ status: 200, description: 'Lista gatunków' })
  findAll(@Query() query: QuerySpeciesDto) {
    return this.speciesService.findAll(query);
  }

  @Get(':id/animals')
  @ApiOperation({ summary: 'Pobierz zwierzęta danego gatunku' })
  async getSpeciesAnimals(@Param('id') id: string) {
    return this.speciesService.getSpeciesAnimals(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Dodaj nowy gatunek' })
  @ApiResponse({ status: 201, description: 'Gatunek utworzony' })
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Zaktualizuj gatunek' })
  update(@Param('id') id: string, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń gatunek' })
  remove(@Param('id') id: string) {
    return this.speciesService.remove(+id);
  }
}