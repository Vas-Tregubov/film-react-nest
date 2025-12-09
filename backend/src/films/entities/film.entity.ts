import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  rating: number;

  @Column({ type: 'text' })
  director: string;

  @Column({ type: 'jsonb', default: [] })
  tags: string[];

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  cover: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  about: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Schedule, (schedules) => schedules.film, {
    cascade: ['insert', 'update'],
  })
  schedules: Schedule[];
}
