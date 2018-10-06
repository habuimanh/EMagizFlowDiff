import * as I from "../interfaces";
import { input } from "./../../../Interface";
export function convertTransformer(mfObj: input.ITransformer): I.ITransformer {
    let transformer: I.ITransformer = {
        objectType: mfObj.$$metaData.objectType,
        label: mfObj.$$metaData.label,
        flippedHorizontally: mfObj.$$metaData.flippedHorizontally,
        componentType: mfObj.$$metaData.componentType,
        id: mfObj._id,
        point: {
            x: mfObj.$$metaData.x * 1,
            y: mfObj.$$metaData.y * 1
        },
        guid: mfObj.$$metaData.guid,
        type: I.TypeComponents.Rectangle,
        size: {
            width: 80,
            height: 60
        },
        inputChannel: mfObj.$$metaData.inputChannel,
        outputChannel: mfObj.$$metaData.outputChannel
    }
    return transformer;
}