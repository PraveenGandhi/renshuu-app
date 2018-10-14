import {WordsService} from '../../services/words-service';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class List {

  words :any;
  constructor(private wordsService:WordsService){}
  
  async activate() {
    this.wordsService.onCreated(word=>{
      console.log('word created');
      console.log(word);
    });
    return this.wordsService.find({}).then((d)=>{
      this.words = d;
      console.log(d);
    });
  }
}
