import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewChild } from "@angular/core";
import { PepLayoutService, PepScreenSizeType } from '@pepperi-addons/ngx-lib';
import { AddonService } from '../../services/addon.service';
import { PepDialogData, PepDialogService } from '@pepperi-addons/ngx-lib/dialog';
import { GenericListComponent, GenericListDataSource } from '../generic-list/generic-list.component';
import { TodoForm } from '../form/todo-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { async } from 'rxjs';
import {TodosService} from '../../services/todos.service';


@Component({
  selector: 'addon-module',
  templateUrl: './addon.component.html',
  styleUrls: ['./addon.component.scss'],
  providers: [TranslatePipe]
})
export class AddonComponent implements OnInit {

    screenSize: PepScreenSizeType;
    @ViewChild(GenericListComponent) GenericList: GenericListComponent;
    constructor(
        public addonService: AddonService,
        public layoutService: PepLayoutService,
        public translate: TranslateService,
        public router: Router,
        public route: ActivatedRoute,
        public todosService: TodosService
    ) {

        this.layoutService.onResize$.subscribe(size => {
            this.screenSize = size;
        });

    }


    ngOnInit(){
    }

    listDataSource: GenericListDataSource = {
        getList: async (state) => {
            return this.todosService.getTodos();
        },
        
        getDataView: async () => {
            return {
                Context: {
                    Name: '',
                    Profile: { InternalID: 0 },
                    ScreenSize: 'Landscape'
                  },
                  Type: 'Grid',
                  Title: 'Todos',
                  Fields: [
                    {
                        FieldID: 'Name',
                        Type: 'TextBox',
                        Title: this.translate.instant('Name'),
                        Mandatory: false,
                        ReadOnly: true
                    },
                    {
                        FieldID: 'Description',
                        Type: 'TextBox',
                        Title: this.translate.instant('Description'),
                        Mandatory: false,
                        ReadOnly: true
                    },
                    {
                        FieldID: 'DueDate',
                        Type: 'DateAndTime',
                        Title: this.translate.instant('DueDate'),
                        Mandatory: false,
                        ReadOnly: true
                    },
                    {
                        FieldID: 'Completed',
                        Type: 'Boolean',
                        Title: this.translate.instant('Completed'),
                        Mandatory: false,
                        ReadOnly: true
                    }
         
                  ],
                  Columns: [
                    {
                      Width: 25
                    },
                    {
                        Width: 25
                      },
                      {
                        Width: 25
                      },
                      {
                        Width: 25
                      }
                  ],
                  FrozenColumnsCount: 0,
                  MinimumColumnWidth: 0
            }
        },

        getActions: async (objs) =>  {
            
            const res = [];

              debugger
            if(objs.length === 1){
                //Edit
                res.push({
                    title: this.translate.instant("Edit"),
                    handler: async (objs) => {
                            this.router.navigate([objs[0].Key], {
                                relativeTo: this.route,
                                queryParamsHandling: 'merge'
                        });
                        }

                },
                );
            }

            if(objs.length >= 1){
                //Delete
                res.push({
                    title: this.translate.instant("Delete"),
                    handler: async (objs) => {
                        objs.forEach(obj => {
                            obj.Hidden = true;   
                        });
                        await this.todosService.deleteTodo(objs);
                        this.GenericList.reload();
                       
                        }});
                    

             

                res.push({
                    //Mark as done
                    title: this.translate.instant("Mark as done"),
                    handler: async (objs) => {
                        objs.forEach(obj => {
                            obj.Completed = true;   
                        });
                        await this.todosService.markTodo(objs);
                        this.GenericList.reload();
                        
                    }});

            
            }
            return res;
        },
        getAddHandler: async () => {
            return ()=> {
                return  this.router.navigate(["./AddItems"], {
                    relativeTo: this.route,
                    queryParamsHandling: 'merge'
            });
        }
    }

    }

 

        


 

        }
    
    
