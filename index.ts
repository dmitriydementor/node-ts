import { createServer, IncomingMessage, ServerResponse } from 'http';
import { createWriteStream } from 'fs';

import { getJsonDataFromStream } from './utils/getJsonDataFromStream';
import { parseForm } from './utils/parseForm';

const PORT = process.env.PORT || 5000;

const posts = [{
    title: 'Lorem ipsum',
    content: 'Dolor sit amet',
}];

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');

    switch (req.url) {
        case '/info': {
            res.end(JSON.stringify(process.env));
            break;
        }
        case '/posts': {
            if (req.method === 'GET') {
                res.end(JSON.stringify(posts));
            } else if (req.method === 'POST') {
                getJsonDataFromStream<{ title: string; content: string}>(req).then(post => {
                    (post as any).createdAt = new Date();
                    posts.push(post);
                    res.end(JSON.stringify(post));
                });
            }
            break;
        }
        case '/upload': {
            if (req.method === 'POST') {
                parseForm(req, res);
            }
            break;
        }
        default: {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    }





});

server.listen(PORT, (error: any) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening on port ${PORT}`);
    }
});
