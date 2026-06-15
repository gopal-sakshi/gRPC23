`4 Types of gRPC Communication`

Unary                   : Client sends 1 request, Server sends 1 response.
Server Streaming        : Client sends 1 request, Server sends a stream of many responses (a "Get list of footballers").
Client Streaming        : Client sends a stream of messages, Server sends 1 response (uploading a large file in chunks).
Bidirectional Streaming : Both send streams simultaneously (a Chat App)

<!-- ************************************************************************************ -->


`clientStreaming`
- cd test12
- node statsServer.js 
- node statsClient.js  


`nestJS`
- cd test13
- npm run start:dev
- APIs
    general23 -- GetData, GetFootballer23
    sports23 --- GetChessPlayers
    stream23 --- StreamFootballerLive, UploadMatchStats, LiveMatchChat
- hit the APIs from postman

<!-- ************************************************************************************ -->