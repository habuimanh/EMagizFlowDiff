import * as I from "../interfaces";
import { input } from "./../../../Interface";
export function convertFilterObject(mfObj: input.IFilterValidiate): I.IFilterObject {
    let filterObject: I.IFilterObject = {
        objectType: mfObj.$$metaData.objectType,
        label: mfObj.$$metaData.label,
        flippedHorizontally: mfObj.$$metaData.flippedHorizontally,
        componentType: mfObj.$$metaData.componentType,
        id: mfObj._id,
        type: I.TypeComponents.Filter,
        guid: mfObj.$$metaData.guid,
        point: {
            x: mfObj.$$metaData.x * 1,
            y: mfObj.$$metaData.y * 1
        },
        size: {
            width: 60,
            height: 60
        },
        inputChannel: mfObj.$$metaData.inputChannel,
        outputChannel: mfObj.$$metaData.outputChannel,
        discardChannel: mfObj.$$metaData.discardChannel
    }
    return filterObject;
}