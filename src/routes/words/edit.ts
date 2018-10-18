import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from '../../services/app-state';
import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { BaseEditVM } from '../base/base-edit';

@autoinject()
export class Edit extends BaseEditVM{
  
  groups:any;
  constructor(private wordGroupsService:WordGroupsService, wordsService: WordsService, router: Router, appState:AppState) {
    super('word',wordsService,router,appState);
  }

  async activate(params: any) {
    this.promises = [this.mainService.get(params.id).then((d)=>{
      this.entity = d;
      this.mainService.editItem=this.entity.name;
      this.appState.loadingMessage='';
    }),
    this.wordGroupsService.find({}).then((d)=>{
      this.groups = d;
      this.appState.loadingMessage='';
    })];
    this.promisesAdded=true;
    return super.activate(params);
  }

  public submit(){
    for (let g of this.entity.groups){
      this.entity[g] = 1;
    }
    super.submit();
  }
}