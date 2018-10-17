import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BaseListVM } from '../base/base-list';

@autoinject()
export class List extends BaseListVM{
  
  constructor(wordGroupsService:WordGroupsService, ea:EventAggregator, appState:AppState){
    super('Word Groups', wordGroupsService,ea,appState)
  }
}
