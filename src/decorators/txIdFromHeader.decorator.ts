// Copyright (c) IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {param} from '@loopback/rest';

/**
 * Decorator to inject the current transaction-id from a request's
 * 'X-Transaction-Id' header into the decorated function.
 */
export function txIdFromHeader() {
  return param.header.string('X-Transaction-Id');
}
