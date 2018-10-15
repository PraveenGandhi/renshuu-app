import {FeathersApi} from './feathers-api';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class WordsService {
    constructor(private feathers:FeathersApi){}

    find(criteria:any):Promise<any>{
        return this.feathers.client.service('word-groups').find(criteria);
    }

    save(word:any):Promise<any>{
        return this.feathers.client.service('word-groups').create(word);
    }

    onCreated(callback:Function){
        this.feathers.client.service('word-groups').on('created',message=>{
            callback(message);
        });
    }

    delete(id:any):Promise<any>{
        return this.feathers.client.service('word-groups').remove(id);
    }
}