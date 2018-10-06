import * as I from "../interfaces";
import { input } from "./../../../Interface";
export function convertReceive(mfObj: input.IReceive): I.IReceiveObject {
    let route: I.IReceiveObject = {
        objectType: mfObj.$$metaData.objectType,
        label: mfObj.$$metaData.label,
        flippedHorizontally: mfObj.$$metaData.flippedHorizontally,
        componentType: mfObj.$$metaData.componentType,
        id: mfObj._id,
        type: I.TypeComponents.Receive,
        point: {
            x: mfObj.$$metaData.x * 1,
            y: mfObj.$$metaData.y * 1
        },
        guid: mfObj.$$metaData.guid,
        size: {
            width: 60,
            height: 180
        },
        inputChannel: mfObj.$$metaData.inputChannel,
        outputChannel: mfObj.$$metaData.outputChannel,
        errorChannel: mfObj.$$metaData.errorChannel
    }
    return route;
}