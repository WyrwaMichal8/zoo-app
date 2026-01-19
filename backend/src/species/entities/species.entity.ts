import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Animal } from '../../animals/entities/animal.entity';


@Entity('species')
export class Species {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ length: 255 })
  name: string;


  @Column({ name: 'scientific_name', length: 255 })
  scientificName: string;


  @Column({ name: 'average_lifespan_years', type: 'int' })
  averageLifespanYears: number;


  @Column({ type: 'enum', enum: ['ssak', 'ptak', 'gad', 'plaz', 'ryba'] })
  category: string;


  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;


  @OneToMany(() => Animal, animal => animal.species)
  animals: Animal[];
}
