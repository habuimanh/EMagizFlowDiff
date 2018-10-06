import { single } from "../Interface"

export function loadChannel(object): single.IChannel {
    let channelObject = object;
    let result: single.IChannel = {
        guid: channelObject.$$metaData.guid,
        componentType: channelObject.$$metaData.componentType,
        objectType: channelObject.$$metaData.objectType,
        id: channelObject._id,
        iSI_interceptors: channelObject.SI_interceptors && channelObject.SI_interceptors.map(SI_interceptor => loadSIInterceptor(SI_interceptor))
    }
    for (let i in object) {
        if (i != '$$metaData' && i != "_id" && i != "SI_interceptors") {
            result[i] = object[i];
        }
    } return result;
}

export function loadSIInterceptor(object): single.ISIChannel {
    let result: single.ISIChannel = {
        guid: object.$$metaData.guid,
        objectType: object.$$metaData.objectType,
        channel: object._channel
    }
    for (let i in object) {
        if (i != '$$metaData' && i != "_channel") {
            result[i] = object[i];
        }
    } return result;
}