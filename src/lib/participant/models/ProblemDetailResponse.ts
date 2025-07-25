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
/**
 * 
 * @export
 * @interface ProblemDetailResponse
 */
export interface ProblemDetailResponse {
    /**
     * A short, human-readable summary of the problem type
     * @type {string}
     * @memberof ProblemDetailResponse
     */
    title: string;
    /**
     * The HTTP status code generated by the origin server for this occurrence of the problem
     * @type {number}
     * @memberof ProblemDetailResponse
     */
    status: number;
    /**
     * A human-readable explanation specific to this occurrence of the problem
     * @type {string}
     * @memberof ProblemDetailResponse
     */
    detail: string;
    /**
     * A URI reference that identifies the specific occurrence of the problem
     * @type {string}
     * @memberof ProblemDetailResponse
     */
    instance: string;
}

/**
 * Check if a given object implements the ProblemDetailResponse interface.
 */
export function instanceOfProblemDetailResponse(value: object): value is ProblemDetailResponse {
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('status' in value) || value['status'] === undefined) return false;
    if (!('detail' in value) || value['detail'] === undefined) return false;
    if (!('instance' in value) || value['instance'] === undefined) return false;
    return true;
}

export function ProblemDetailResponseFromJSON(json: any): ProblemDetailResponse {
    return ProblemDetailResponseFromJSONTyped(json, false);
}

export function ProblemDetailResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProblemDetailResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'],
        'status': json['status'],
        'detail': json['detail'],
        'instance': json['instance'],
    };
}

export function ProblemDetailResponseToJSON(json: any): ProblemDetailResponse {
    return ProblemDetailResponseToJSONTyped(json, false);
}

export function ProblemDetailResponseToJSONTyped(value?: ProblemDetailResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'title': value['title'],
        'status': value['status'],
        'detail': value['detail'],
        'instance': value['instance'],
    };
}

