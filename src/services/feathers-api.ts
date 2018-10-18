import * as feathers from '@feathersjs/feathers';
import * as auth from '@feathersjs/authentication-client';
import * as socketio from '@feathersjs/socketio-client';
import { Application } from 'feathersjs__feathers';

export class FeathersApi {
  client:Application;
  constructor() {
    this.client = feathers.default()
    let baseUrl = window.location.hostname=== 'localhost'?'http://localhost:8080': 'http://rn-rn.1d35.starter-us-east-1.openshiftapps.com';
    //let rest = feathers.rest(baseUrl);
    const socket = require('socket-io-client')(baseUrl);

    this.client
        .configure(socketio.default(socket))
        //.configure(feathers.hooks())
        .configure(auth.default({ storage: window.localStorage }));
  }
}