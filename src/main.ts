import { Aurelia } from 'aurelia-framework';
import { AppState } from './services/app-state';
import { Container } from 'aurelia-dependency-injection';

export async function configure(aurelia: Aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature('resources/index')
        .plugin('aurelia-semantic-ui');

    await aurelia.start();
    await aurelia.setRoot('shells/launched');
    const appState: AppState = Container.instance.get(AppState);

    await appState.authenticateByJWT()
        .then(()=> {            
            aurelia.setRoot('shells/app');
        }).catch(e => {
            console.log(e);
            aurelia.setRoot('shells/login');
        });
}