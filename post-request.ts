import { request } from 'http';

const req = request({
    host: 'localhost',
    port: 5000,
    path: '/api/posts',
    headers: {
        'Content-Type': 'application/json'
    }
}, response => {
    console.log(response.statusCode);
});

req.write(JSON.stringify({
    author: 'Joan K Rouling',
    title: 'Harry Potter',
    content: 'Test',
}));

req.end();
