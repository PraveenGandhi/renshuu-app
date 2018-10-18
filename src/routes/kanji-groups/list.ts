import { KanjiGroupsService } from './../../services/kanji-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BaseListVM } from '../base/base-list';

@autoinject()
export class List extends BaseListVM{
  
  constructor(kanjiGroupsService:KanjiGroupsService, ea:EventAggregator, appState:AppState){
    super('Kanji Groups', kanjiGroupsService,ea,appState)
  }
}
