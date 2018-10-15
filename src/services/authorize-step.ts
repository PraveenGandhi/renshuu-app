import { Redirect, Next } from 'aurelia-router';
import { Auth } from './auth';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class AuthorizeStep {

  constructor(private auth:Auth) {}

  run(routingContext, next:Next) {

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