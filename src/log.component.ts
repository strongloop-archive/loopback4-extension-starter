// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {ExtensionStarterBindings} from './keys';
import {Component, ProviderMap} from '@loopback/core';
import {LogProvider} from './providers/log-provider';

export class LogComponent implements Component {
  providers?: ProviderMap = {
    [ExtensionStarterBindings.LOG_ACTION]: LogProvider,
  };

  constructor() {}
}
