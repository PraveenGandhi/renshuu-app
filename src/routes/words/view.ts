import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class View {
  word: any;
  
  constructor(private wordsService: WordsService, private router: Router) {}

  async activate(params: any) {
    return this.wordsService.find({query: {name:params.id}}).then((d)=>{
      this.word = d.data[0];
    });
  }

  delete(){
    if(!confirm('Are you sure?'))return;
    this.wordsService.delete(this.word._id).then((d)=>{
      this.router.navigate('');
    });
  }
}