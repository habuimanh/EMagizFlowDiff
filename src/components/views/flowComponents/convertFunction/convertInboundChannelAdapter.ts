import * as I from "../interfaces";
import { input } from "./../../../Interface";
export function convertInboundChannelAdapter(mfObj: input.IInboundChannelAdpater): I.IInboundChannelAdapter {
    let inboundChannelAdapter: I.IInboundChannelAdapter = {
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
        outputChannel: mfObj.$$metaData.outputChannel,
    }
    if (mfObj.$$metaData.errorChannel) {
        inboundChannelAdapter.errorChannel = mfObj.$$metaData.errorChannel
    }
    return inboundChannelAdapter;
}