import { Injectable } from '@angular/core';
import {AddonService} from './addon.service'
@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor( private addonService: AddonService ) { 
  }
   get(options){
    return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').get(options);


   }
  async toDoSave(obj){
    return this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').post(undefined,obj);
   }
   async deleteTodo(objs){ 
    objs.forEach(obj => {
       this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').post(undefined,obj).then(); 
     });
    
     
   }

   async markTodo(objs){ 
    objs.forEach(obj => {
       this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').post(undefined,obj).then(); 
     });
    
     
   }




   
  getTodos() {
    return this.get({});
  }

  getTodo(key){
    return this.get({
      where: `Key = '${key}'` 
    }).then(objs =>{
      return objs[0]
    })
  };
}
