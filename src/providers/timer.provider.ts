// Copyright (c) IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Provider} from '@loopback/context';
import {TimerFn, Time} from '../types';

export class TimerProvider implements Provider<TimerFn> {
  constructor() {}

  value(): TimerFn {
    return (start?: [number, number]): Time => {
      if (!start) return process.hrtime();
      const diff = process.hrtime(start);
      return diff[0] * 1000 + Math.round(diff[1] * 1e-4) / 100;
    };
  }
}
