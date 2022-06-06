import {
  describe,
  it,
  before
} from 'mocha';
import {
  expect
} from 'chai';
import * as Client from '../../src'
import * as TestClient from '../../src/testclient'
import {
  NatsTypescriptTemplateError
} from '../../src/NatsTypescriptTemplateError';
describe('light/measured can talk to itself', () => {
  var client: Client.NatsAsyncApiClient;
  var testClient: TestClient.NatsAsyncApiTestClient;
  before(async () => {
    client = new Client.NatsAsyncApiClient();
    testClient = new TestClient.NatsAsyncApiTestClient();
    const natsHost = process.env.NATS_HOST || "0.0.0.0"
    const natsPort = process.env.NATS_PORT || "4222"
    const natsUrl = `${natsHost}:${natsPort}`
    await client.connectToHost(natsUrl);
    await testClient.connectToHost(natsUrl);
  });
  it('can send message', async () => {
    var receivedError: NatsTypescriptTemplateError | undefined = undefined;
    var receivedMsg: Client.AnonymousSchema_1 | undefined = undefined;
    var publishMessage: TestClient.AnonymousSchema_1 = TestClient.AnonymousSchema_1.unmarshal({
      "id": 0,
      "lumens": 0,
      "sentAt": "2019-08-24T14:15:22Z"
    });
    const subscription = await client.subscribeToLightMeasured((err, msg) => {
        receivedError = err;
        receivedMsg = msg;
      },
      true
    );
    const tryAndWaitForResponse = new Promise((resolve, reject) => {
      let isReturned = false;
      setTimeout(() => {
        if (!isReturned) {
          reject(new Error("Timeout"));
        }
      }, 3000)
      setInterval(async () => {
        if (subscription.getReceived() === 1) {
          resolve(undefined);
          isReturned = true
        }
      }, 100);
    });
    await testClient.publishToLightMeasured(publishMessage);
    await tryAndWaitForResponse;
    expect(receivedError).to.be.undefined;
    expect(receivedMsg).to.not.be.undefined;
    expect(receivedMsg!.marshal()).to.equal(publishMessage.marshal());
  });
  after(async () => {
    await client.disconnect();
    await testClient.disconnect();
  });
});