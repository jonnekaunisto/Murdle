import AnonymousSchema_1 from '../models/AnonymousSchema_1';
import * as Nats from 'nats';
import {
  ErrorCode,
  NatsTypescriptTemplateError
} from '../NatsTypescriptTemplateError';
/**
 * Module which wraps functionality for the `light/measured` channel
 * @module lightMeasured
 */
/**
 * Internal functionality to setup subscription on the `light/measured` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param nc to subscribe with
 * @param codec used to convert messages
 
 * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
 */
export function subscribe(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : AnonymousSchema_1
  ) => void,
  nc: Nats.NatsConnection,
  codec: Nats.Codec < any > ,
  options ? : Nats.SubscriptionOptions
): Promise < Nats.Subscription > {
  return new Promise(async (resolve, reject) => {
    let subscribeOptions: Nats.SubscriptionOptions = {
      ...options
    };
    try {
      let subscription = nc.subscribe(`light.measured`, subscribeOptions);
      (async () => {
        for await (const msg of subscription) {
          let receivedData: any = codec.decode(msg.data);
          onDataCallback(undefined, AnonymousSchema_1.unmarshal(receivedData));
        }
        console.log("subscription closed");
      })();
      resolve(subscription);
    } catch (e: any) {
      reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e));
    }
  })
}