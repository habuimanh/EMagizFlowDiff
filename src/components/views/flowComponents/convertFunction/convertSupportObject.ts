import * as I from "../interfaces";
import { input } from "./../../../Interface";
export function convertSupportObject(mfObj: input.IBlockComponent): I.ISupportObject {
    let supportObject: I.ISupportObject = {
        objectType: mfObj.$$metaData.objectType,
        label: mfObj.$$metaData.label,
        flippedHorizontally: mfObj.$$metaData.flippedHorizontally,
        componentType: mfObj.$$metaData.componentType,
        id: mfObj._id,
        type: I.TypeComponents.Rectangle,
        point: {
            x: mfObj.$$metaData.x * 1,
            y: mfObj.$$metaData.y * 1
        },
        guid: mfObj.$$metaData.guid,
        size: {
            width: 80,
            height: 60
        }
    }
    return supportObject;
}