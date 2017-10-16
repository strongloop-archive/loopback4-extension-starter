// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {TimerProvider} from '../../..';

describe('TimerProvider (unit)', () => {
  it('returns current time given no start time', () => {
    const timer = new TimerProvider().value();
    const time = <[number, number]>timer();
    expect(time).to.have.lengthOf(2);
    expect(time[0]).to.be.a.Number();
    expect(time[1]).to.be.a.Number();
  });

  it('returns the time difference given a time', () => {
    const timer = new TimerProvider().value();
    const diff = timer([2, 2]);
    expect(diff).to.be.a.Number();
  });
});
