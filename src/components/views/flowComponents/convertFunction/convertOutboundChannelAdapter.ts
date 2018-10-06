import * as I from "../interfaces";
import { input } from "./../../../Interface";
export function convertOutboundChannelAdapter(mfObj: input.IOutboundChannelAdapter): I.IOutboundChannelAdapter {
    let outboundChannelAdapter: I.IOutboundChannelAdapter = {
        objectType: mfObj.$$metaData.objectType,
        label: mfObj.$$metaData.label,
        flippedHorizontally: mfObj.$$metaData.flippedHorizontally,
        componentType: mfObj.$$metaData.componentType,
        id: mfObj._id,
        type: I.TypeComponents.Circle,
        point: {
            x: mfObj.$$metaData.x * 1,
            y: mfObj.$$metaData.y * 1
        },
        guid: mfObj.$$metaData.guid,
        size: {
            width: 60,
            height: 60
        },
        inputChannel: mfObj.$$metaData.inputChannel,
    }
    return outboundChannelAdapter;
}