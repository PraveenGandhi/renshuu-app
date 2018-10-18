import { Router } from 'aurelia-router';
import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from './../../services/app-state';
import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";
import { BaseCreateVM } from '../base/base-create';

@autoinject()
export class Create extends BaseCreateVM{
  groups:any;
  constructor(private wordGroupsService:WordGroupsService, wordsService:WordsService, router:Router, appState:AppState){
    super(wordsService,router,appState);
  }
  async activate(){
    this.entity= {};
    this.appState.loadingMessage = "Loading data..!"
    this.wordGroupsService.onCreated(word=>{
      this.groups.data.push(word);
    });
    return this.wordGroupsService.find({}).then((d)=>{
      this.groups = d;
      this.appState.loadingMessage='';
    });
  }
  public submit() {
    for (let g of this.entity.groups){
      this.entity[g] = 1;
    }
    super.submit();
  }
}
