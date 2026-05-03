const grpc = require('@grpc/grpc-js');

function authInterceptor(handler) {
    return (call, callback) => {
        const token = call.metadata.get('authorization')[0];

        if (token === 'subbaraoToken23') {
            return handler(call, callback);
        } else {
            console.log('Unauthorized access attempt blocked.');
            return callback({
                code: grpc.status.UNAUTHENTICATED,
                details: "Invalid or missing token",
            });
        }
    };
}

module.exports = { authInterceptor };
