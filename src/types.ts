// Copyright (c) IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

// Types and interfaces exposed by the extension go here

import {ParsedRequest} from '@loopback/rest';

// tslint:disable-next-line:no-any
export type LogArgs = any[];

// A traditional Logger interface would have `.warn()` and `.info()` methods &
// potentially others but they have been omitted to keep this example simple.
export interface Logger {
  log(...args: LogArgs): void;
  error(...args: LogArgs): void;
}

export interface LogFn {
  (
    req: ParsedRequest,
    // tslint:disable-next-line:no-any
    args: any[],
    // tslint:disable-next-line:no-any
    result: any,
    startTime?: [number, number],
  ): void;

  startTimer(): [number, number];
}

export type Time = number | [number, number];

export type TimerFn = (start?: [number, number]) => Time;
