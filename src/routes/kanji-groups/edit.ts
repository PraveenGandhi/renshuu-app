import { KanjiGroupsService } from './../../services/kanji-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { BaseEditVM } from '../base/base-edit';

@autoinject()
export class Edit extends BaseEditVM{
  constructor(kanjiGroupsService: KanjiGroupsService, router: Router, appState:AppState) {
    super('group', kanjiGroupsService,router,appState);
  }
}