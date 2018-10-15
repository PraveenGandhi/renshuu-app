import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class Edit {
  word: any;
  
  constructor(private wordsService: WordsService, private router: Router) {}

  async activate(params: any) {
    return this.wordsService.find({query: {_id:params.id}}).then((d)=>{
      this.word = d.data[0];
    });
  }

  public submit(){
    this.wordsService.update(this.word).then(()=>{
      this.router.navigate('');
    });
  }
}