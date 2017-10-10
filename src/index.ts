// Copyright IBM Corp. 2013,2017. All Rights Reserved.
// Node module: loopback-next-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Application, get } from '@loopback/core';
import { transactionIdHeader } from './decorators/transaction-id';
import { inject } from '@loopback/context';


class MyController {
	@get('/')
	@transactionIdHeader()
	getHandler(transactionId?: string) {
		console.log(transactionId);
		return `Hello from getHandler`;
	}
}

class MyApp extends Application {
	private _startTime: Date;

	constructor() {
		super();
		const app = this;
		app.controller(MyController);
	}

	async start() {
		this._startTime = new Date();
		return super.start();
	}

	async info() {
    	const port: Number = await this.get('http.port');

    	return {
      		uptime: Date.now() - this._startTime.getTime(),
      		url: 'http://127.0.0.1:' + port,
   		};
  	}
}

async function main(): Promise<void> {
  const app = new MyApp();
  await app.start();
  console.log('Application Info:', await app.info());
}

main().catch(err => {
  console.log('Cannot start the app.', err);
  process.exit(1);
});
