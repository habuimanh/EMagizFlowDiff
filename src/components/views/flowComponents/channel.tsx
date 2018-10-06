/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class Channel extends React.Component<{
    idChannel: string, origin: I.IObject, destination: I.IObject,
    colorStroke: string, onSelectObject: (id: string) => void,
    setShowDiff: () => void, guid: string
}, {}>{
    onClick(e: React.MouseEvent) {
        this.props.onSelectObject(this.props.guid);
        e.stopPropagation();
    }
    render() {
        let origin = {
            x: this.props.origin.flippedHorizontally ? this.props.origin.point.x : this.props.origin.point.x + this.props.origin.size.width,
            y: this.props.origin.point.y + this.props.origin.size.height / 2,
        }
        if (this.props.origin.type === I.TypeComponents.Route) {
            let route = this.props.origin as I.IRouteObject;
            route.outputChannels.forEach((oCn, index) => {
                if (oCn === this.props.idChannel) origin.y = (this.props.origin.point.y + this.props.origin.size.height) + 11 * index;
            })
        } else if (this.props.origin.type === I.TypeComponents.Receive) {
            origin.y = this.props.origin.point.y + 38
        } else if (this.props.origin.type === I.TypeComponents.Send) {
            origin.y = this.props.origin.point.y + 142;
            origin.x = this.props.origin.flippedHorizontally ? this.props.origin.point.x + this.props.origin.size.width : this.props.origin.point.x
        } else if (this.props.origin.type === I.TypeComponents.Filter
            && this.props.origin["discardChannel"] && this.props.origin["discardChannel"] === this.props.idChannel) {
            origin.y = this.props.origin.point.y + 57;
            origin.x = this.props.origin.point.x + 30;
        }
        let destination = {
            x: this.props.destination.flippedHorizontally ? this.props.destination.point.x + this.props.destination.size.width : this.props.destination.point.x,
            y: this.props.destination.point.y + this.props.destination.size.height / 2,
        }
        if (this.props.destination.type === I.TypeComponents.Receive) {
            destination.y = this.props.destination.point.y + 146
            destination.x = this.props.destination.flippedHorizontally ? this.props.destination.point.x : this.props.destination.point.x + this.props.destination.size.width
        }
        if (this.props.destination.type === I.TypeComponents.Send) {
            destination.y = this.props.destination.point.y + 34
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
                <div onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} className="line" style={{ position: "absolute", transform: transform, width: length, left: origin.x, top: origin.y - 1, background: this.props.colorStroke }}>
                    <div style={{ background: this.props.colorStroke, width: 10, height: 10, position: "absolute", top: -4, left: -4, "border-radius": "50%" }}></div>
                </div>
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