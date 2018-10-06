/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class ReceiveObject extends React.Component<{ highlightedId: string, data: I.IReceiveObject }, {}>{
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
                <svg width={style.width + 4} height={style.height + 8}>
                    {this.props.data.guid === this.props.highlightedId ?
                        [<circle key="2" cx="32" cy="32" r="30" x="0" y="0" fill="rgb(105, 183, 49)" style={{ stroke: "#ffa500", strokeWidth: 2 }}></circle>,
                        <circle key="3" cx="32" cy="152" r="30" x="0" y="0" fill="rgb(105, 183, 49)" style={{ stroke: "#ffa500", strokeWidth: 2 }}></circle>,
                        <rect key="1" x="2" y="32" width="60" height="120" fill="rgb(105, 183, 49)"> </rect>,
                        <line key="4" x1="2" y1="32" x2="2" y2="152" style={{ stroke: "#ffa500", strokeWidth: 2 }}></line>,
                        <line key="5" x1="62" y1="32" x2="62" y2="152" style={{ stroke: "#ffa500", strokeWidth: 2 }}></line>] :
                        [<rect key="1" x="2" y="32" width="60" height="120" fill="rgb(105, 183, 49)"> </rect>,
                        <circle key="2" cx="32" cy="32" r="30" x="0" y="0" fill="rgb(105, 183, 49)"></circle>,
                        <circle key="3" cx="32" cy="152" r="30" x="0" y="0" fill="rgb(105, 183, 49)"></circle>]
                    }<circle cx="32" cy="182" r="8" fill="white"></circle>
                    {this.props.data.errorChannel ? undefined : <circle cx="32" cy="182" r="5" fill="red"></circle>}
                    {this.props.data.flippedHorizontally ?
                        [<circle key="1" cx="0" cy="40" r="8" fill="white"></circle>,
                        <polygon key="2" points="0,144 10,148 0,152" style={{ fill: "white" }} />]
                        : [<circle key="1" cx="62" cy="40" r="8" fill="white"></circle>,
                        <polygon key="2" points="64,144 54,148 64,152" style={{ fill: "white" }} />]}
                </svg>
                <div className="result-wrapper">
                    <label>{this.props.data.label}</label>
                </div>
            </div >
        )
    }
}