import * as I from "../interfaces";
import { input } from "./../../../Interface";
export function convertRoute(mfObj: input.IRoute): I.IRouteObject {
    let route: I.IRouteObject = {
        objectType: mfObj.$$metaData.objectType,
        label: mfObj.$$metaData.label,
        flippedHorizontally: mfObj.$$metaData.flippedHorizontally,
        componentType: mfObj.$$metaData.componentType,
        id: mfObj._id,
        type: I.TypeComponents.Route,
        point: {
            x: mfObj.$$metaData.x * 1,
            y: mfObj.$$metaData.y * 1
        },
        guid: mfObj.$$metaData.guid,
        size: {
            width: 60,
            height: 60
        },
        defaultOutputChannel: mfObj.$$metaData.defaultOutputChannel,
        inputChannel: mfObj.$$metaData.inputChannel,
        outputChannels: mfObj.$$metaData.outputChannels
    }
    return route;
}