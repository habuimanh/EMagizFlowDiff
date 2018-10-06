/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class HighlightFilter extends React.Component<{ data: I.IObject, color: string }, {}>{
    render() {
        let style = {
            top: this.props.data.point.y - 3,
            left: this.props.data.point.x - 3,
            width: this.props.data.size.width,
            height: this.props.data.size.height,
            position: "absolute",
        }
        let pointDiamond: string =
            (style.width / 2 + 3).toString() + "," +
            (style.height + 1).toString() + " " +
            (style.width / 2 + 8).toString() + "," +
            (style.height + 6).toString() + " " +
            (style.width / 2 + 3).toString() + "," +
            (style.height + 11).toString() + " " +
            (style.width / 2 - 2).toString() + "," +
            (style.height + 6).toString() + " ";
        return (
            <div style={style}>
                <svg width={style.width + 6} height={style.height + 6}>
                    <rect x="0" y="0" rx="4" ry="4" width={this.props.data.size.width + 6} height={this.props.data.size.height / 2 + 3} fill={this.props.color}></rect>
                    <polygon points="0,33 66,33 33,66" fill={this.props.color}></polygon>
                    <polygon points={pointDiamond} fill="white"></polygon>
                    {this.props.data.flippedHorizontally ?
                        [<circle key="1" r="7" cx={3} cy={style.height / 2 + 3} fill="white"></circle>,
                        <polygon key="2" points="66,28 56,33 66,38" style={{ fill: "white" }} />] :
                        [<circle key="1" r="7" cx={style.width + 6} cy={style.height / 2 + 3} fill="white"></circle>,
                        <polygon key="2" points="0,28 10,33 0,38" style={{ fill: "white" }} />]}
                </svg>
            </div>
        )
    }
}