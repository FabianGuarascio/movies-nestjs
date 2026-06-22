import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: { port: 3001 },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'movies-nestjs-consumer',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'movies-consumer',
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
