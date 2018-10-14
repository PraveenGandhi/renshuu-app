import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";

@autoinject()
export class View {
  word: any;
  
  constructor(private wordsService: WordsService) {}

  async activate(params: any) {
    return this.wordsService.find({query: {name:params.id}}).then((d)=>{
      this.word = d.data[0];
    });
  }
}