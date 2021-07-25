import { PapiClient, InstalledAddon } from '@pepperi-addons/papi-sdk';
import { Client } from '@pepperi-addons/debug-server';
import {v4 as uuid} from 'uuid';
import { request } from 'http';

const TABLE_NAME = 'Todos';

export class MyService {

    papiClient: PapiClient;
    addonUUID: string;
  
    constructor(private client: Client) {
      this.addonUUID = client.AddonUUID;
      this.papiClient = new PapiClient( {
          baseURL: client.BaseURL,
          token: client.OAuthAccessToken,
          addonUUID: this.addonUUID,
          addonSecretKey: client.AddonSecretKey,
          actionUUID: client['ActionUUID']
      });
    }


    getTodos(options){
        return this.papiClient.addons.data.uuid(this.addonUUID).table('Todos').find(options);
    }
    
    async deleteTodo(arr: string[]){
        
        return await Promise.all(
            arr.map(async (key) => {
                return  await this.papiClient.addons.data.uuid(this.addonUUID).table('Todos').upsert({'Key': key, 'Hidden': true});
            }));
        }

    async markTodo(arr: string[]) {
        return await arr.map(async (key) => {
            return await this.papiClient.addons.data.uuid(this.addonUUID).table('Todos').upsert({'Key': key, 'Completed' : true});
        })
        
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
            let bodyKeys = Object.keys(body);
            let isValid = (arr,target) => target.every(v=> arr.includes(v));
            if(!isValid(myKeys,bodyKeys))
                throw new Error("Some field are illigal");
            //TODO test whether or not passing a body without Completed field works as expected.
            body.Key = uuid();
            return this.papiClient.addons.data.uuid(this.addonUUID).table('Todos').upsert(body);
        } else{
            throw new Error('Name and Description')
        }
    }

    editTodo(body){
        if(body.Key){
            return this.papiClient.addons.data.uuid(this.addonUUID).table('Todos').upsert(body);
        }
    }





    doSomething() {
        console.log("doesn't really do anything....");
    }

    getAddons(): Promise<InstalledAddon[]> {
        return this.papiClient.addons.installedAddons.find({});
    }
}

export default MyService;