/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class HighlightRectangle extends React.Component<{ data: I.IObject, color: string }, {}>{
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
                    <rect x="0" y="0" rx="5" ry="5" width={this.props.data.size.width + 6} height={this.props.data.size.height + 6} fill={this.props.color}></rect>
                    {this.props.data.componentType === "Transformer" ? (
                        this.props.data.flippedHorizontally ?
                            [<circle key="1" r="8" cx="0" cy="33" fill="white"></circle>,
                            <polygon key="2" points="86,28 76,33 86,38" style={{ fill: "white" }} />] :
                            [<circle key="1" r="8" cx="86" cy="33" fill="white"></circle>,
                            <polygon key="2" points="0,28 10,33 0,38" style={{ fill: "white" }} />]
                    ) : undefined}
                </svg>
            </div>
        )
    }
}