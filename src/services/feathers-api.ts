import * as feathers from '@feathersjs/client';
import { Application } from 'feathersjs__feathers';

export class FeathersApi {
  client:Application;
  constructor() {
    this.client = feathers()
    let baseUrl = window.location.hostname=== 'localhost'?'http://localhost:8080': 'http://rn-rn.1d35.starter-us-east-1.openshiftapps.com';
    //let rest = feathers.rest(baseUrl);
    const socket = require('socket-io-client')(baseUrl);

    this.client
        .configure(feathers.socketio(socket))
        //.configure(feathers.hooks())
        .configure(feathers.authentication({ storage: window.localStorage }));
  }
}