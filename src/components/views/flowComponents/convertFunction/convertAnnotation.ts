import * as I from "../interfaces";
import { input } from "./../../../Interface";
export function convertAnnotation(mfObj: input.IAnnotation): I.IAnnotation {
    let annotation: I.IAnnotation = {
        objectType: mfObj.$$metaData.objectType,
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
            width: 100,
            height: 60
        },
        documentation: mfObj._documentation
    }
    return annotation;
}