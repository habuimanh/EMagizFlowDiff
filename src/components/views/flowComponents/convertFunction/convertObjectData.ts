import * as I from "../interfaces";
import { input } from "./../../../Interface";
import dataConvert = require("../convertFunction/indexDataConvert")
export function convertObjectData(revision: input.IInput, listObjectData: I.IObjectDict, listChannelData: I.IChannel[],
    startDict: I.IChannelDict, endDict: I.IChannelDict, startErrorDict: I.IChannelDict) {
    revision.components.forEach(obj => {
        switch (obj.$$metaData.componentType) {
            case "Inbound channel adapter": {
                let inboundChannelAdapter: input.IInboundChannelAdpater = obj as input.IInboundChannelAdpater;
                let dataAfterConvert: I.IInboundChannelAdapter = dataConvert.convertInboundChannelAdapter(inboundChannelAdapter);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                if (!startDict[dataAfterConvert.outputChannel]) {
                    startDict[dataAfterConvert.outputChannel] = new I.IObjectDict()
                }
                startDict[dataAfterConvert.outputChannel][dataAfterConvert.guid] = dataAfterConvert;
                if (dataAfterConvert.errorChannel) {
                    if (!startErrorDict[dataAfterConvert.errorChannel]) {
                        startErrorDict[dataAfterConvert.errorChannel] = new I.IObjectDict()
                    }
                    startErrorDict[dataAfterConvert.errorChannel][dataAfterConvert.guid] = dataAfterConvert;
                }
                break;
            }
            case "Outbound channel adapter": {
                let outboundChannelAdapter: input.IOutboundChannelAdapter = obj as input.IOutboundChannelAdapter;
                let dataAfterConvert: I.IOutboundChannelAdapter = dataConvert.convertOutboundChannelAdapter(outboundChannelAdapter);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                if (!endDict[dataAfterConvert.inputChannel]) {
                    endDict[dataAfterConvert.inputChannel] = new I.IObjectDict()
                }
                endDict[dataAfterConvert.inputChannel][dataAfterConvert.guid] = dataAfterConvert;
                break;
            }
            case "Transformer": {
                let transformer: input.ITransformer = obj as input.ITransformer;
                let dataAfterConvert: I.ITransformer = dataConvert.convertTransformer(transformer);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                if (!startDict[dataAfterConvert.outputChannel]) {
                    startDict[dataAfterConvert.outputChannel] = new I.IObjectDict()
                }
                startDict[dataAfterConvert.outputChannel][dataAfterConvert.guid] = dataAfterConvert;
                if (!endDict[dataAfterConvert.inputChannel]) {
                    endDict[dataAfterConvert.inputChannel] = new I.IObjectDict()
                }
                endDict[dataAfterConvert.inputChannel][dataAfterConvert.guid] = dataAfterConvert;
                break;
            }
            case "Support object": {
                let supportObject: input.IBlockComponent = obj as input.IBlockComponent;
                let dataAfterConvert: I.ISupportObject = dataConvert.convertSupportObject(supportObject);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                break;
            }
            case "Channel": {
                let sIChannel: input.IChannel = obj as input.IChannel;
                listChannelData.push(dataConvert.convertChannel(sIChannel))
                break;
            }
            case "Annotation": {
                let annotation: input.IAnnotation = obj as input.IAnnotation;
                let dataAfterConvert: I.IAnnotation = dataConvert.convertAnnotation(annotation);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                break;
            }
            case "Filter": {
                let filter: input.IFilterValidiate = obj as input.IFilterValidiate;
                let dataAfterConvert: I.IFilterObject = dataConvert.convertFilterObject(filter);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                if (!startDict[dataAfterConvert.outputChannel]) {
                    startDict[dataAfterConvert.outputChannel] = new I.IObjectDict()
                }
                if (dataAfterConvert.outputChannel.toString() === "-1" && dataAfterConvert.discardChannel && dataAfterConvert.discardChannel.toString() === "-1") {
                    startDict[dataAfterConvert.discardChannel][dataAfterConvert.guid + "dC"] = dataAfterConvert;
                    startDict[dataAfterConvert.outputChannel][dataAfterConvert.guid] = dataAfterConvert;
                }
                else {
                    startDict[dataAfterConvert.outputChannel][dataAfterConvert.guid] = dataAfterConvert;
                    if (dataAfterConvert.discardChannel) {
                        if (!startDict[dataAfterConvert.discardChannel]) {
                            startDict[dataAfterConvert.discardChannel] = new I.IObjectDict()
                        }
                        startDict[dataAfterConvert.discardChannel][dataAfterConvert.guid] = dataAfterConvert;
                    }
                }
                if (!endDict[dataAfterConvert.inputChannel]) {
                    endDict[dataAfterConvert.inputChannel] = new I.IObjectDict()
                }
                endDict[dataAfterConvert.inputChannel][dataAfterConvert.guid] = dataAfterConvert;
                break;
            }
            case "Service activator": {
                let active: input.IActive = obj as input.IActive;
                let dataAfterConvert: I.IActiveObject = dataConvert.convertActive(active);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                if (!startDict[dataAfterConvert.outputChannel]) {
                    startDict[dataAfterConvert.outputChannel] = new I.IObjectDict()
                }
                startDict[dataAfterConvert.outputChannel][dataAfterConvert.guid] = dataAfterConvert;
                if (!endDict[dataAfterConvert.inputChannel]) {
                    endDict[dataAfterConvert.inputChannel] = new I.IObjectDict()
                }
                endDict[dataAfterConvert.inputChannel][dataAfterConvert.guid] = dataAfterConvert;
                break;
            }
            case "Splitter": {
                let split: input.ISplit = obj as input.ISplit;
                let dataAfterConvert: I.IActiveObject = dataConvert.convertSplit(split);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                if (!startDict[dataAfterConvert.outputChannel]) {
                    startDict[dataAfterConvert.outputChannel] = new I.IObjectDict()
                }
                startDict[dataAfterConvert.outputChannel][dataAfterConvert.guid] = dataAfterConvert;
                if (!endDict[dataAfterConvert.inputChannel]) {
                    endDict[dataAfterConvert.inputChannel] = new I.IObjectDict()
                }
                endDict[dataAfterConvert.inputChannel][dataAfterConvert.guid] = dataAfterConvert;
                break;
            }
            case "Router": {
                let route: input.IRoute = obj as input.IRoute;
                let dataAfterConvert: I.IRouteObject = dataConvert.convertRoute(route);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                if (dataAfterConvert.defaultOutputChannel) {
                    if (!startDict[dataAfterConvert.defaultOutputChannel]) {
                        startDict[dataAfterConvert.defaultOutputChannel] = new I.IObjectDict()
                    }
                    startDict[dataAfterConvert.defaultOutputChannel][dataAfterConvert.guid] = dataAfterConvert;
                }
                dataAfterConvert.outputChannels.forEach((oCn, index) => {
                    if (!startDict[oCn]) {
                        startDict[oCn] = new I.IObjectDict()
                    }
                    startDict[oCn][dataAfterConvert.guid + "s" + index] = dataAfterConvert;
                })
                if (!endDict[dataAfterConvert.inputChannel]) {
                    endDict[dataAfterConvert.inputChannel] = new I.IObjectDict()
                }
                endDict[dataAfterConvert.inputChannel][dataAfterConvert.guid] = dataAfterConvert;
                break;
            }
            case "Inbound gateway": {
                let receive: input.IReceive = obj as input.IReceive;
                let dataAfterConvert: I.IReceiveObject = dataConvert.convertReceive(receive);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                if (!startDict[dataAfterConvert.outputChannel]) {
                    startDict[dataAfterConvert.outputChannel] = new I.IObjectDict()
                }
                startDict[dataAfterConvert.outputChannel][dataAfterConvert.guid] = dataAfterConvert;
                if (!endDict[dataAfterConvert.inputChannel]) {
                    endDict[dataAfterConvert.inputChannel] = new I.IObjectDict()
                }
                endDict[dataAfterConvert.inputChannel][dataAfterConvert.guid] = dataAfterConvert;
                if (dataAfterConvert.errorChannel) {
                    if (!startErrorDict[dataAfterConvert.errorChannel]) {
                        startErrorDict[dataAfterConvert.errorChannel] = new I.IObjectDict()
                    }
                    startErrorDict[dataAfterConvert.errorChannel][dataAfterConvert.guid] = dataAfterConvert;
                }
                break;
            }
            case "Outbound gateway": {
                let send: input.ISend = obj as input.ISend;
                let dataAfterConvert: I.ISendObject = dataConvert.convertSendObject(send);
                listObjectData[dataAfterConvert.guid] = dataAfterConvert;
                if (!startDict[dataAfterConvert.outputChannel]) {
                    startDict[dataAfterConvert.outputChannel] = new I.IObjectDict()
                }
                startDict[dataAfterConvert.outputChannel][dataAfterConvert.guid] = dataAfterConvert;
                if (!endDict[dataAfterConvert.inputChannel]) {
                    endDict[dataAfterConvert.inputChannel] = new I.IObjectDict()
                }
                endDict[dataAfterConvert.inputChannel][dataAfterConvert.guid] = dataAfterConvert;
                break;
            }
        }
    })
}