/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class Annotation extends React.Component<{ highlightedId: string, data: I.IAnnotation }, {}>{
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
                        <rect x="2" y="2" width={style.width} height={style.height} fill="white" style={{ stroke: "#ffa500", strokeWidth: 2 }}></rect> :
                        <rect x="2" y="2" width={style.width} height={style.height} fill="white"></rect>
                    }<rect x="3" y="3" width={style.width - 2} height={style.height - 2} fill="white" style={{ strokeWidth: 1, stroke: "#ff8000" }}></rect>
                </svg>
                <div className="content-wrapper">
                    <div className="item-wrapper" style={{ height: style.height }}>
                        <div className="text-wrapper">
                            <label>{this.props.data.documentation}</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}