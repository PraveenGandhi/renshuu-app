import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from './../../services/app-state';
import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";
import { BaseCreateVM } from '../base/base-create';

@autoinject()
export class Create extends BaseCreateVM{
  groups:any;
  constructor(private wordGroupsService:WordGroupsService, wordsService:WordsService, appState:AppState){
    super(wordsService,appState);
  }
  async activate(){
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
