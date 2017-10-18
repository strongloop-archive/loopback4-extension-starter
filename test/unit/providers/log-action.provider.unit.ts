// Copyright (c) IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {sinon} from '@loopback/testlab';
import {ParsedRequest} from '@loopback/rest';
import {LogActionProvider, LogFn, Time} from '../../..';

describe('LogProvider (unit)', () => {
  let spy: sinon.SinonSpy;
  let log: LogFn;
  const req = <ParsedRequest>{url: '/test'};

  beforeEach(createConsoleSpy);
  beforeEach(getLogger);

  afterEach(restoreConsoleSpy);

  it('logs a value without a start time', () => {
    const match = '/test : () => test message';

    log(req, [], 'test message');
    sinon.assert.calledWith(spy, match);
  });

  it('logs a value with a start time', () => {
    const match = '100.02ms: /test : () => test message';
    const startTime = log.startTimer();

    log(req, [], 'test message', startTime);
    sinon.assert.calledWith(spy, match);
  });

  function getLogger() {
    log = new LogActionProvider(timer).value();
  }

  function createConsoleSpy() {
    spy = sinon.spy(console, 'log');
  }

  function restoreConsoleSpy() {
    spy.restore();
  }

  function timer(startTime?: [number, number]): Time {
    if (!startTime) return [2, 2];
    return 100.02;
  }
});
