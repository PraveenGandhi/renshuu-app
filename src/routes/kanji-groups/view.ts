import { BaseViewVM } from './../base/base-view';
import { Subscription, EventAggregator } from 'aurelia-event-aggregator';
import { KanjiService } from './../../services/kanji-service';
import { KanjiGroupsService } from './../../services/kanji-groups-service';
import { AppState } from '../../services/app-state';
import { autoinject } from "aurelia-framework";
import { Router } from "aurelia-router";

@autoinject()
export class View extends BaseViewVM {

  kanji: any;
  isLoading = false;
  subscriber: Subscription;
  constructor(kanjiGroupsService: KanjiGroupsService,
    private kanjiService: KanjiService, private ea: EventAggregator,
    router: Router, public appState: AppState) {
    super('group', kanjiGroupsService, router, appState);
  }

  async activate(params: any) {
    this.promises = [this.mainService.get(params.id).then((d) => {
      this.entity = d;
      this.mainService.viewItem = this.entity.name;
      return this.entity;
    }).then((w) => {
      let query = {};
      query[w.name] = 1;
      return this.kanjiService.find({
        query
      }).then((d) => {
        this.kanji = d;
        this.appState.loadingMessage = '';
        return this.kanji;
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
      this.kanjiService.find({
        query
      }).then((d) => {
        this.kanji = d;
        this.isLoading = false;
      });
    });
  }
  
  detached() {
    this.mainService.viewItem = '';
    this.subscriber.dispose();
  }

}