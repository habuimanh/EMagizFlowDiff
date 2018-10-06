/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class HighlightActive extends React.Component<{ data: I.IObject, color: string }, {}>{
    render() {
        let style = {
            top: this.props.data.point.y - 6,
            left: this.props.data.point.x - 6,
            width: this.props.data.size.width,
            height: this.props.data.size.height,
            position: "absolute",
        }
        return (
            <div style={style}>
                <svg width={style.width + 12} height={style.height + 12}>
                    <circle cx="36" cy="36" r="33" x="0" y="0" fill={this.props.color}></circle>
                    {this.props.data.flippedHorizontally ?
                        [<circle key="1" r="8" cx="6" cy="36" fill="white"></circle>,
                        <polygon key="2" points="72,29 62,36 72,43" style={{ fill: "white" }} />] :
                        [<circle key="1" r="8" cx="66" cy="36" fill="white"></circle>,
                        <polygon key="2" points="0,29 10,36 0,43" style={{ fill: "white" }} />]}
                </svg>
            </div >
        )
    }
}