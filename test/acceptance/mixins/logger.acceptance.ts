// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Application, inject} from '@loopback/core';
import {RestComponent, RestServer, get, param} from '@loopback/rest';
import {sinon, Client, createClientForHandler} from '@loopback/testlab';
import {LoggerMixin, Logger, LogArgs} from '../../..';

describe('logger.mixin (acceptance)', () => {
  let app: LoggerApplication;
  let server: RestServer;
  let spy: sinon.SinonSpy;

  beforeEach(createApp);
  beforeEach(createController);
  beforeEach(getServerFromApp);
  beforeEach(createConsoleSpy);

  afterEach(restoreConsoleSpy);

  it('.log() logs request information', async () => {
    const client: Client = createClientForHandler(server.handleHttp);
    await client.get('/?name=John').expect(200, 'Hi John');
    sinon.assert.calledWith(spy, 'log:', 'hello() called with:', 'John');
  });

  it('.error() logs request information', async () => {
    const client: Client = createClientForHandler(server.handleHttp);
    await client.get('/error?name=John').expect(200, 'Hi John');
    sinon.assert.calledWith(
      spy,
      '\x1b[31m error:',
      'hello() called with:',
      'John',
      '\x1b[0m',
    );
  });

  class LoggerApplication extends LoggerMixin(Application) {
    constructor() {
      super({
        components: [RestComponent],
        loggers: [ColorLogger],
      });
    }
  }

  class ColorLogger implements Logger {
    log(...args: LogArgs) {
      console.log('log:', ...args);
    }

    error(...args: LogArgs) {
      // log in red color
      console.log('\x1b[31m error:', ...args, '\x1b[0m');
    }
  }

  function createApp() {
    app = new LoggerApplication();
  }

  function createController() {
    class MyController {
      constructor(@inject('loggers.ColorLogger') protected log: Logger) {}

      @get('/')
      @param.query.string('name')
      hello(name: string) {
        this.log.log('hello() called with:', name);
        return `Hi ${name}`;
      }

      @get('/error')
      @param.query.string('name')
      helloError(name: string) {
        this.log.error('hello() called with:', name);
        return `Hi ${name}`;
      }
    }

    app.controller(MyController);
  }

  function createConsoleSpy() {
    spy = sinon.spy(console, 'log');
  }

  function restoreConsoleSpy() {
    spy.restore();
  }

  async function getServerFromApp() {
    server = await app.getServer(RestServer);
  }
});
