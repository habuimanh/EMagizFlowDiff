import * as I from "../interfaces";
import { input } from "./../../../Interface";
export function convertChannel(mfObj: input.IChannel): I.ISIChannel {
    let channel: I.ISIChannel = {
        objectType: mfObj.$$metaData.objectType,
        componentType: mfObj.$$metaData.componentType,
        guid: mfObj.$$metaData.guid,
        id: mfObj._id,
        siInterceptors: mfObj.$$metaData.interceptors
    }
    return channel;
}