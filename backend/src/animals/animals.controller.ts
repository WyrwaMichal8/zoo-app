import { Controller, Get, Post, Put, Delete, Body, Param, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { QueryAnimalDto } from './dto/query-animal.dto';

@ApiTags('animals')
@Controller('api/animals')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Get()
  @ApiOperation({ summary: 'Pobierz listę zwierząt z paginacją' })
  findAll(@Query() query: QueryAnimalDto) {
    return this.animalsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pobierz szczegóły zwierzęcia' })
  findOne(@Param('id') id: string) {
    return this.animalsService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Dodaj nowe zwierzę' })
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Zaktualizuj zwierzę' })
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(+id, updateAnimalDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Usuń zwierzę' })
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id);
  }
}