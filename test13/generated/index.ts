import { Observable } from 'rxjs';

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
    totalCount33?: number ;
}

export interface IndexServiceClient {
  getData(data: GetRequest): Observable<GetResponse>;
  getFootballer23(data:GetFootballerReq23) : Observable<GetFootballerResp23>;
}

export interface SportsService23 {
    getChessPlayers(data: chessPlayersReq11): Observable<chessPlayersResp11>;
}