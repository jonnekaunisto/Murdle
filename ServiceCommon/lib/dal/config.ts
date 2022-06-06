import { marshallOptions, unmarshallOptions } from "@aws-sdk/util-dynamodb";
import { TranslateConfig } from "@aws-sdk/lib-dynamodb";

export function getDefaultTranslateConfig(): TranslateConfig {
  const marshallOptions: marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
  };

  const unmarshallOptions: unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
  };

  return { marshallOptions, unmarshallOptions };
}