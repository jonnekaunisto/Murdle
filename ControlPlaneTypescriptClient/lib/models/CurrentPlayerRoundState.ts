/**
 * MurdleControlPlane
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { PlayerGuess } from './PlayerGuess';
import { HttpFile } from '../http/http';

export class CurrentPlayerRoundState {
    'playerGuesses': Array<PlayerGuess>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "playerGuesses",
            "baseName": "playerGuesses",
            "type": "Array<PlayerGuess>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return CurrentPlayerRoundState.attributeTypeMap;
    }
    
    public constructor() {
    }
}

