/* tslint:disable */
/* eslint-disable */
/**
 * Head Of TP API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { RoleType } from './RoleType';
import {
    RoleTypeFromJSON,
    RoleTypeFromJSONTyped,
    RoleTypeToJSON,
    RoleTypeToJSONTyped,
} from './RoleType';
import type { VehicleType } from './VehicleType';
import {
    VehicleTypeFromJSON,
    VehicleTypeFromJSONTyped,
    VehicleTypeToJSON,
    VehicleTypeToJSONTyped,
} from './VehicleType';

/**
 * 
 * @export
 * @interface ParticipantResponse
 */
export interface ParticipantResponse {
    /**
     * 
     * @type {string}
     * @memberof ParticipantResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ParticipantResponse
     */
    deviceId: string;
    /**
     * 
     * @type {string}
     * @memberof ParticipantResponse
     */
    name: string;
    /**
     * 
     * @type {VehicleType}
     * @memberof ParticipantResponse
     */
    vehicle: VehicleType;
    /**
     * 
     * @type {RoleType}
     * @memberof ParticipantResponse
     */
    role: RoleType;
    /**
     * 
     * @type {Date}
     * @memberof ParticipantResponse
     */
    createDate: Date;
    /**
     * 
     * @type {Date}
     * @memberof ParticipantResponse
     */
    lastModifiedDate: Date;
}



/**
 * Check if a given object implements the ParticipantResponse interface.
 */
export function instanceOfParticipantResponse(value: object): value is ParticipantResponse {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('deviceId' in value) || value['deviceId'] === undefined) return false;
    if (!('name' in value) || value['name'] === undefined) return false;
    if (!('vehicle' in value) || value['vehicle'] === undefined) return false;
    if (!('role' in value) || value['role'] === undefined) return false;
    if (!('createDate' in value) || value['createDate'] === undefined) return false;
    if (!('lastModifiedDate' in value) || value['lastModifiedDate'] === undefined) return false;
    return true;
}

export function ParticipantResponseFromJSON(json: any): ParticipantResponse {
    return ParticipantResponseFromJSONTyped(json, false);
}

export function ParticipantResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ParticipantResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'deviceId': json['deviceId'],
        'name': json['name'],
        'vehicle': VehicleTypeFromJSON(json['vehicle']),
        'role': RoleTypeFromJSON(json['role']),
        'createDate': (new Date(json['createDate'])),
        'lastModifiedDate': (new Date(json['lastModifiedDate'])),
    };
}

export function ParticipantResponseToJSON(json: any): ParticipantResponse {
    return ParticipantResponseToJSONTyped(json, false);
}

export function ParticipantResponseToJSONTyped(value?: ParticipantResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'deviceId': value['deviceId'],
        'name': value['name'],
        'vehicle': VehicleTypeToJSON(value['vehicle']),
        'role': RoleTypeToJSON(value['role']),
        'createDate': ((value['createDate']).toISOString()),
        'lastModifiedDate': ((value['lastModifiedDate']).toISOString()),
    };
}

