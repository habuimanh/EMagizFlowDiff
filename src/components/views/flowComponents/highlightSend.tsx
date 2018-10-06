/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class HighlightSend extends React.Component<{ data: I.IObject, color: string }, {}>{
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
                    <rect key="1" x="0" y="33" width="66" height="120" fill={this.props.color}> </rect>
                    <circle key="2" cx="33" cy="33" r="33" x="0" y="0" fill={this.props.color}></circle>
                    <circle key="3" cx="33" cy="153" r="33" x="0" y="0" fill={this.props.color}></circle>
                    {this.props.data.flippedHorizontally ?
                        [<circle key="1" cx="60" cy="145" r="8" fill="white"></circle>,
                        <polygon key="2" points="66,33 51,38 66,42" style={{ fill: "white" }} />] :
                        [<circle key="1" cx="2" cy="145" r="8" fill="white"></circle>,
                        <polygon key="2" points="0,33 15,38 0,42" style={{ fill: "white" }} />]}
                </svg>
            </div >
        )
    }
}