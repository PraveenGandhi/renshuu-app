import { RadicalsService } from './../../services/radicals-service';
import { AppState } from '../../services/app-state';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { BaseEditVM } from '../base/base-edit';

@autoinject()
export class Edit extends BaseEditVM{
  constructor(radicalsService: RadicalsService, router: Router, appState:AppState) {
    super('radical', radicalsService,router,appState);
  }
}