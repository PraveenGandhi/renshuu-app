import { Redirect } from 'aurelia-router';
import { Auth } from './auth';

export class AuthorizeStep {

  static inject = [Auth];
  auth: any;

  constructor(auth) {
    this.auth = auth;
  }

  run(routingContext, next) {

    const isLoggedIn = this.auth.isAuthenticated();
    const loginRoute = this.auth.getLoginRoute();

    const instructions = routingContext.getAllInstructions();

    const hasAuthConfig = instructions.some((i) => i.config.auth)
    const hasLoginRoute = instructions.some(i => i.fragment === loginRoute);

    if (hasAuthConfig) {
      if (!isLoggedIn) {
        this.auth.setInitialUrl(window.location.href);

        return next.cancel(new Redirect(loginRoute));
      }
    } else if (isLoggedIn && hasLoginRoute) {
      let loginRedirect = this.auth.getLoginRedirect();

      return next.cancel(new Redirect(loginRedirect));
    }

    return next();
  }
}