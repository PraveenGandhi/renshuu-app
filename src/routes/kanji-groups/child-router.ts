import { KanjiGroupsService } from './../../services/kanji-groups-service';
import { Router } from "aurelia-router";
import { autoinject } from 'aurelia-framework';

@autoinject()
export class ChildRouter {
  public router: Router;
  constructor(public service:KanjiGroupsService){}
  configureRouter(config, router) {
    config.map([
      { route: '/',        name: 'list',    moduleId: './list',	  title: 'KanjiGroups',         nav: true,  settings:{icon:'list'} },
      { route: 'create',   name: 'create',  moduleId: './create',	title: 'Add New',  nav: true,  settings:{icon:'plus'} },
      { route: '/:id',     name: 'details', moduleId: './view',   title: 'Details'},
      { route: 'edit/:id', name: 'edit',    moduleId: './edit',   title: 'Edit'}
    ]);
    this.router = router;
  }
}
