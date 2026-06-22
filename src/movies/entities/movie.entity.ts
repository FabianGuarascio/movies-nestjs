import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 'unknown' })
  title: string = 'unknown';

  @Column()
  genre!: string;

  @Column({ nullable: true })
  year?: number;

  @Column('decimal', { precision: 3, scale: 1 })
  rating!: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  averageRating: number = 0;

  @Column({ default: 0 })
  ratingCount: number = 0;
}
