import { RadicalsService } from './../../services/radicals-service';
import { AppState } from '../../services/app-state';
import { autoinject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { BaseListVM } from '../base/base-list';

@autoinject()
export class List extends BaseListVM{
  
  constructor(radicalsService:RadicalsService, ea:EventAggregator, appState:AppState){
    super('Radicals', radicalsService,ea,appState)
  }
}
