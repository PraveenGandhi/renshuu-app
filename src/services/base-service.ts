import { FeathersApi } from './feathers-api';
export class BaseService{
    public service:any;
    public editItem='';
    public viewItem='';
    constructor(feathers:FeathersApi,serviceName:string){
        this.service = feathers.client.service(serviceName)
    }

    get(id:any):Promise<any>{
        return this.service.get(id);
    }

    find(criteria:any):Promise<any>{
        return this.service.find(criteria);
    }

    save(word:any):Promise<any>{
        return this.service.create(word);
    }

    update(word:any):Promise<any>{
        return this.service.update(word._id,word);
    }

    onCreated(callback:Function){
        this.service.on('created',message=>{
            callback(message);
        });
    }

    delete(id:any):Promise<any>{
        return this.service.remove(id);
    }
}