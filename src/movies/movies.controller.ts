import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller()
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @MessagePattern('movies.create')
  create(@Payload() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @MessagePattern('movies.findAll')
  findAll() {
    return this.moviesService.findAll();
  }

  @MessagePattern('movies.findOne')
  findOne(@Payload() id: number) {
    return this.moviesService.findOne(id);
  }

  @MessagePattern('movies.update')
  update(@Payload() payload: { id: number; updateMovieDto: UpdateMovieDto }) {
    return this.moviesService.update(payload.id, payload.updateMovieDto);
  }

  @MessagePattern('movies.remove')
  remove(@Payload() id: number) {
    return this.moviesService.remove(id);
  }

  @EventPattern('rating.added')
  handleRatingAdded(@Payload() data: { movieId: number; score: number }) {
    return this.moviesService.updateAverageRating(data.movieId, data.score);
  }
}
