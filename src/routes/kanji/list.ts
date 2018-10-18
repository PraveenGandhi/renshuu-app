import { AppState } from '../../services/app-state';
import { KanjiService } from '../../services/kanji-service';
import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BaseListVM } from '../base/base-list';

@autoinject()
export class KanjiListVM extends BaseListVM{
  constructor(kanjiService:KanjiService, ea:EventAggregator, appState:AppState){
    super('Kanji',kanjiService,ea,appState);
  }
}
