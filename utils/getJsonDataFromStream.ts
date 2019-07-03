import { IncomingMessage } from 'http';

export function getJsonDataFromStream<T>(request: IncomingMessage): Promise<T> {
    return  new Promise((resolve, reject) => {
        const chunks: any[] = [];
        request.on('data', chunk => chunks.push(chunk));

        request.on('end', () => {
            resolve(
                JSON.parse(
                    Buffer.concat(chunks).toString()
                )
            );
        });

        request.on('error', err => reject(err));
    });
}
