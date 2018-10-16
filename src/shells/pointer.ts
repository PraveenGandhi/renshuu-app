import { Redirect } from "aurelia-router";

export class Pointer{
  async canActivate() {
    return new Promise(resolve => resolve(new Redirect('/words')));
  }
  static $view() {
    return '<template></template>';
  }
}
