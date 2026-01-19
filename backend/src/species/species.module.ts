import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';

@Module({
  imports:  [TypeOrmModule.forFeature([Species])],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}