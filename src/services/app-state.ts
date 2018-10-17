import { FeathersApi } from './feathers-api';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class AppState {

  public loggedInUser= '';
  public message="Logging In..!";
  public loading=false;
  constructor(public rest:FeathersApi) {}

  login(email,password):Promise<any>{
    return this.rest.client.authenticate({
      "strategy":'local',
      "email":email,
      "password":password 
    }).then(()=> {
      this.loggedInUser = email;
      this.rest.client.set('user', email);
    });
  }

  authenticateByJWT():Promise<any>{
    return this.rest.client.authenticate().then(response => {
      this.message = 'Authenticated and loading user details!';
      return this.rest.client.passport.verifyJWT(response.accessToken);
    }).then(payload => {
      return this.rest.client.service('users').get(payload.userId);
    }).then((u)=>{
      this.loggedInUser = u.email;
      this.message = `Welcome ${u.email}!`;
      this.rest.client.set('user',u.email);
    });
  }

  logout():Promise<any>{
    return this.rest.client.logout();
  }
  
  register(email,password){
    return this.rest.client.service('users').create({email,password});
  }

  isAuthenticated(){
    return !!this.rest.client.get('user');  
  }

  getLoginRoute(){
    return '';
  }
}
