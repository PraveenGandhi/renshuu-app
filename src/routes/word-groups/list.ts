import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@autoinject()
export class List {
  isLoading=false;
  response :any;
  subscriber:Subscription;
  constructor(private wordGroupsService:WordGroupsService, private ea:EventAggregator, public appState:AppState){}
  
  async activate() {
    this.appState.loading=true;
    this.appState.message = "Loading Word Groups..!"
    this.wordGroupsService.onCreated(word=>{
      this.response.data.push(word);
    });
    return this.wordGroupsService.find({}).then((d)=>{
      this.response = d;
      this.appState.loading=false;
    });
  }
  attached(){
    this.subscriber = this.ea.subscribe('sortingChanged', data => {
      this.isLoading=true;
      this.wordGroupsService.find({query: {$sort: data}}).then((d)=>{
        this.response = d;
        this.isLoading=false;
      });
    });
  }

  deactivate() {
    this.subscriber.dispose();
  }
}
