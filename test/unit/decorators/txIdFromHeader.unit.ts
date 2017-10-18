// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {expect} from '@loopback/testlab';
import {get, getControllerSpec} from '@loopback/rest';
import {txIdFromHeader} from '../../..';

describe('@txHeaderFromId() (unit)', () => {
  it('defines a parameter for X-Transaction-Id', () => {
    class MyController {
      @get('/')
      hello(@txIdFromHeader() txId: string) {}
    }

    const actualSpec = getControllerSpec(MyController);

    expect(actualSpec.paths['/']['get'].parameters).to.eql([
      {
        name: 'X-Transaction-Id',
        type: 'string',
        in: 'header',
      },
    ]);
  });
});
