import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Species } from '../../species/entities/species.entity';


@Entity('animal')
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ length: 255 })
  name: string;


  @Column({ name: 'species_id' })
  speciesId: number;


  @ManyToOne(() => Species, species => species. animals)
  @JoinColumn({ name: 'species_id' })
  species: Species;


  @Column({ name: 'date_of_arrival', type: 'date' })
  dateOfArrival:  Date;


  @Column({ name: 'enclosure_number', type: 'int' })
  enclosureNumber: number;


  @Column({ name: 'health_status', type: 'enum', enum: ['ok', 'observation', 'treatment'] })
  healthStatus: string;


  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
