import { Controller } from '@nestjs/common';
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable, Subject, from, of } from 'rxjs';
import { concatMap, delay, map } from 'rxjs/operators';
import {
    GetFootballerReq23,
    GetFootballerResp23,
    StatPayload,
    UploadSummary,
    ChatMessage
} from '../../../generated/index';

@Controller()
export class Streaming23Controller {

    // 01 =========== SERVER STREAMING (One Request ---> Stream of Responses)
    @GrpcMethod('StreamService23', 'StreamFootballerLive')
    streamFootballerLive(data: GetFootballerReq23): Observable<GetFootballerResp23> {
        console.log('Server Stream started for Player ID:', data.id);

        const liveUpdates: GetFootballerResp23[] = [
            { id: data.id, playerName: 'Benzema', position: 'Warm-up' },
            { id: data.id, playerName: 'Benzema', position: 'Substituted In' },
            { id: data.id, playerName: 'Benzema', position: 'Scored Goal ⚽' },
        ];

        return from(liveUpdates).pipe(
            concatMap(update => of(update).pipe(delay(4000)))
        );
    }

    // 02 =================== CLIENT STREAMING (Stream of Requests -> One Response)
    @GrpcStreamMethod('StreamService23', 'UploadMatchStats')
    uploadMatchStats(requestStream: Observable<StatPayload>): Observable<UploadSummary> {
        const summarySubject = new Subject<UploadSummary>();
        const payloadCollector: StatPayload[] = []; // Array to store all received payloads
        let chunkCount = 0;

        console.log('Client Stream upload initiated...');

        requestStream.subscribe({
            next: (chunk) => {
                chunkCount++;
                console.log(`Received payload chunk #${chunkCount}:`, chunk);

                // Push the current chunk data into the collector array
                payloadCollector.push(chunk);
            },
            error: (err) => console.error('Stream error:', err),
            complete: () => {
                console.log('Client stream finished sending data.');

                // Send the final summary including the entire history of payloads
                summarySubject.next({
                    success: true,
                    totalChunksProcessed: chunkCount,
                    allPayloads: payloadCollector, // Return the whole collection
                });
                summarySubject.complete();
            },
        });

        return summarySubject.asObservable();
    }


    // 3 ===================== BIDIRECTIONAL STREAMING 
    // Stream of Requests <-> Stream of Responses ============ NOT WORKING
    @GrpcStreamMethod('StreamService23', 'LiveMatchChat')
    liveMatchChat(requestStream: Observable<any>, metadata:any): Observable<any> {
        console.log('Bidirectional chat session opened.');

        // Pipe incoming messages and transform/respond immediately
        return requestStream.pipe(
            map((incomingMessage: any) => {
                console.log('Raw incoming keys:', incomingMessage);
                console.log(`User said: ${JSON.stringify(incomingMessage)}`);

                // Echo back or process response stream
                return {
                    user: 'Server-Bot',
                    text: `Echoing back your message: "${incomingMessage.text}"`,
                    timestamp: new Date().toISOString(),
                };
            })
        );
    }
}
