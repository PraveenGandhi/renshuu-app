import { Router } from 'aurelia-router';
import { RadicalsService } from './../../services/radicals-service';
import { KanjiService } from './../../services/kanji-service';
import { KanjiGroupsService } from './../../services/kanji-groups-service';
import { AppState } from './../../services/app-state';
import { autoinject } from "aurelia-framework";
import { BaseCreateVM } from '../base/base-create';

@autoinject()
export class KanjiCreate extends BaseCreateVM{
  groups:any;
  radicals:any;
  constructor(private kanjiGroupsService:KanjiGroupsService, private radicalsService:RadicalsService, 
    kanjiService:KanjiService, router:Router, appState:AppState){
    super(kanjiService,router,appState);
  }
  async activate(){
    this.entity={};
    this.appState.loadingMessage = "Loading data..!"
    this.kanjiGroupsService.onCreated(kanji=>{
      this.groups.data.push(kanji);
    });
    return [this.kanjiGroupsService.find({}).then((d)=>{
      this.groups = d;
      this.appState.loadingMessage='';
    }),
    this.radicalsService.find({}).then((d)=>{
      this.radicals = d;
      this.appState.loadingMessage='';
    })
  ];
  }
  public submit() {
    for (let g of this.entity.groups){
      this.entity[g] = 1;
    }
    for (let r of this.entity.radicals){
      this.entity[r] = 1;
    }
    super.submit();
  }
}
