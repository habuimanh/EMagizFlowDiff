/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class ChannelNUllOrigin extends React.Component<{
    idChannel: string, destination: I.IObject,
    colorStroke: string, onSelectObject: (id: string) => void,
    setShowDiff: () => void, guid: string
}, {}>{
    onClick(e: React.MouseEvent) {
        this.props.onSelectObject(this.props.guid);
        e.stopPropagation();
    }
    render() {
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
        let origin = {
            x: this.props.destination.flippedHorizontally ? destination.x + 40 : destination.x - 40,
            y: destination.y,
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
        if ((this.props.destination.flippedHorizontally && this.props.destination.type != I.TypeComponents.Receive) ||
            (this.props.destination.flippedHorizontally && this.props.destination.type === I.TypeComponents.Receive)) {
            transform = "rotate(180 " + (destination.x - minX + 10).toString() + " " + (destination.y - minY + 10).toString() + ")";
        }
        return (
            <div style={style} >
                <svg width={style.width} height={style.height}>
                    <line onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} x1={origin.x - minX + 10} y1={origin.y - minY + 10}
                        x2={(this.props.destination.flippedHorizontally && this.props.destination.type != I.TypeComponents.Receive) ||
                            (this.props.destination.flippedHorizontally && this.props.destination.type === I.TypeComponents.Receive) ?
                            destination.x - minX + 17 : destination.x - minX + 3} y2={destination.y - minY + 10} style={{ stroke: this.props.colorStroke, strokeWidth: 2 }} />
                    <circle onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} r="5" cx={origin.x - minX + 10} cy={origin.y - minY + 10} fill="grey" style={this.props.colorStroke === "grey" ? undefined : { stroke: this.props.colorStroke, strokeWidth: 2 }}></circle>
                    <polygon onClick={this.onClick.bind(this)} onDoubleClick={this.props.setShowDiff} points={polygonInside} fill="grey" style={this.props.colorStroke === "grey" ? undefined : { stroke: this.props.colorStroke, strokeWidth: 2 }} transform={transform} />
                </svg>
            </div>
        )
    }
}