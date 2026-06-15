import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { GetFootballerReq23, GetFootballerResp23, GetRequest, GetResponse } from '../../../generated/index';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { status } from '@grpc/grpc-js';

@Controller()
export class IndexController {
  
  // First arg is the Service name, second is the Method name (from .proto)
  @GrpcMethod('IndexService', 'GetData')
  getData(data: GetRequest, metadata: Metadata, call: ServerUnaryCall<any, any>): GetResponse {
    
    if (data.id == 'phattu') {
        throw new RpcException({
            code: status.INVALID_ARGUMENT,
            message: 'id_invalid_aithe_biscuit_babaayi23',
        });
    }

    const token = metadata.get('authorization')[0]; 
    console.log('Received gRPC request for ID:', data.id, token, `${call.getPeer()}`);

    // Mocking a response
    return {
      id: data.id,
      name: 'Interstellar',
      description: `A masterpiece by Christopher Nolan --> ${token}, ${call.getPeer()}`,
    };
  }


  @GrpcMethod('IndexService', 'GetFootballer23')
  getFootballer23_edoPeruIchuko(data: GetFootballerReq23): GetFootballerResp23 {
    console.log('Received gRPC request for ID:', data.id);
    return {
      id: data.id,
      playerName: 'Karim Benzema',
      position: 'Striker',
    };
  }


}