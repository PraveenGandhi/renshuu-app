import { Router } from 'aurelia-router';
import { AppState } from './../../services/app-state';
import { WordGroupsService } from "../../services/word-groups-service";
import { autoinject } from "aurelia-framework";
import { BaseCreateVM } from '../base/base-create';

@autoinject()
export class Create extends BaseCreateVM{
  constructor(wordGroupsService:WordGroupsService, router:Router, appState:AppState){
    super(wordGroupsService,router,appState)
  }
}
