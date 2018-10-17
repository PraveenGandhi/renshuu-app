import { Router } from "aurelia-router";

export class ChildRouter {
  public router: Router;
  configureRouter(config, router) {
    config.map([
      { route: '/',        name: 'list',    moduleId: './list',	  title: 'Groups',         nav: true,  settings:{icon:'list'} },
      { route: 'create',   name: 'create',  moduleId: './create',	title: 'Add New Group',  nav: true,  settings:{icon:'plus'} },
      { route: '/:id',     name: 'details', moduleId: './view',   title: 'Details'},
      { route: 'edit/:id', name: 'edit',    moduleId: './edit',   title: 'Edit'}
    ]);
    this.router = router;
  }
}
