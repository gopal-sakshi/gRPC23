import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { chessPlayersReq11, chessPlayersResp11, GetFootballerReq23, GetFootballerResp23, GetRequest, GetResponse } from '../../../generated/index';

@Controller()
export class SportsService23Controller {

    @GrpcMethod('index.SportsService23', 'GetChessPlayers')
    getChessPlayer23_edoPeruIchuko(data: chessPlayersReq11): chessPlayersResp11 {
        console.log('Received gRPC request :', data);
        return {
            success23: true,
            data11: [
                { name22: 'vishyAnand', country22: 'India', is_active: false }
            ]
        };
    }

}