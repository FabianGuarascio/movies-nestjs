import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesSeeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.moviesRepository.count();
    if (count > 0) return;

    await this.moviesRepository.save([
      {
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        year: 1994,
        rating: 9.3,
      },
      {
        title: 'The Godfather',
        genre: 'Crime',
        year: 1972,
        rating: 9.2,
      },
      {
        title: 'The Dark Knight',
        genre: 'Action',
        year: 2008,
        rating: 9.0,
      },
      {
        title: 'Pulp Fiction',
        genre: 'Crime',
        year: 1994,
        rating: 8.9,
      },
      {
        title: 'Forrest Gump',
        genre: 'Drama',
        year: 1994,
        rating: 8.8,
      },
    ]);
  }
}
