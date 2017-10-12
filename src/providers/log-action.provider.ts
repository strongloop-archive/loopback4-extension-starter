// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

// tslint:disable:no-any

import {Provider, inject} from '@loopback/context';
import {ParsedRequest} from '@loopback/rest';
import {ExtensionStarterBindings} from '../keys';
import {LogFn, ElapsedTimeFn} from '../types';

export class LogActionProvider implements Provider<LogFn> {
  constructor(
    @inject(ExtensionStarterBindings.ELAPSED_TIME)
    protected timer: ElapsedTimeFn,
  ) {}

  value(): LogFn {
    return (
      req: ParsedRequest,
      args: any[],
      result: any,
      start?: [number, number],
    ) => {
      let resultLog = `${req.url} : (${args.join(',')}) => ${result}`;
      if (start) {
        const time = this.timer(start);
        resultLog = `${time}ms: ` + resultLog;
      }

      console.log(resultLog);
    };
  }
}
