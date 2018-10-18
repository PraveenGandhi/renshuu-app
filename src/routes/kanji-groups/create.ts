import { Router } from 'aurelia-router';
import { AppState } from './../../services/app-state';
import { KanjiGroupsService } from "../../services/kanji-groups-service";
import { autoinject } from "aurelia-framework";
import { BaseCreateVM } from '../base/base-create';

@autoinject()
export class Create extends BaseCreateVM{
  constructor(kanjiGroupsService:KanjiGroupsService, router:Router, appState:AppState){
    super(kanjiGroupsService, router, appState)
  }
}
