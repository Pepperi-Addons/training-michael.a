import MyService from './todo.service'
import { Client, Request } from '@pepperi-addons/debug-server'

export async function todos(client: Client, request: Request) {
    const service = new MyService(client);
    if(request.method === 'POST'){
        return service.upsertTodo(request.body);

    }else if(request.method === 'GET'){
        return service.getTodos(request.query);

    }else{
         throw new Error(`Method ${request.method} is not supported.`);
    }
};

