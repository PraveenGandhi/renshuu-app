import { WordsService } from './../../services/words-service';
import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class View {
  word: any;
  words:any;
  constructor(private wordGroupsService: WordGroupsService, 
    private wordsService:WordsService, private router: Router, public appState:AppState) {}

  async activate(params: any) {
    this.appState.loading=true;
    this.appState.message = "Loading word details..!"
    return this.wordGroupsService.find({query: {_id:params.id}}).then((d)=>{
      this.word = d.data[0];
      return this.word;
    }).then((w)=>{
      this.wordsService.find({query: {groups:[w._id]}}).then((d)=>{
        this.words = d;
        this.appState.loading=false;
        return this.word;
      })
    });
  }

  delete(){
    if(!confirm('Are you sure?'))return;
    this.wordGroupsService.delete(this.word._id).then((d)=>{
      this.router.navigate('');
    });
  }
}