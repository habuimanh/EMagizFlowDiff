/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class FilterValidiate extends React.Component<{ highlightedId: string, data: I.IFilterObject }, {}>{
    render() {
        let style = {
            top: this.props.data.point.y - 2,
            left: this.props.data.point.x - 2,
            width: this.props.data.size.width,
            height: this.props.data.size.height,
            position: "absolute",
        }
        let pointDiamond: string =
            (style.width / 2 + 2).toString() + "," +
            (style.height - 6).toString() + " " +
            (style.width / 2 + 10).toString() + "," +
            (style.height + 2).toString() + " " +
            (style.width / 2 + 2).toString() + "," +
            (style.height + 10).toString() + " " +
            (style.width / 2 - 6).toString() + "," +
            (style.height + 2).toString() + " ";
        let diamondInside: string =
            (style.width / 2 + 2).toString() + "," +
            (style.height - 3).toString() + " " +
            (style.width / 2 + 7).toString() + "," +
            (style.height + 2).toString() + " " +
            (style.width / 2 + 2).toString() + "," +
            (style.height + 7).toString() + " " +
            (style.width / 2 - 3).toString() + "," +
            (style.height + 2).toString() + " ";
        return (
            <div style={style}>
                <svg width={style.width + 4} height={style.height + 7}>
                    {this.props.data.guid === this.props.highlightedId ?
                        [<rect key="1" x="2" y="2" rx="4" ry="4" width="60" height="30" fill="#fed60f"></rect>,
                        <polygon key="2" points="2,32 62,32 32,62" fill="#fed60f"></polygon>,
                        <line key="3" style={{ stroke: "#ffa500", strokeWidth: 2 }} x1="2" y1="32" x2="32" y2="62"></line>,
                        <line key="4" style={{ stroke: "#ffa500", strokeWidth: 2 }} x1="62" y1="32" x2="32" y2="62"></line>,
                        <line key="5" style={{ stroke: "#ffa500", strokeWidth: 2 }} x1="2" y1="2" x2="62" y2="2"></line>,
                        <line key="6" style={{ stroke: "#ffa500", strokeWidth: 2 }} x1="2" y1="2" x2="2" y2="32"></line>,
                        <line key="7" style={{ stroke: "#ffa500", strokeWidth: 2 }} x1="62" y1="2" x2="62" y2="32"></line>,] :
                        [<rect key="1" x="2" y="2" rx="4" ry="4" width="60" height="30" fill="#fed60f"></rect>,
                        <polygon key="2" points="2,32 62,32 32,62" fill="#fed60f"></polygon>]
                    }
                    <polygon points={pointDiamond} fill="white"></polygon>
                    <polygon points={diamondInside} fill="grey"></polygon>
                    {this.props.data.flippedHorizontally ? [<circle r="7" cx={2} cy={style.height / 2 + 2} fill="white" />,
                    <polygon key="2" points="64,28 54,32 64,36" style={{ fill: "white" }} />]
                        : [<circle r="7" cx={style.width + 2} cy={style.height / 2 + 2} fill="white"></circle>,
                        <polygon key="2" points="0,28 10,32 0,36" style={{ fill: "white" }} />]}
                </svg>
                <div className="result-wrapper">
                    <label>{this.props.data.label}</label>
                </div>
            </div>
        )
    }
}