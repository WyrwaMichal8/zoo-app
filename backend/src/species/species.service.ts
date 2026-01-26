import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Species } from './entities/species.entity';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { QuerySpeciesDto } from './dto/query-species.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) {}

  async findAll(query: QuerySpeciesDto) {
    const { limit = 10, offset = 0, search, category } = query;

    const where: any = {};
    if (search) {
      where.name = Like(`%${search}%`);
    }
    if (category) {
      where.category = category;
    }

    const [data, total] = await this.speciesRepository.findAndCount({
      where,
      take: limit,
      skip: offset,
      order: { id: 'ASC' },
    });

    return {
      data,
      meta: {
        total,
        limit,
        offset,
        count: data.length,
      },
    };
  }

  async findOne(id: number) {
    const species = await this.speciesRepository.findOne({
      where: { id },
      relations: ['animals'],
    });
    if (!species) {
      throw new NotFoundException(`Species with ID ${id} not found`);
    }
    return { data: species };
  }

  async create(createSpeciesDto: CreateSpeciesDto) {
    const species = this.speciesRepository.create(createSpeciesDto);
    await this.speciesRepository.save(species);
    return { data: species };
  }

  async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    await this.findOne(id); // Sprawdź czy istnieje
    await this.speciesRepository.update(id, updateSpeciesDto);
    const updated = await this.findOne(id);
    return updated;
  }

  async remove(id: number) {
    const species = await this.findOne(id);
    await this.speciesRepository.remove(species.data);
    return { message: 'Species deleted successfully' };
  }


async getSpeciesAnimals(id: number) {
  const species = await this.speciesRepository.findOne({
    where: { id },
    relations: ['animals'],
  });
  
  if (!species) {
    throw new NotFoundException(`Species with ID ${id} not found`);
  }

  return {
    data: {
      species: {
        id: species.id,
        name: species.name,
        scientificName: species.scientificName,
      },
      animals: species.animals,
    },
  };
}

}