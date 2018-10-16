import { AppState } from '../../services/app-state';
import {WordsService} from '../../services/words-service';
import { autoinject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@autoinject()
export class List {
  isLoading=false;
  words :any;
  subscriber:Subscription;
  constructor(private wordsService:WordsService, private ea:EventAggregator, public appState:AppState){}
  
  async activate() {
    this.appState.loading=true;
    this.appState.message = "Loading words..!"
    this.wordsService.onCreated(word=>{
      this.words.data.push(word);
    });
    return this.wordsService.find({}).then((d)=>{
      this.words = d;
      this.appState.loading=false;
    });
  }
  attached(){
    this.subscriber = this.ea.subscribe('sortingChanged', data => {
      this.isLoading=true;
      this.wordsService.find({query: {$sort: data}}).then((d)=>{
        this.words = d;
        this.isLoading=false;
      });
    });
  }

  deactivate() {
    this.subscriber.dispose();
  }
}
