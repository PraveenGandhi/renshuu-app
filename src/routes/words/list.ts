import { AppState } from '../../services/app-state';
import {WordsService} from '../../services/words-service';
import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BaseListVM } from '../base/base-list';

@autoinject()
export class List extends BaseListVM{
  constructor(wordsService:WordsService, ea:EventAggregator, appState:AppState){
    super('Words',wordsService,ea,appState);
  }
}
