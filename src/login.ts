import {Auth} from './services/auth';
import { Aurelia } from 'aurelia-framework';

export class Login {
    email = '';
    password = '';
    static inject = [Auth, Aurelia]
    constructor(private auth: Auth, private aurelia: Aurelia) {}

    login() {
        this.auth.login(this.email,this.password)
            .then(() => {
                this.aurelia.setRoot('app');
            }).catch((e) => {
                console.log(e);
            });
    }
}