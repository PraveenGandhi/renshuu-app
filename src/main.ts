import { Auth } from './services/auth';
import { Container } from 'aurelia-dependency-injection';

export async function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature('resources/index')
        .plugin('aurelia-semantic-ui');

    await aurelia.start();

    const auth: Auth = Container.instance.get(Auth);
    await auth.rest.client.authenticate().then(() => {
        aurelia.setRoot('app');
    }).catch(() => {
        aurelia.setRoot('login');
    });
}