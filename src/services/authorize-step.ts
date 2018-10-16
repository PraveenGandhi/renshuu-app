import { Redirect, Next } from 'aurelia-router';
import { AppState } from './app-state';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class AuthorizeStep {

  constructor(private appState:AppState) {}

  run(routingContext, next:Next) {

    const isLoggedIn = this.appState.isAuthenticated();
    const loginRoute = this.appState.getLoginRoute();

    const instructions = routingContext.getAllInstructions();

    const hasAuthConfig = instructions.some((i) => i.config.appState)
    const hasLoginRoute = instructions.some(i => i.fragment === loginRoute);

    if (hasAuthConfig) {
      if (!isLoggedIn) {
        this.appState.setInitialUrl(window.location.href);

        return next.cancel(new Redirect(loginRoute));
      }
    } else if (isLoggedIn && hasLoginRoute) {
      let loginRedirect = this.appState.getLoginRedirect();

      return next.cancel(new Redirect(loginRedirect));
    }

    return next();
  }
}