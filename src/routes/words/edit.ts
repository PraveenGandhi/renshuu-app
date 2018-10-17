import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from '../../services/app-state';
import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class Edit {
  word: any;
  groups:any;
  constructor(private wordGroupsService:WordGroupsService, private wordsService: WordsService, private router: Router, public appState:AppState) {}

  async activate(params: any) {
    this.appState.loadingMessage = "Loading word for editing..!"
    return [this.wordsService.find({query: {_id:params.id}}).then((d)=>{
      this.word = d.data[0];
      this.appState.loadingMessage='';
    }),
    this.wordGroupsService.find({}).then((d)=>{
      this.groups = d;
      this.appState.loadingMessage='';
    })];
  }

  public submit(){
    for (let g of this.word.groups){
      this.word[g] = 1;
    }
    this.word.groups=undefined;
    this.wordsService.update(this.word).then(()=>{
      this.router.navigate('');
    });
  }
}