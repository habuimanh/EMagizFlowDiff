/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class OverViewBar extends React.Component<{
    propotionWidth: number, data: I.IObject,
    hightlightStyle: any, version: string
}, {}>{
    render() {
        let style = {
            position: "absolute",
            left: this.props.data.point.x * this.props.propotionWidth,
            width: this.props.data.size.width * this.props.propotionWidth,
            top: 0,
            height: 11,
            backgroundColor: this.props.hightlightStyle,
            margin: 2
        }
        if (this.props.version === "older") {
            style.top = 15
        }
        return (
            <div key={this.props.data.id} style={style}>
            </div>
        )
    }
}