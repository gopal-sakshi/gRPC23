const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const metaAuth23 = new grpc.Metadata();
metaAuth23.add('authorization', 'subbaraoToken23');     // change this to apparao -- it fails

const packageDefinition = protoLoader.loadSync('hello.proto', {});
const helloProto = grpc.loadPackageDefinition(packageDefinition);

const sportsDef = protoLoader.loadSync('footballer23.proto', {});
const sportsProto = grpc.loadPackageDefinition(sportsDef).sportsPackage;


const myPackage = helloProto.todoPackage;

function main() {
    // Create separate clients for each service
    const greeterClient = new myPackage.Greeter('localhost:50051', grpc.credentials.createInsecure());
    const todoClient = new myPackage.TodoService('localhost:50051', grpc.credentials.createInsecure());
    const footballClient = new sportsProto.FootballService('localhost:50051', grpc.credentials.createInsecure());


    greeterClient.sayHello({ name: 'World' }, metaAuth23, (err, response) => {
        if (err) return console.error(err);
        console.log('Greeting:', response.message);
    });

    greeterClient.sayGoodbye({ peru23: 'Gopal' }, (err, response) => {
        if (err) return console.error(err);
        console.log('Farewell:', JSON.stringify(response));
    });

    todoClient.getTodo({ id: 1 }, (err, response) => {
        if (err) return console.error(err);
        console.log("Received from server:", response.task);
    });


    const call = footballClient.getFootballers({ league_name: "Global" });

    call.on('data', (player) => {
        console.log(`Received: ${player.name} (${player.team})`);
    });

    call.on('end', () => {
        console.log('Finished receiving footballers.');
    });

    call.on('error', (e) => console.error(e));

}

main();
