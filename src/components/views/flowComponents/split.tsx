/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class Split extends React.Component<{ highlightedId: string, data: I.ISplitObject }, {}>{
    render() {
        let style = {
            top: this.props.data.point.y - 2,
            left: this.props.data.point.x - 2,
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
                <svg width={style.width + 4} height={style.height + 4}>
                    {this.props.data.guid === this.props.highlightedId ?
                        <polygon points="2,15 82,2 82,62 2,49" fill="rgb(24, 46, 128)" transform={transform} style={{ stroke: "#ffa500", strokeWidth: 2 }}></polygon> :
                        <polygon points="2,15 82,2 82,62 2,49" fill="rgb(24, 46, 128)" transform={transform}></polygon>}
                    {this.props.data.flippedHorizontally ?
                        [<circle key="1" r="8" cx="2" cy="32" fill="white"></circle>,
                        <polygon key="2" points="84,28 74,32 84,36" style={{ fill: "white" }} />] :
                        [<circle key="1" r="8" cx="82" cy="32" fill="white"></circle>,
                        <polygon key="2" points="0,28 10,32 0,36" style={{ fill: "white" }} />]}
                </svg>
                <div className="result-wrapper">
                    <label>{this.props.data.label}</label>
                </div>
            </div>
        )
    }
}