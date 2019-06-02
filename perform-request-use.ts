import { performRequest } from './utils/request';

performRequest(
    {
        host: 'jsonplaceholder.typicode.com',
        path: '/todos/1',
        method: 'GET',
    },
)
.then(response => {
    console.log(response);
})
.catch(error => {
    console.log(error);
});
