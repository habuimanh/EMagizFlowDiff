/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class OutboundChannelAdapter extends React.Component<{ highlightedId: string, data: I.IOutboundChannelAdapter }, {}>{
    render() {
        let style = {
            top: this.props.data.point.y - 2,
            left: this.props.data.point.x - 2,
            width: this.props.data.size.width,
            height: this.props.data.size.height,
            position: "absolute",
        }
        return (
            <div style={style}>
                <svg width={style.width + 4} height={style.height + 4}>
                    {this.props.data.guid === this.props.highlightedId ?
                        <circle cx="32" cy="32" r="30" x="0" y="0" fill="rgb(105, 183, 49)" style={{ stroke: "#ffa500", strokeWidth: 2 }}></circle> :
                        <circle cx="32" cy="32" r="30" x="0" y="0" fill="rgb(105, 183, 49)"></circle>}
                    <circle cx="32" cy="32" r="25" x="0" y="0" fill="white"></circle>
                    {this.props.data.flippedHorizontally ? <polygon points="64,28 54,32 64,36" style={{ fill: "white" }} />
                        : <polygon points="0,28 10,32 0,36" style={{ fill: "white" }} />}
                </svg>
                <div className="result-wrapper">
                    <label>{this.props.data.label}</label>
                </div>
            </div>
        )
    }
}