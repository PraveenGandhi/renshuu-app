import { AppState } from './../services/app-state';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class Launched{
    constructor(public appState:AppState){
        appState.message = "App launched and trying to login..!";
    }
}