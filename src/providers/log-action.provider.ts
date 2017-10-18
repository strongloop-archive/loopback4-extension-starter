// Copyright (c) IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Provider, inject} from '@loopback/context';
import {ParsedRequest} from '@loopback/rest';
import {ExtensionStarterBindings} from '../keys';
import {LogFn, TimerFn} from '../types';

export class LogActionProvider implements Provider<LogFn> {
  constructor(@inject(ExtensionStarterBindings.TIMER) public timer: TimerFn) {}

  value(): LogFn {
    const fn = <LogFn>((
      req: ParsedRequest,
      // tslint:disable-next-line:no-any
      args: any[],
      // tslint:disable-next-line:no-any
      result: any,
      start?: [number, number],
    ) => {
      let resultLog = `${req.url} : (${args.join(',')}) => ${result}`;
      if (start) {
        const time = this.timer(start);
        resultLog = `${time}ms: ` + resultLog;
      }

      console.log(resultLog);
    });

    fn.startTimer = () => {
      return <[number, number]>this.timer();
    };

    return fn;
  }
}
