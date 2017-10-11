// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {sinon} from '@loopback/testlab';
import {ParsedRequest} from '@loopback/core';
import {LogProvider} from '../..';

describe('LogProvider', () => {
  // tslint:disable-next-line:no-any
  let spy: any;
  beforeEach(() => {
    spy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    spy.restore();
  });

  it('logs a value without a start time', () => {
    const match = '/test : () => test message';

    runTest(match);
  });

  it('logs a value with a start time', () => {
    const match = 'ms: /test : () => test message';
    const startTime = process.hrtime();

    runTest(match, startTime);
  });

  function runTest(match: string, startTime?: [number, number]) {
    const log = new LogProvider().value();
    // prettier-ignore
    const req = <ParsedRequest> {url: '/test'};

    log(req, [], 'test message', startTime);

    sinon.assert.calledWith(spy, sinon.match(match));
  }
});
