/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class Route extends React.Component<{ highlightedId: string, data: I.IRouteObject }, {}>{
    render() {
        let style = {
            top: this.props.data.point.y - 2,
            left: this.props.data.point.x - 6,
            width: this.props.data.size.width,
            height: this.props.data.size.height,
            position: "absolute",
        }
        return (
            <div style={style}>
                <svg width={style.width + 14} height={style.height + 4}>
                    {this.props.data.guid === this.props.highlightedId ?
                        <rect x="14" y="11" rx="4" ry="4" width="43" height="43" fill="#fed60f" transform="rotate(45,37,32)"
                            style={{ stroke: "#ffa500", strokeWidth: 2 }}></rect> :
                        <rect x="14" y="11" rx="4" ry="4" width="43" height="43" fill="#fed60f" transform="rotate(45,37,32)"></rect>
                    }
                    {this.props.data.flippedHorizontally ?
                        [<circle key="1" r="8" cx="6" cy="32" fill="white"></circle>,
                        <polygon key="2" points="68,28 58,32 68,36" style={{ fill: "white" }} />,
                        <circle key="3" r="6" cx="6" cy="18" stroke="#cd9dcb" strokeWidth={1} fill="white"></circle>,
                        <circle key="4" r="1" cx="6" cy="18" fill="#cd9dcb"></circle>,
                        <circle key="5" r="5" cx="6" cy="32" fill="grey"></circle>]
                        : [<circle key="1" r="8" cx="66" cy="32" fill="white"></circle>,
                        <polygon key="2" points="4,28 14,32 4,36" style={{ fill: "white" }} ></polygon>,
                        <circle key="5" r="5" cx="66" cy="32" fill="grey"></circle>,
                        <circle key="3" r="6" cx="66" cy="18" stroke="#cd9dcb" strokeWidth={1} fill="white"></circle>,
                        <circle key="4" r="1" cx="66" cy="18" fill="#cd9dcb"></circle>]}
                </svg>
                <div className="result-wrapper">
                    <label>{this.props.data.label}</label>
                </div>
            </div>
        )
    }
}