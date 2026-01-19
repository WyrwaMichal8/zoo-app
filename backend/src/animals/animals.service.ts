import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Animal } from './entities/animal.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal)
    private repo:Repository<Animal>,
  ) {}

  findAll(healthStatus?:string) {
    const query = this.repo.createQueryBuilder('a').leftJoinAndSelect('a.species', 'species');
    if (healthStatus) query.where('a.health_status = :healthStatus', { healthStatus });
    return query.getMany();
  }

  findOne(id:number) {
    return this.repo.findOne({ where:{ id }, relations:['species'] });
  }

  findBySpecies(speciesId:number) {
    return this.repo.find({ where:{ speciesId }, relations:['species'] });
  }

  create(data:Partial<Animal>) {
    return this.repo.save(data);
  }

  async update(id:number, data:Partial<Animal>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  remove(id:number) {
    return this.repo.delete(id);
  }
}