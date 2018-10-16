import { AppState } from './../../services/app-state';
import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";

@autoinject()
export class Create {
  public entity: any;
  constructor(private wordsService:WordsService, private appState:AppState){}
  activate(){
    this.appState.loading=false;
  }
  public submit() {
    
    this.wordsService.save(this.entity).then((d)=>{
      console.log(d);
    });
  }
}
