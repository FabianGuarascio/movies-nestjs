import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesSeeder } from './movies.seeder';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'movies-nestjs-producer',
            brokers: (process.env.KAFKA_BROKERS ?? 'localhost:9092').split(','),
          },
        },
      },
    ]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesSeeder],
})
export class MoviesModule {}
