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
        .then(async () => {            
            setTimeout(async () => await aurelia.setRoot('shells/app'), 200);
        }).catch(async (e) => {
            console.log(e);
            appState.message = 'Yet to login..!';
            setTimeout(async () => await aurelia.setRoot('shells/login'), 400);
        });
}