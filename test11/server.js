const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('hello.proto', {});
const sportsDef = protoLoader.loadSync('footballer23.proto', {});

const helloProto = grpc.loadPackageDefinition(packageDefinition);
const sportsProto = grpc.loadPackageDefinition(sportsDef).sportsPackage;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function getFootballers23(call) {
    const players = [
        { name: "Lionel Messi", team: "Inter Miami", age: 36 },
        { name: "Cristiano Ronaldo", team: "Al Nassr", age: 39 },
        { name: "Erling Haaland", team: "Man City", age: 23 }
    ];

    console.log(`Streaming players for league: ${JSON.stringify(call.request)}`);        // camel-case conversion happens

    for (const player of players) {
        await sleep(1000);
        if (call.cancelled) {
            console.log("Client disconnected, stopping stream.");
            return;
        }
        console.log(`Sending: ${player.name}`);
        call.write(player); 
    }

    call.end(); 
}


function sayHello(call, callback) {
    callback(null, { message: `Hello, ${call.request.name}!` });
}

function byeCheppuko(call, callback) {
    callback(null, { resp23: `Goodbye, ${call.request.peru23}!`, time23: new Date().toISOString() });
}

function getTodoFn(call, callback) {
    const todoId = call.request.id;
    callback(null, { id: todoId, task: "Buy groceries" });
}

function main() {
    const server = new grpc.Server();

    const myPackage = helloProto.todoPackage; // Access the package first
    server.addService(myPackage.Greeter.service, { 
        sayHello: sayHello,
        sayGoodbye: byeCheppuko 
    });
    server.addService(myPackage.TodoService.service, { GetTodo: getTodoFn }); 

    server.addService(sportsProto.FootballService.service, {
        getFootballers: getFootballers23
    });

    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) return console.error(err);
        console.log(`Server running at http://0.0.0:${port}`);
        server.start();
    });
}

main();
