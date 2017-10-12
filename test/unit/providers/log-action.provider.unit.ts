// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {sinon} from '@loopback/testlab';
import {ParsedRequest} from '@loopback/rest';
import {LogActionProvider, LogFn} from '../../..';

describe('LogProvider (unit)', () => {
  // tslint:disable-next-line:no-any
  let spy: any;
  let log: LogFn;
  const req = <ParsedRequest>{url: '/test'};

  beforeEach(() => {
    spy = sinon.spy(console, 'log');
  });

  beforeEach(getLogger);

  afterEach(() => {
    spy.restore();
  });

  it('logs a value without a start time', () => {
    const match = '/test : () => test message';

    log(req, [], 'test message');
    sinon.assert.calledWith(spy, sinon.match(match));
  });

  it('logs a value with a start time', () => {
    const match = '100.02ms: /test : () => test message';
    const startTime = process.hrtime();

    log(req, [], 'test message', startTime);
    sinon.assert.calledWith(spy, sinon.match(match));
  });

  function getLogger() {
    log = new LogActionProvider(timer).value();
  }

  function timer(startTime: [number, number]): number {
    return 100.02;
  }
});
