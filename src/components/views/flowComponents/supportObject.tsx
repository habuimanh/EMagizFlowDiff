/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class SupportObject extends React.Component<{ highlightedId: string, data: I.ISupportObject }, {}>{
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
                        <rect x="2" y="2" rx="5" ry="5" width="80" height="60" fill="rgb(143, 143, 143)" style={{ stroke: "#ffa500", strokeWidth: 2 }}></rect> :
                        <rect x="2" y="2" rx="5" ry="5" width="80" height="60" fill="rgb(143, 143, 143)"></rect>
                    }
                </svg>
                <div className="result-wrapper">
                    <label>{this.props.data.label}</label>
                </div>
            </div>
        )
    }
}