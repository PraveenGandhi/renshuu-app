import { BaseViewVM } from './../base/base-view';
import { AppState } from '../../services/app-state';
import { WordsService } from "../../services/words-service";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class View extends BaseViewVM{
  
  constructor(wordsService: WordsService, router: Router, appState:AppState) {
    super('word',wordsService,router,appState);
  }
  
}