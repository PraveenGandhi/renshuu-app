import {FeathersApi} from './feathers-api';
import { autoinject } from 'aurelia-framework';
import { BaseService } from './base-service';

@autoinject()
export class RadicalsService extends BaseService{
    
    constructor(feathers:FeathersApi){
        super(feathers,'radicals');
    }
}