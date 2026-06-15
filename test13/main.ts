import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { AppModule } from './app.module';


// SEE ================ nest23 repo --- gRPC service
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'index',
      loader: {
        keepCase: true, // Forces NestJS to preserve exact casing across boundaries
      },
      protoPath: path.join(__dirname, 'generated', 'index.proto'),
      url: '0.0.0.0:50051',
    },
  });

  await app.listen();
  console.log('gRPC Backend is running on port 50051');
}
bootstrap();