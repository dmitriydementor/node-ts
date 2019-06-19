import { createServer, IncomingMessage, ServerResponse } from 'http';

const PORT = process.env.PORT || 5000;

console.log(process.env);

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(process.env));
});

server.listen(PORT, (error: any) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening on port ${PORT}`);
    }
});
