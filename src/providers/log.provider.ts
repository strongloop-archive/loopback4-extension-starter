// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

// tslint:disable:no-any
import {Provider} from '@loopback/context';
import {ParsedRequest} from '@loopback/core';

export interface LogFn {
  (req: ParsedRequest, args: any, result: any, startTime?: number[]): void;
}

export class LogProvider implements Provider<LogFn> {
  constructor() {}

  value(): LogFn {
    return (
      req: ParsedRequest,
      args: any,
      result: any,
      start?: [number, number],
    ) => {
      let resultLog = `${req.url} : (${args.join(',')}) => ${result}`;
      if (start) {
        const diff = process.hrtime(start);
        resultLog = `${diff[0] * 1000 + diff[1] * 1e-6}ms: ` + resultLog;
      }

      console.log(resultLog);
    };
  }
}
