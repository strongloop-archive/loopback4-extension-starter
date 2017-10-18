// Copyright (c) IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {ExtensionStarterBindings} from './keys';
import {Component, ProviderMap} from '@loopback/core';
import {LogActionProvider, TimerProvider} from './';

export class LogComponent implements Component {
  providers?: ProviderMap = {
    [ExtensionStarterBindings.TIMER]: TimerProvider,
    [ExtensionStarterBindings.LOG_ACTION]: LogActionProvider,
  };

  constructor() {}
}
