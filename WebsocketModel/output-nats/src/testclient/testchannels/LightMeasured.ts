import AnonymousSchema_1 from '../../models/AnonymousSchema_1';
import * as Nats from 'nats';
import {
  ErrorCode,
  NatsTypescriptTemplateError
} from '../../NatsTypescriptTemplateError';
/**
 * Module which wraps functionality for the `light/measured` channel
 * @module lightMeasured
 */
/**
 * Internal functionality to publish message to channel 
 * light/measured
 * 
 * @param message to publish
 * @param nc to publish with
 * @param codec used to convert messages
 
 * @param options to publish with
 */
export function publish(
  message: AnonymousSchema_1,
  nc: Nats.NatsConnection,
  codec: Nats.Codec < any > ,
  options ? : Nats.PublishOptions
): Promise < void > {
  return new Promise < void > (async (resolve, reject) => {
    try {
      let dataToSend: any = message.marshal();
      dataToSend = codec.encode(dataToSend);
      nc.publish(`light.measured`, dataToSend, options);
      resolve();
    } catch (e: any) {
      reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e));
    }
  });
};