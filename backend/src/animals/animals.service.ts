import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Animal } from './entities/animal.entity';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { QueryAnimalDto } from './dto/query-animal.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private animalRepository: Repository<Animal>,
  ) {}

  async findAll(query: QueryAnimalDto) {
    const { limit = 10, offset = 0, search, healthStatus, speciesId } = query;

    const whereConditions: any = {};
    
    if (search) {
      whereConditions.name = Like(`%${search}%`);
    }
    if (healthStatus) {
      whereConditions.healthStatus = healthStatus;
    }
    if (speciesId) {
      whereConditions.speciesId = speciesId;
    }

    const [data, total] = await this.animalRepository.findAndCount({
      where: whereConditions,
      relations: ['species'],
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
    const animal = await this.animalRepository.findOne({
      where: { id },
      relations: ['species'],
    });
    
    if (!animal) {
      throw new NotFoundException(`Animal with ID ${id} not found`);
    }
    
    return { data: animal };
  }

  async create(createAnimalDto: CreateAnimalDto) {
    const animal = this.animalRepository.create(createAnimalDto);
    await this.animalRepository.save(animal);
    
    // Zwróć ze relacją species
    return this.findOne(animal.id);
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    await this.findOne(id); // Sprawdź czy istnieje
    await this.animalRepository.update(id, updateAnimalDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const animal = await this.findOne(id);
    await this.animalRepository.remove(animal.data);
    return { message: 'Animal deleted successfully' };
  }
}