import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { chessPlayersReq11, chessPlayersResp11, GetFootballerReq23, GetFootballerResp23, GetRequest, GetResponse } from '../../../generated/index';

const chessPlayers = [
    { name22: 'vishyAnand', country22: 'India', is_active: false },
    { name22: 'magnus_carlsen', country22: 'Norway', is_active: true },
    { name22: 'jose raul capablanca', country22: 'Cuba', is_active: false },
    { name22: 'paul morphy', country22: 'USA', is_active: false },
    { name22: 'hikaru_nakamura', country22: 'USA', is_active: true },
    { name22: 'fabiano_caruano', country22: 'USA', is_active: true },
    { name22: 'gukesh dommaraju', country22: 'India', is_active: true },
    { name22: 'arjun erigaisi', country22: 'India', is_active: true },
    { name22: 'alireza_firouja', country22: 'France', is_active: true },
    { name22: 'rameshbabu_praggnanada', country22: 'India', is_active: true },
    { name22: 'ding liren', country22: 'China', is_active: true },
    { name22: 'wei yi', country22: 'China', is_active: true },
]

@Controller()
export class SportsService23Controller {

    @GrpcMethod('SportsService23', 'GetChessPlayers')
    getChessPlayer23_edoPeruIchuko(data: chessPlayersReq11): chessPlayersResp11 {
        console.log('Received gRPC request :', data);
        return {
            success23: true,
            data11: chessPlayers.filter(player => player.country22 == data.desamu)
        };
    }

}