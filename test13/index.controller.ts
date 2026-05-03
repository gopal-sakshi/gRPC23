import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetRequest, GetResponse } from './generated/index';

@Controller()
export class IndexController {
  
  // First arg is the Service name, second is the Method name (from .proto)
  @GrpcMethod('IndexService', 'GetData')
  getData(data: GetRequest): GetResponse {
    console.log('Received gRPC request for ID:', data.id);

    // Mocking a response
    return {
      id: data.id,
      name: 'Interstellar',
      description: 'A masterpiece by Christopher Nolan.',
    };
  }
}