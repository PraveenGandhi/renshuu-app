import { AppState } from './../services/app-state';
import { Aurelia } from 'aurelia-framework';

export class Login {
    email = '';
    password = '';
    loginFailed='';
    static inject = [AppState, Aurelia]
    
    constructor(private appState: AppState, private aurelia: Aurelia) {}
    attached(){
        this.appState.loading=false;
        this.loginFailed='';
    }
    login() {
        this.appState.loading=true;
        this.appState.message="Logging in ..!"
        this.appState.login(this.email,this.password)
            .then(() => {
                this.aurelia.setRoot('shells/app');
            }).catch((e) => {
                this.loginFailed = e.message;
                this.appState.loading=false;
            });
    }
    register(){
        this.appState.loading=true;
        this.appState.message="Registering you ..!"
        this.appState.register(this.email,this.password)
            .then(() => {
                return this.appState.login(this.email,this.password);
            })
            .then(() => {
                this.aurelia.setRoot('shells/app');
            })
            .catch((e) => {
                this.loginFailed = e.message;
                this.appState.loading=false;
            });
    }
}