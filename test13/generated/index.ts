import { Observable } from 'rxjs';

/********************************************** */

export interface GetRequest {
  id: string;
}

export interface GetResponse {
  id: string;
  name: string;
  description: string;
}

export interface GetFootballerReq23 {
    id: string;
}

export interface GetFootballerResp23 {
    id: string;
    playerName: string;
    position: string;
}
/**********************************************  */

export interface chessPlayersReq11 {
    desamu: string;
    limit11?: number;
}

export interface chessPlayer45Index {
    id?: string;
    name22: string;
    country22: string;
    is_active: boolean;
}

export interface chessPlayersResp11 {
    success23: boolean;
    data11: chessPlayer45Index[];
    totalCount33?: number;
}

/***************************************** */

export interface StatPayload {
    matchId: string;
    statType: string; // e.g., 'possession', 'fouls'
    value: number;
}

export interface UploadSummary {
    success: boolean;
    totalChunksProcessed: number;
    allPayloads: StatPayload[]; // Add this array type definition

}

export interface ChatMessage {
    user: string;
    text: string;
    timestamp: string;
}

/********************************************** */

export interface IndexServiceClient {
  getData(data: GetRequest): Observable<GetResponse>;
  getFootballer23(data:GetFootballerReq23) : Observable<GetFootballerResp23>;
}

export interface SportsService23 {
    getChessPlayers(data: chessPlayersReq11): Observable<chessPlayersResp11>;
}

export interface StreamService23 {
    streamFootballerLive(data: GetFootballerReq23): Observable<GetFootballerResp23>;
    uploadMatchStats(data: Observable<StatPayload>): Observable<UploadSummary>;
    liveMatchChat(data: Observable<ChatMessage>): Observable<ChatMessage>;
}
