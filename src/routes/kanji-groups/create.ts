import { AppState } from './../../services/app-state';
import { KanjiGroupsService } from "../../services/kanji-groups-service";
import { autoinject } from "aurelia-framework";
import { BaseCreateVM } from '../base/base-create';

@autoinject()
export class Create extends BaseCreateVM{
  constructor(kanjiGroupsService:KanjiGroupsService, appState:AppState){
    super(kanjiGroupsService,appState)
  }
}
