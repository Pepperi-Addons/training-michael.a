import { PapiClient, InstalledAddon } from '@pepperi-addons/papi-sdk'
import { Client } from '@pepperi-addons/debug-server';
import { request } from 'http';
import {v4 as uuid} from 'uuid';

export class MyService {

    papiClient: PapiClient;
    addonUUID: string;
    private client: Client


    constructor(client: Client) {
        this.client = client;
        this.addonUUID = client.AddonUUID;
        this.papiClient = new PapiClient({
            baseURL: client.BaseURL,
            token: client.OAuthAccessToken,
            addonUUID: this.addonUUID,
            actionUUID: client['ActionUUID']
        });
    }

    getTodos(options){
        return this.papiClient.addons.data.uuid(this.addonUUID).table('todos').find(options);
    }

    upsertTodo(body){
        if(body.Key){
            return this.editTodo(body);
        }
        else{
            return this.createTodo(body);
        }
    }

    createTodo(body){
        //TODO  we should also validate there are no garbage fields, How?
        if(body.Name && body.Description){
            let myKeys = ['Name','DueDate','Description','Completed'];
            let bodyKeys = body.keys();
            let isValid = (arr,target) => target.every(v=> arr.includes(v));
            if(!isValid(myKeys,bodyKeys))
                throw new Error("Some field are illigal");
            //TODO test whether or not passing a body without Completed field works as expected.
            body.Key = uuid();
            return this.papiClient.addons.data.uuid(this.addonUUID).table('todos').upsert(body);
        } else{
            throw new Error('Name and Description')
        }
    }

    editTodo(body){
        if(body.Key){
            return this.papiClient.addons.data.uuid(this.addonUUID).table('todos').upsert(body);
        }
    }
    
}

export default MyService;