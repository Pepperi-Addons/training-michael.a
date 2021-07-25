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

   //add here delete function 

   async delete(keys){
     
    
    return await this.addonService.pepPost('delete_todos',{'arr':keys});
   }

   async markAsDone(keys){
     return await this.addonService.pepPost('mark_as_done', {'arr': keys});
   }
  //  async deleteTodo(objs){ 

  //   //here you need to call to delete that recived array of uuids. use await
    
  //   debugger
  //   let uidArr = objs.map((obj) => {
  //     return obj.UID;
  //   });
  //   return  await this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').delete(undefined,uidArr);
    // objs.forEach(obj => {
    //    this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').post(undefined,obj).then(); 
    //  });
    
     
  //  }

  //  async markTodo(objs){ 
  //   objs.forEach(obj => {
  //      this.addonService.papiClient.addons.api.uuid(this.addonService.addonUUID).file('api').func('todos').post(undefined,obj).then(); 
  //    });
    
     
  //  }




   
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
