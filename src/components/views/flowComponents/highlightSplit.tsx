/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class HighlightSplit extends React.Component<{ data: I.IObject, color: string }, {}>{
    render() {
        let style = {
            top: this.props.data.point.y - 3,
            left: this.props.data.point.x - 3,
            position: "absolute",
            width: this.props.data.size.width,
            height: this.props.data.size.height
        }
        let transform = "";
        if (this.props.data.flippedHorizontally) {
            transform = "rotate(180 42 32)"
        }
        return (
            <div style={style}>
                <svg width={style.width + 6} height={style.height + 6}>
                    <polygon points="0,14 86,0 86,66 0,52" fill={this.props.color} transform={transform}></polygon>
                    {this.props.data.flippedHorizontally ?
                        [<circle key="1" r="8" cx="0" cy="33" fill="white"></circle>,
                        <polygon key="2" points="86,28 76,33 86,38" style={{ fill: "white" }} />] :
                        [<circle key="1" r="8" cx="86" cy="33" fill="white"></circle>,
                        <polygon key="2" points="0,28 10,33 0,38" style={{ fill: "white" }} />]}
                </svg>
            </div>
        )
    }
}