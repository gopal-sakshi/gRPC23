const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync('player_stats.proto', { keepCase: true });
const statsProto = grpc.loadPackageDefinition(packageDef).statsPackage;

const client = new statsProto.StatsService('localhost:50052', grpc.credentials.createInsecure());

function main() {
    // 1. Initialize the call with a final callback
    const call = client.uploadStats((err, response) => {
        if (err) return console.error(err);
        console.log('--- Final Server Summary ---');
        console.log(response.report);
        console.log('Total Goals Scored:', response.total_goals);
    });

    const data = [
        { player_name: "Messi", goals_scored: 2 },
        { player_name: "Ronaldo", goals_scored: 1 },
        { player_name: "Haaland", goals_scored: 3 }
    ];

    // 2. Stream the data with delays
    let i = 0;
    const interval = setInterval(() => {
        if (i < data.length) {
            console.log(`Streaming: ${data[i].player_name}...`);
            call.write(data[i]);
            i++;
        } else {
            // 3. Close the stream
            call.end();
            clearInterval(interval);
        }
    }, 1000);
}

main();
