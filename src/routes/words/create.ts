import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";

@autoinject()
export class Create {
  public entity: any;
  constructor(private wordsService:WordsService){}
  
  public submit() {
    
    this.wordsService.save(this.entity).then((d)=>{
      console.log(d);
    });
  }
}
