/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class ChannelSIWireTap extends React.Component<{
    colorStroke: string, onSelectObject: (id: string) => void,
    setShowDiff: () => void,
    origin?: I.IObject, destinationMediate?: I.IObject
    , destination: I.IObject, idChannel: string, guid: string
}, {}>{
    onClick(e: React.MouseEvent) {
        this.props.onSelectObject(this.props.guid);
        e.stopPropagation();
    }
    render() {
        let origin = { x: 0, y: 0, width: 0, height: 0 };
        let destinationMediate: I.IPoint = { x: 0, y: 0 }
        if (this.props.destinationMediate) {
            destinationMediate.x = this.props.destinationMediate.point.x;
            destinationMediate.y = this.props.destinationMediate.point.y;
        } else {
            destinationMediate.x = this.props.origin!.point.x + this.props.origin!.size.width + 35;
            destinationMediate.y = this.props.origin!.point.y;
        }
        if (this.props.origin) {
            origin.x = this.props.origin.point.x;
            origin.y = this.props.origin.point.y;
            origin.width = this.props.origin.size.width;
            origin.height = this.props.origin.size.height;
        } else {
            origin.x = this.props.destinationMediate!.point.x - 100;
            origin.y = this.props.destinationMediate!.point.y;
            origin.width = 60;
            origin.height = 60;
        }
        let style = {
            position: "absolute",
            top: ((destinationMediate.y
                + (origin.y + origin.height)) / 2),
            left: ((destinationMediate.x
                + (origin.x + origin.width)) / 2),
            width: 0,
            height: this.props.destination.point.y - origin.y + 20
        }
        origin.x = style.left - 2;
        origin.y = style.top - 2;
        style.width = this.props.destination.point.x - style.left + 10;
        const destination = {
            x: this.props.destination.flippedHorizontally ? this.props.destination.point.x + this.props.destination.size.width : this.props.destination.point.x,
            y: this.props.destination.point.y + this.props.destination.size.height / 2
        }
        let transformPolygon = "";
        if ((this.props.destination.flippedHorizontally && this.props.destination.type != I.TypeComponents.Receive) ||
            (!this.props.destination.flippedHorizontally && this.props.destination.type === I.TypeComponents.Receive)) {
            transformPolygon = "rotate(180deg)";
        }
        let destinationX = destination.x - 8;
        if ((this.props.destination.flippedHorizontally && this.props.destination.type != I.TypeComponents.Receive) ||
            (!this.props.destination.flippedHorizontally && this.props.destination.type === I.TypeComponents.Receive))
            destinationX = destination.x + 8;
        var length = Math.sqrt((origin.x - destinationX) * (origin.x - destinationX) + (origin.y - destination.y) * (origin.y - destination.y));
        var angle = Math.atan2(destination.y - origin.y, destinationX - origin.x) * 180 / Math.PI;
        var transform = 'rotate(' + angle + 'deg)';
        const leftPolygon = (this.props.destination.flippedHorizontally && this.props.destination.type != I.TypeComponents.Receive) ||
            (!this.props.destination.flippedHorizontally && this.props.destination.type === I.TypeComponents.Receive) ?
            destination.x : destination.x - 8;
        return (
            <div>
                <div onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} className="line" style={{
                    position: "absolute", transform: transform, width: length, left: origin.x, top: origin.y - 1, background: this.props.colorStroke === "grey" ? "white" : this.props.colorStroke, border: "1.3px dashed"
                }}>
                    < div style={{ background: this.props.colorStroke, width: 10, height: 10, position: "absolute", top: -6, left: -4, "border-radius": "50%" }}></div>
                </div >
                <div onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} style={{
                    transform: transformPolygon,
                    top: destination.y - 5, left: leftPolygon, position: "absolute", "border-top": "5px solid transparent",
                    "border-left": "10px solid " + this.props.colorStroke,
                    "border-bottom": "5px solid transparent"
                }}></div>
            </div >
        )
    }
}