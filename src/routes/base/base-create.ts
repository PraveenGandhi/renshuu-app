import { AppState } from './../../services/app-state';
import { BaseService } from '../../services/base-service';

export class BaseCreateVM {
    public entity: any;
    constructor(protected mainService: BaseService, public appState: AppState) {}

    public activate() {
        this.appState.loadingMessage = '';
    }
    public submit() {
        this.mainService.save(this.entity).then((d) => {
            console.log(d);
        });
    }
}