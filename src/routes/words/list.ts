import {WordsService} from '../../services/words-service';
import { autoinject } from 'aurelia-framework';
import { EventAggregator, Subscription } from 'aurelia-event-aggregator';

@autoinject()
export class List {

  words :any;
  subscriber:Subscription;
  constructor(private wordsService:WordsService, private ea:EventAggregator){}
  
  async activate() {
    this.wordsService.onCreated(word=>{
      console.log('word created');
      console.log(word);
      this.words.data.push(word);
    });
    return this.wordsService.find({}).then((d)=>{
      this.words = d;
      console.log(d);
    });
  }
  attached(){
    this.subscriber = this.ea.subscribe('sortingChanged', data => {
      this.wordsService.find({query: {$sort: data}}).then((d)=>{
        this.words = d;
      });
    });
  }

  deactivate() {
    this.subscriber.dispose();
  }
}
