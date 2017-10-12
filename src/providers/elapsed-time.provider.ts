// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Provider} from '@loopback/context';
import {ElapsedTimeFn} from '../types';

export class ElapsedTimeProvider implements Provider<ElapsedTimeFn> {
  constructor() {}

  value(): ElapsedTimeFn {
    return (start: [number, number]) => {
      const diff = process.hrtime(start);
      return diff[0] * 1000 + Math.round(diff[1] * 1e-4) / 100;
    };
  }
}
