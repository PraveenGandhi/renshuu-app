import { RadicalsService } from './../../services/radicals-service';
import { KanjiService } from './../../services/kanji-service';
import { KanjiGroupsService } from './../../services/kanji-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { BaseEditVM } from '../base/base-edit';

@autoinject()
export class KanjiEdit extends BaseEditVM{
  
  groups:any;
  radicals:any;
  constructor(private kanjiGroupsService:KanjiGroupsService, private radicalsService:RadicalsService, kanjiService: KanjiService, router: Router, appState:AppState) {
    super('kanji',kanjiService,router,appState);
  }

  async activate(params: any) {
    this.promises = [this.mainService.get(params.id).then((d)=>{
      this.entity = d;
      this.mainService.editItem=this.entity.name;
      this.appState.loadingMessage='';
    }),
    this.kanjiGroupsService.find({}).then((d)=>{
      this.groups = d;
      this.appState.loadingMessage='';
    }),
    this.radicalsService.find({}).then((d)=>{
      this.radicals = d;
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