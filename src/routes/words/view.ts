import { AppState } from '../../services/app-state';
import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class View {
  word: any;
  
  constructor(private wordsService: WordsService, private router: Router, public appState:AppState) {}

  async activate(params: any) {
    this.appState.loadingMessage = "Loading word details..!"
    return this.wordsService.get(params.id).then((d)=>{
      this.word = d;
      this.wordsService.viewItem=this.word.name;
      this.appState.loadingMessage='';
    });
  }
  detached(){
    this.wordsService.viewItem='';
  }

  delete(){
    if(!confirm('Are you sure?'))return;
    this.wordsService.delete(this.word._id).then((d)=>{
      this.router.navigate('');
    });
  }
}