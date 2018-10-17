import { Subscription, EventAggregator } from 'aurelia-event-aggregator';
import { WordsService } from './../../services/words-service';
import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class View {
  group: any;
  words:any;
  isLoading=false;
  subscriber:Subscription;
  constructor(private wordGroupsService: WordGroupsService, 
    private wordsService:WordsService, private ea:EventAggregator, private router: Router, public appState:AppState) {}

  async activate(params: any) {
    this.appState.loading=true;
    this.appState.message = "Loading group details..!"
    return this.wordGroupsService.find({query: {_id:params.id}}).then((d)=>{
      this.group = d.data[0];
      return this.group;
    }).then((w)=>{
      let query = {};
      query[w._id]=1;
      return this.wordsService.find({query}).then((d)=>{
        this.words = d;
        this.appState.loading=false;
        return this.words;
      })
    });
  }

  attached(){
    this.subscriber = this.ea.subscribe('sortingChanged', data => {
      this.isLoading=true;
      let query = {};
      query[this.group._id]=1;
      query['$sort']= data;
      this.wordsService.find({query}).then((d)=>{
        this.words = d;
        this.isLoading=false;
      });
    });
  }

  delete(){
    if(!confirm('Are you sure?'))return;
    this.wordGroupsService.delete(this.group._id).then((d)=>{
      this.router.navigate('');
    });
  }
}