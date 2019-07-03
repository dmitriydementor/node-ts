import { Form, Part } from 'multiparty';
import { IncomingMessage, ServerResponse } from 'http';
import { Stream } from 'stream';
import { writeFile } from 'fs';

export function parseForm(request: IncomingMessage, res: ServerResponse) {
    const form = new Form();
    form.parse(request);

    const fields = new Map();
    let fileBuffer: Buffer;
    let filename: string;

    form.on('part', async (part: Part) => {
        if (!part.filename) {
            await handleFieldPart(part, fields);
            part.resume();
        }
        if (part.filename) {
            filename = part.filename;
            fileBuffer = await getDataFromStream(part);
        }
    });

    form.on('close', () => {
        handleWriting(fields, fileBuffer, filename);
        res.statusCode = 200;
        res.end('Success');
    });
}

async function handleFieldPart(part: Part, fields: Map<string, any>) {
    return getDataFromStream(part).then(value => fields.set(part.name, value.toString()));
}

function getDataFromStream(stream: Stream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => {
            resolve(
                Buffer.concat(chunks)
            );
        });
    });
}

function handleWriting(fields: Map<string, any>, fileBuffer: Buffer, filename: string) {
    const fileNameToWrite = `uploads/${fields.get('firstName')}-${fields.get('lastName')}-${filename}`;
    writeFile(fileNameToWrite, fileBuffer, () => {
        console.log(`File ${fileNameToWrite} was written`);
    });
}
