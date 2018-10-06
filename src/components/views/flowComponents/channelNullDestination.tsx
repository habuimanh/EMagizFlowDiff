/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class ChannelNullDestination extends React.Component<{
    idChannel: string, origin: I.IObject, colorStroke: string, onSelectObject: (id: string) => void,
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
            x: this.props.origin.flippedHorizontally ? origin.x - 40 : origin.x + 40,
            y: origin.y
        }
        let minX = Math.min(origin.x, destination.x);
        let maxX = Math.max(origin.x, destination.x);
        let minY = Math.min(origin.y, destination.y);
        let maxY = Math.max(origin.y, destination.y);
        let style = {
            position: "absolute",
            top: minY - 10,
            left: minX - 10,
            width: maxX - minX + 20,
            height: maxY - minY + 20
        }
        let polygonInside: string =
            (destination.x - minX + 3).toString() + "," +
            (destination.y - minY + 6).toString() + " " +
            (destination.x - minX + 12).toString() + "," +
            (destination.y - minY + 10).toString() + " " +
            (destination.x - minX + 3).toString() + "," +
            (destination.y - minY + 14).toString();
        let transform = "";
        if ((this.props.origin.flippedHorizontally && this.props.origin.type != I.TypeComponents.Receive) ||
            (this.props.origin.flippedHorizontally && this.props.origin.type === I.TypeComponents.Receive)) {
            transform = "rotate(180 " + (destination.x - minX + 10).toString() + " " + (destination.y - minY + 10).toString() + ")";
        }
        return (
            <div style={style} >
                <svg width={style.width} height={style.height}>
                    <line onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} x1={origin.x - minX + 10} y1={origin.y - minY + 10}
                        x2={(this.props.origin.flippedHorizontally && this.props.origin.type != I.TypeComponents.Receive) ||
                            (this.props.origin.flippedHorizontally && this.props.origin.type === I.TypeComponents.Receive) ?
                            destination.x - minX + 17 : destination.x - minX + 3} y2={destination.y - minY + 10} style={{ stroke: this.props.colorStroke, strokeWidth: 2 }} />
                    {this.props.origin["discardChannel"] && this.props.origin["discardChannel"] === this.props.idChannel ? undefined :
                        this.props.origin.type === I.TypeComponents.Route ? (this.props.origin["outputChannel"] === this.props.idChannel ? <circle onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} r="5" cx={origin.x - minX + 10} cy={origin.y - minY + 10} fill="grey" style={this.props.colorStroke === "grey" ? undefined : { stroke: this.props.colorStroke, strokeWidth: 2 }}></circle>
                            : <circle onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} r="5" cx={origin.x - minX + 10} cy={origin.y - minY + 10} fill="#572055" style={this.props.colorStroke === "grey" ? undefined : { stroke: this.props.colorStroke, strokeWidth: 2 }}></circle>)
                            : <circle onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} r="5" cx={origin.x - minX + 10} cy={origin.y - minY + 10} fill="grey" style={this.props.colorStroke === "grey" ? undefined : { stroke: this.props.colorStroke, strokeWidth: 2 }}></circle>}
                    <polygon onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} points={polygonInside} fill="grey" style={this.props.colorStroke === "grey" ? undefined : { stroke: this.props.colorStroke, strokeWidth: 2 }} transform={transform} />
                </svg>
            </div>
        )
    }
}