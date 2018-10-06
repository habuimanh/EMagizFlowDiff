import * as I from "./interfaces";
import * as React from "react";
import * as  EMagizComponent from "./indexComponents";
function renderStaticCpn(data: I.IObject, highlightedId: string) {
    switch (data.componentType) {
        case "Inbound channel adapter": {
            return <EMagizComponent.InboundChannelAdapter data={data as I.IInboundChannelAdapter} highlightedId={highlightedId} />
        }
        case "Outbound channel adapter": {
            return (<EMagizComponent.OutboundChannelAdapter highlightedId={highlightedId} data={data as I.IOutboundChannelAdapter} />
            )
        }
        case "Support object": {
            return (<EMagizComponent.SupportObject highlightedId={highlightedId} data={data as I.ISupportObject} />)
        }
        case "Transformer": {
            return (<EMagizComponent.Transformer highlightedId={highlightedId} data={data as I.ITransformer} />)
        }
        case "Annotation": {
            return (<EMagizComponent.Annotation highlightedId={highlightedId} data={data as I.IAnnotation} />)
        }
        case "Filter": {
            return (<EMagizComponent.FilterValidiate highlightedId={highlightedId} data={data as I.IFilterObject} />)
        }
        case "Service activator": {
            return (<EMagizComponent.Active highlightedId={highlightedId} data={data as I.IActiveObject} />)
        }
        case "Splitter": {
            return (<EMagizComponent.Split highlightedId={highlightedId} data={data as I.ISplitObject} />)
        }
        case "Router": {
            return (<EMagizComponent.Route highlightedId={highlightedId} data={data as I.IRouteObject} />)
        }
        case "Inbound gateway": {
            return (<EMagizComponent.ReceiveObject highlightedId={highlightedId} data={data as I.IReceiveObject} />)
        }
        case "Outbound gateway": {
            return (<EMagizComponent.SendObject highlightedId={highlightedId} data={data as I.ISendObject} />)
        }
        default: {
            return (
                <div />
            )
        }
    }
}
export class EMagizObject extends React.Component<{ setShowDiff: () => void, data: I.IObject, highlightedId: string, onSelectObject: (id: string) => void }, {}>{
    onClick(e: React.MouseEvent) {
        this.props.onSelectObject(this.props.data.guid);
        e.stopPropagation();
    }
    render() {
        return <div onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff}>
            {renderStaticCpn(this.props.data, this.props.highlightedId)}
        </div>
    }
}