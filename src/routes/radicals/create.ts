import { AppState } from './../../services/app-state';
import { RadicalsService } from "../../services/radicals-service";
import { autoinject } from "aurelia-framework";
import { BaseCreateVM } from '../base/base-create';

@autoinject()
export class Create extends BaseCreateVM{
  constructor(radicalsService:RadicalsService, appState:AppState){
    super(radicalsService,appState)
  }
}
