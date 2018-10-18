import { Router } from 'aurelia-router';
import { AppState } from './../../services/app-state';
import { RadicalsService } from "../../services/radicals-service";
import { autoinject } from "aurelia-framework";
import { BaseCreateVM } from '../base/base-create';

@autoinject()
export class Create extends BaseCreateVM{
  constructor(radicalsService:RadicalsService, router:Router, appState:AppState){
    super(radicalsService,router, appState)
  }
}
