import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from './../../services/app-state';
import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";

@autoinject()
export class Create {
  public entity: any;
  groups:any;
  constructor(private wordGroupsService:WordGroupsService, private wordsService:WordsService, private appState:AppState){}
  async activate(){
    this.appState.loading=true;
    this.appState.message = "Loading data..!"
    this.wordGroupsService.onCreated(word=>{
      this.groups.data.push(word);
    });
    return this.wordGroupsService.find({}).then((d)=>{
      this.groups = d;
      this.appState.loading=false;
    });
  }
  public submit() {
    
    this.wordsService.save(this.entity).then((d)=>{
      console.log(d);
    });
  }
}
