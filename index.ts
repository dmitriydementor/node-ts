import * as FormData from 'form-data';
import { request } from 'http';
import { createReadStream } from 'fs';

const readStream = createReadStream('./picture.png');

const form = new FormData();
form.append('file', readStream);
form.append('firstName', 'Dmitriy');
form.append('lastName', 'Koshevets');

console.log(form.getHeaders());

const req = request({
    host: 'localhost',
    path: '/upload',
    port: 5000,
    method: 'POST',
    headers: form.getHeaders(),
}, response => {
    console.log(response.statusCode);
});

form.pipe(req);
