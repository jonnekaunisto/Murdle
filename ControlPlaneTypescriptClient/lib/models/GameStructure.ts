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

import { PublicUser } from './PublicUser';
import { Round } from './Round';
import { Score } from './Score';
import { HttpFile } from '../http/http';

export class GameStructure {
    'gameId': string;
    'scores': Array<Score>;
    'players': Array<PublicUser>;
    'totalRounds': number;
    'rounds': Array<Round>;

    static readonly discriminator: string | undefined = undefined;

    static readonly attributeTypeMap: Array<{name: string, baseName: string, type: string, format: string}> = [
        {
            "name": "gameId",
            "baseName": "gameId",
            "type": "string",
            "format": ""
        },
        {
            "name": "scores",
            "baseName": "scores",
            "type": "Array<Score>",
            "format": ""
        },
        {
            "name": "players",
            "baseName": "players",
            "type": "Array<PublicUser>",
            "format": ""
        },
        {
            "name": "totalRounds",
            "baseName": "totalRounds",
            "type": "number",
            "format": "int32"
        },
        {
            "name": "rounds",
            "baseName": "rounds",
            "type": "Array<Round>",
            "format": ""
        }    ];

    static getAttributeTypeMap() {
        return GameStructure.attributeTypeMap;
    }
    
    public constructor() {
    }
}

