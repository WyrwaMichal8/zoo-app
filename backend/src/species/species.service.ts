import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Species } from './entities/species.entity';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private repo:Repository<Species>,
  ) {}

  findAll(category?:string) {
    const query = this.repo.createQueryBuilder('s');
    if (category) query.where('s.category = :category', { category });
    return query.getMany();
  }

  findOne(id:number) {
    return this.repo.findOne({ where:{ id }, relations:['animals'] });
  }

  create(data:Partial<Species>) {
    return this.repo.save(data);
  }

  async update(id:number, data:Partial<Species>) {
    await this.repo.update(id, data);
    return this.findOne(id);
  }

  remove(id:number) {
    return this.repo.delete(id);
  }
}