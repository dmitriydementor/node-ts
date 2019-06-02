import { request, RequestOptions, IncomingHttpHeaders } from 'http';

export interface Response {
    data: object;
    headers: IncomingHttpHeaders;
}

export function performRequest(options: RequestOptions) {
    return new Promise((resolve, reject) => {
        request(
            options,
            function(response) {
                const { statusCode, headers } = response;
                if (statusCode >= 300) {
                    reject(
                        new Error(response.statusMessage)
                    )
                }
                const chunks: any[] = [];
                response.on('data', (chunk) => {
                    chunks.push(chunk);
                });
                response.on('end', () => {
                    const data = Buffer.concat(chunks).toString();
                    const result: Response = {
                        data: JSON.parse(data),
                        headers
                    };
                    resolve(result);
                });
            }
        )
            .end();
    })
}
