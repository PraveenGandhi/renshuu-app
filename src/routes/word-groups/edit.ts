import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class Edit {
  word: any;
  
  constructor(private wordGroupsService: WordGroupsService, private router: Router, public appState:AppState) {}

  async activate(params: any) {
    this.appState.loading=true;
    this.appState.message = "Loading word for editing..!"
    return this.wordGroupsService.find({query: {_id:params.id}}).then((d)=>{
      this.word = d.data[0];
      this.appState.loading=false;
    });
  }

  public submit(){
    this.wordGroupsService.update(this.word).then(()=>{
      this.router.navigate('');
    });
  }
}