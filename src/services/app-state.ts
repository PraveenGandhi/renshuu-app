import { FeathersApi } from './feathers-api';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class AppState {

  public loggedInUser= '';
  public message="Logging In..!";
  public loading=false;
  constructor(private rest:FeathersApi) {}

  login(email,password):Promise<any>{
    return this.rest.client.authenticate({
      "strategy":'local',
      "email":email,
      "password":password 
    }).then(()=> this.loggedInUser = email);
  }

  authenticateByJWT():Promise<any>{
    return this.rest.client.authenticate().then(response => {
      this.message = 'Authenticated and trying to get user details!';
      return this.rest.client.passport.verifyJWT(response.accessToken);
    }).then(payload => {
      return this.rest.client.service('users').get(payload.userId);
    });
  }

  logout():Promise<any>{
    return this.rest.client.logout();
  }
  
  register(user){
    return this.rest.client.post('signup', user);
  }

  isAuthenticated(){
    return !!this.rest.client.get('user');  
  }

  getLoginRoute(){
    return '';
  }

  setInitialUrl(localtion){
    
  }

  getLoginRedirect(){
    return '';
  }
}
