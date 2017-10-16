// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

// Types and interfaces exposed by the extension go here

// tslint:disable-next-line:no-any
export type LogArgs = any[];

// A traditional Logger interface would have `.warn()` and `.info()` methods &
// potentially others but they have been omitted to keep this example simple.
export interface Logger {
  log(...args: LogArgs): void;
  error(...args: LogArgs): void;
}
