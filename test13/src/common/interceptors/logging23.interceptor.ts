import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class GrpcLogging23Interceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        
        const rpcContext = context.switchToRpc();   // 1. Switch context to RPC
        const metadata: Metadata = rpcContext.getContext();         // 2. Extract the gRPC Metadata
        const correlationId = metadata.get('correlation-id')[0] || 'N/A';  // 3. Retrieve the correlation ID 
        const method = context.getHandler().name;                      // 3a. (gRPC metadata keys are always lowercase)
        console.log(`[gRPC Request] Method23: ${method} | CorrelationID23: ${correlationId}`);

        return next.handle();
    }
}