// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Client, createClientForApp, sinon} from '@loopback/testlab';
import {inject} from '@loopback/context';
import {
  Application,
  get,
  param,
  SequenceHandler,
  FindRoute,
  ParseParams,
  InvokeMethod,
  Send,
  Reject,
  CoreBindings,
  ParsedRequest,
  ServerResponse,
} from '@loopback/core';
import {LogComponent, ExtensionStarterBindings, LogFn} from '../..';

const coreSequenceActions = CoreBindings.SequenceActions;

describe('Logging', () => {
  let app: Application;

  // tslint:disable-next-line:no-any
  let spy: any;
  beforeEach(() => {
    spy = sinon.spy(console, 'log');
  });

  beforeEach(createApplication);
  beforeEach(createController);
  beforeEach(createSequence);

  afterEach(() => {
    spy.restore();
  });

  it('logs request information', async () => {
    const client: Client = createClientForApp(app);
    await client.get('/?name=John').expect(200, 'Hello John');
    const expectedLog = 'ms: /?name=John : (John) => Hello John';
    sinon.assert.calledWith(spy, sinon.match(expectedLog));
  });

  function createApplication() {
    app = new Application({
      components: [LogComponent],
    });
  }

  function createController() {
    class MyController {
      @get('/')
      @param.query.string('name')
      helloNameTest(name?: string) {
        return `Hello ${name}`;
      }
    }

    app.controller(MyController);
  }

  function createSequence() {
    class LogSequence implements SequenceHandler {
      constructor(
        @inject(coreSequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
        @inject(coreSequenceActions.PARSE_PARAMS)
        protected parseParams: ParseParams,
        @inject(coreSequenceActions.INVOKE_METHOD)
        protected invoke: InvokeMethod,
        @inject(coreSequenceActions.SEND) protected send: Send,
        @inject(coreSequenceActions.REJECT) protected reject: Reject,
        @inject(ExtensionStarterBindings.LOG_ACTION) protected logger: LogFn,
      ) {}

      async handle(req: ParsedRequest, res: ServerResponse) {
        // tslint:disable-next-line:no-any
        let args: any = [];
        // tslint:disable-next-line:no-any
        let result: any;
        const start = process.hrtime();

        try {
          const route = this.findRoute(req);
          args = await this.parseParams(req, route);
          result = await this.invoke(route, args);
          this.send(res, result);
        } catch (err) {
          this.reject(res, req, err);
        }

        this.logger(req, args, result, start);
      }
    }

    app.sequence(LogSequence);
  }
});
