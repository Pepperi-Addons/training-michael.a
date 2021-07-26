import MyService from './my.service'
import { Client, Request } from '@pepperi-addons/debug-server'
import { request } from 'http';

// add functions here

export async function delete_todos(client: Client,request: Request) {
    const service = new MyService(client);
    debugger
    return await service.deleteTodo(request.body['arr']);
}

export async function mark_as_done (client: Client, request: Request) {
    const service = new MyService(client);
    return await service.markTodo(request.body['arr']);
    
}
// this function will run on the 'api/foo' endpoint
// the real function is runnning on another typescript file
export async function todos(client: Client, request: Request) {
    
    const service = new MyService(client);
    if(request.method === 'POST'){
        return service.upsertTodo(request.body);

    }else if(request.method === 'GET'){
        return service.getTodos(request.query);
    }
    else{
         throw new Error(`Method ${request.method} is not supported.`);
    }
};

