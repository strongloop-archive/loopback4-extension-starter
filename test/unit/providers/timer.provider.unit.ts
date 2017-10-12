// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {ElapsedTimeProvider} from '../../..';

describe('ElapsedTimeProvider (unit)', () => {
  it('returns the time difference given a time', () => {
    const timer = new ElapsedTimeProvider().value();
    const diff = timer([2, 2]);
    expect(diff).to.be.a.Number();
  });
});
