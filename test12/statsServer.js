const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('player_stats.proto', { keepCase: true });
const statsProto = grpc.loadPackageDefinition(packageDef).statsPackage;

function uploadStats(call, callback) {
    let totalGoals = 0;
    let players = [];

    call.on('data', (stat) => {
        console.log(`Received stats for: ${stat.player_name}`);
        totalGoals += stat.goals_scored;
        players.push(stat.player_name);
    });

    call.on('end', () => {
        callback(null, {
            report: `Processed stats for: ${players.join(', ')}`,
            total_goals: totalGoals
        });
    });
}

function main() {
    const server = new grpc.Server();
    server.addService(statsProto.StatsService.service, { uploadStats });
    server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.error(err);
        console.log(`Stats Server running at :${port}`);
        server.start();
    });
}
main();
