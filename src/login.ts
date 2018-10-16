import {AppState} from './services/app-state';
import { Aurelia } from 'aurelia-framework';

export class Login {
    email = '';
    password = '';
    static inject = [AppState, Aurelia]
    
    constructor(private appState: AppState, private aurelia: Aurelia) {}
    attached(){
        this.appState.loading=false;
    }
    login() {
        this.appState.loading=true;
        this.appState.message="Logging in ..!"
        this.appState.login(this.email,this.password)
            .then(() => {
                this.aurelia.setRoot('app');
            }).catch((e) => {
                console.log(e);
            });
    }
}