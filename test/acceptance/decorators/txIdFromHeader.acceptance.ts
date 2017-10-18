// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: loopback4-extension-starter
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Application} from '@loopback/core';
import {get, RestComponent, RestServer} from '@loopback/rest';
import {txIdFromHeader} from '../../..';
import {Client, createClientForHandler} from '@loopback/testlab';

describe('@txIdFromHeader() (acceptance)', () => {
  let app: Application;
  let server: RestServer;

  beforeEach(createApp);
  beforeEach(createController);
  beforeEach(getServerFromApp);

  it('works with header set', async () => {
    const client: Client = createClientForHandler(server.handleHttp);

    await client
      .get('/')
      .set('X-Transaction-Id', 'testid123')
      .expect(200, 'Your id is testid123');
  });

  it('works without header', async () => {
    const client: Client = createClientForHandler(server.handleHttp);

    await client.get('/').expect(200, 'Your id is undefined');
  });

  async function createApp() {
    app = new Application({
      components: [RestComponent],
      rest: {
        port: 3000,
      },
    });
  }

  function createController() {
    class MyController {
      @get('/')
      test(@txIdFromHeader() txId: string) {
        return `Your id is ${txId}`;
      }
    }

    app.controller(MyController);
  }

  async function getServerFromApp() {
    server = await app.getServer(RestServer);
  }
});
