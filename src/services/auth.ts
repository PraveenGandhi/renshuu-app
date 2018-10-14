import { Feathers } from './feathers';

export class Auth {

  static inject = [Feathers];
  rest: Feathers;

  constructor(rest) {
    this.rest = rest;
  }

  login(email,password):Promise<any>{
    return this.rest.client.authenticate({
      "strategy":'local',
      "email":email,
      "password":password 
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
