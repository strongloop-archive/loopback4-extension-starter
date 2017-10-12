// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {ExtensionStarterBindings} from './keys';
import {Component, ProviderMap} from '@loopback/core';
import {LogActionProvider, ElapsedTimeProvider} from './';

export class LogComponent implements Component {
  providers?: ProviderMap = {
    [ExtensionStarterBindings.ELAPSED_TIME]: ElapsedTimeProvider,
    [ExtensionStarterBindings.LOG_ACTION]: LogActionProvider,
  };

  constructor() {}
}
