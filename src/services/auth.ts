import { FeathersApi } from './feathers-api';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class Auth {

  constructor(private rest:FeathersApi) {}

  login(email,password):Promise<any>{
    return this.rest.client.authenticate({
      "strategy":'local',
      "email":email,
      "password":password 
    });
  }

  authenticateByJWT():Promise<any>{
    return this.rest.client.authenticate();
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
