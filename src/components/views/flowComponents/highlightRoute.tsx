/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class HighlightRoute extends React.Component<{ data: I.IObject, color: string }, {}>{
    render() {
        let style = {
            top: this.props.data.point.y - 3,
            left: this.props.data.point.x - 3,
            width: this.props.data.size.width,
            height: this.props.data.size.height,
            position: "absolute",
        }
        return (
            <div style={style}>
                <svg width={style.width + 6} height={style.height + 6}>
                    <rect x="9" y="8" rx="4" ry="3" width="48" height="48" fill={this.props.color} transform="rotate(45,32,32)"></rect>
                    {this.props.data.flippedHorizontally ?
                        [<circle key="1" r="8" cx="0" cy="36" fill="white"></circle>,
                        <polygon key="2" points="72,29 62,33 72,37" style={{ fill: "white" }} />] :
                        [<circle key="1" r="8" cx="66" cy="36" fill="white"></circle>,
                        <polygon key="2" points="0,29 10,33 0,37" style={{ fill: "white" }} />]}
                </svg>
            </div>
        )
    }
}