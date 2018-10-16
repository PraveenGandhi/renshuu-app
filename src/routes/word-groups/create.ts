import { AppState } from './../../services/app-state';
import { WordGroupsService } from "../../services/word-groups-service";
import { autoinject } from "aurelia-framework";

@autoinject()
export class Create {
  public entity: any;
  constructor(private wordGroupsService:WordGroupsService, private appState:AppState){}
  activate(){
    this.appState.loading=false;
  }
  public submit() {
    
    this.wordGroupsService.save(this.entity).then((d)=>{
      console.log(d);
    });
  }
}
