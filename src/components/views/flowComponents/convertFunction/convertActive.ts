import * as I from "../interfaces";
import { input } from "./../../../Interface";
export function convertActive(mfObj: input.IActive): I.IActiveObject {
    let active: I.IActiveObject = {
        objectType: mfObj.$$metaData.objectType,
        label: mfObj.$$metaData.label,
        flippedHorizontally: mfObj.$$metaData.flippedHorizontally,
        componentType: mfObj.$$metaData.componentType,
        id: mfObj._id,
        type: I.TypeComponents.Active,
        point: {
            x: mfObj.$$metaData.x * 1,
            y: mfObj.$$metaData.y * 1
        },
        size: {
            width: 60,
            height: 60
        },
        guid: mfObj.$$metaData.guid,
        inputChannel: mfObj.$$metaData.inputChannel,
        outputChannel: mfObj.$$metaData.outputChannel
    }
    return active;
}