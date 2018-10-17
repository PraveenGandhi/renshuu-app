import { AppState } from './../services/app-state';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class Launched{
    constructor(public appState:AppState){
        appState.loadingMessage = "App launched and trying to login..!";
    }
}