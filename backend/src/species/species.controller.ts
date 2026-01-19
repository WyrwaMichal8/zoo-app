import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';

@Controller('api/species')
export class SpeciesController {
  constructor(private service:SpeciesService) {}

  @Get()
  async findAll(@Query('category') category?:string) {
    const data = await this.service.findAll(category);
    return { data };
  }

  @Get(':id')
  async findOne(@Param('id') id:string) {
    const data = await this.service.findOne(+id);
    return { data };
  }

  @Post()
  async create(@Body() body:any) {
    const data = await this.service.create(body);
    return { data };
  }

  @Put(':id')
  async update(@Param('id') id:string, @Body() body:any) {
    const data = await this.service.update(+id, body);
    return { data };
  }

  @Delete(':id')
  async remove(@Param('id') id:string) {
    await this.service.remove(+id);
    return { message:'Deleted' };
  }
}