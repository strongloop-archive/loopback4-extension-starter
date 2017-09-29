// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Application, inject} from '@loopback/core';
import {RestComponent, RestServer, get, param} from '@loopback/rest';
import {sinon, Client, createClientForHandler} from '@loopback/testlab';
import {LoggerMixin, Logger, LogArgs} from '../../..';

describe('logger.mixin (acceptance)', () => {
  // tslint:disable-next-line:no-any
  let app: any;
  let server: RestServer;
  // tslint:disable-next-line:no-any
  let spy: any;

  beforeEach(createApp);
  beforeEach(createLogger);
  beforeEach(createController);
  beforeEach(getServerFromApp);
  beforeEach(() => {
    spy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    spy.restore();
  });

  it('.log() logs request information', async () => {
    const client: Client = createClientForHandler(server.handleHttp);
    await client.get('/?name=John').expect(200, 'Hi John');
    sinon.assert.calledWith(spy, sinon.match('log: hello() called with: John'));
  });

  it('.error() logs request information', async () => {
    const client: Client = createClientForHandler(server.handleHttp);
    await client.get('/error?name=John').expect(200, 'Hi John');
    sinon.assert.calledWith(
      spy,
      sinon.match('error: hello() called with: John'),
    );
  });

  function createApp() {
    class LoggerApplication extends LoggerMixin(Application) {
      // tslint:disable-next-line:no-any
      constructor(...args: any[]) {
        super({
          components: [RestComponent],
        });
      }
    }

    app = new LoggerApplication();
  }

  function createLogger() {
    class ColorLogger implements Logger {
      log(...args: LogArgs) {
        const data = 'log: ' + args.join(' ');
        console.log(data);
      }

      error(...args: LogArgs) {
        const data = args.join(' ');
        // log in red color
        console.log('\x1b[31m error: ' + data + '\x1b[0m');
      }
    }

    app.logger(ColorLogger);
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

  async function getServerFromApp() {
    server = await app.getServer(RestServer);
  }
});
