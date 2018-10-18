import { BaseViewVM } from './../base/base-view';
import { AppState } from '../../services/app-state';
import { KanjiService } from "../../services/kanji-service";
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class KanjiView extends BaseViewVM{
  
  constructor(kanjiService: KanjiService, router: Router, appState:AppState) {
    super('kanji',kanjiService,router,appState);
  }
  
}