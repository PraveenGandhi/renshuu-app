import { AppState } from './../../services/app-state';
import { BaseService } from "../../services/base-service";
import { Router } from "aurelia-router";

export class BaseEditVM {
    protected entity: any;
    protected promises:Promise<any>[]=[];
    protected promisesAdded:boolean;
    constructor(private type:string, protected mainService: BaseService, public router: Router, public appState: AppState) {}

    async activate(params: any) {
        this.appState.loadingMessage = `Loading ${this.type} for editing..!`;
        if(!this.promisesAdded){
            let promise = this.mainService.find({query: {_id:params.id}}).then((d)=>{
                this.entity = d.data[0];
                this.mainService.editItem=this.entity._id;
                this.appState.loadingMessage='';
              });
              this.promises.push(promise);
        }
        return this.promises;
      }

    detached() {
        this.mainService.editItem = '';
    }

    public submit() {
        this.mainService.update(this.entity).then(() => {
            this.router.navigate('');
        });
    }
}