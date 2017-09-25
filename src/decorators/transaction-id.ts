// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

/**
 * A parameter containing the current transaction-id provided
 * via HTTP request header "X-Transaction-Id".
 */

import { Reflector } from '@loopback/context';

export function transactionIdHeader(resp: any) {
	return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		// Get header here ... 
		const header = 'Hello world header';
		console.log('target =>', target);
		console.log('propertyKey =>', propertyKey);
		console.log('descriptor =>', descriptor);
		return {
			value: function(...args:any[]) {
				const req: any = Reflector.getMetadata('http.request', )
				console.log('this =>', req);
				args.unshift(header);
				return descriptor.value.apply(target, args);
			}
		}
	}
};
