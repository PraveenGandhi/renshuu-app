import { BaseViewVM } from './../base/base-view';
import { Subscription, EventAggregator } from 'aurelia-event-aggregator';
import { WordsService } from './../../services/words-service';
import { WordGroupsService } from './../../services/word-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class View extends BaseViewVM {

  words: any;
  isLoading = false;
  subscriber: Subscription;
  constructor(wordGroupsService: WordGroupsService,
    private wordsService: WordsService, private ea: EventAggregator,
    router: Router, public appState: AppState) {
    super('group', wordGroupsService, router, appState);
  }

  async activate(params: any) {
    this.promises = [this.mainService.get(params.id).then((d) => {
      this.entity = d;
      this.mainService.viewItem = this.entity.name;
      return this.entity;
    }).then((w) => {
      let query = {};
      query[w.name] = 1;
      return this.wordsService.find({
        query
      }).then((d) => {
        this.words = d;
        this.appState.loadingMessage = '';
        return this.words;
      })
    })];
    this.promisesAdded = true;
    return super.activate(params);
  }

  attached() {
    this.subscriber = this.ea.subscribe('sortingChanged', data => {
      this.isLoading = true;
      let query = {};
      query[this.entity.name] = 1;
      query['$sort'] = data;
      this.wordsService.find({
        query
      }).then((d) => {
        this.words = d;
        this.isLoading = false;
      });
    });
  }
  
  detached() {
    this.mainService.viewItem = '';
    this.subscriber.dispose();
  }

}