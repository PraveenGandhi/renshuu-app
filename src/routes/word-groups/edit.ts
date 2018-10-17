import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { BaseEditVM } from '../base/base-edit';

@autoinject()
export class Edit extends BaseEditVM{
  constructor(wordGroupsService: WordGroupsService, router: Router, appState:AppState) {
    super('group', wordGroupsService,router,appState);
  }
}