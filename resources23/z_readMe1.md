# gRPC
- instead of axios or https call -- client will directly call (or) invoke a procedure on the server.
- Instead of sending a "request" to a URL and hoping the JSON matches on both ends, 
    you are essentially calling/invoking a function that happens to live on another machine.



# why that’s a massive upgrade over Axios/REST:

`Type Safety (The "Contract")`
- With Axios, you can send { user_id: 1 } when the server expects { userId: "1" }, and you won't know it's broken until the code runs.
- In gRPC, the .proto file is a strict contract. 
- If the client tries to send the wrong data type, the code won't even compile (in TS) or will throw an immediate, clear error.

`Performance (Protobuf vs JSON)`
- JSON is text-based and bulky. To send it, your computer has to "serialize" it into a long string.
- gRPC uses Protocol Buffers (Protobuf), which is binary. It's much smaller and significantly faster to encode/decode. This reduces CPU usage and latency.

`Built on HTTP/2`
- Standard Axios calls usually use HTTP/1.1
- gRPC uses HTTP/2, which allows:
    Multiplexing    : Send many requests over a single connection at the same time (no "head-of-line blocking").
    Streaming       : You can have a "long-lived" connection where the server pushes data to the client without the client constantly asking "any new data?"

`Code Generation`
- You don't have to write the "glue" code. The proto-loader creates the client methods for you. 
- You get Autocompletion/IntelliSense in your IDE, so you can see exactly which methods (sayHello, getTodo) are available.

`Language Agnostic`
- You can write your Server in Go and your Client in Node.js. 
- Because they both share the same .proto file, they "speak" exactly the same language without any extra translation layers.

<!-- ********************************************************************************************************* -->
