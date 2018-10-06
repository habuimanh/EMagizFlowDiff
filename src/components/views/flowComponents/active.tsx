import * as React from "react";
import * as I from "./interfaces";
export class Active extends React.Component<{ highlightedId: string, data: I.IActiveObject }, {}>{
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
                        <circle cx="32" cy="32" r="30" x="0" y="0" fill="grey" style={{ stroke: "#ffa500", strokeWidth: 2 }}></circle> :
                        <circle cx="32" cy="32" r="30" x="0" y="0" fill="grey"></circle>}
                    {this.props.data.flippedHorizontally ? [<circle key="1" r="8" cx="2" cy="32" fill="white"></circle>,
                    <polygon key="2" points="64,28 54,32 64,36" style={{ fill: "white" }} />]
                        : [<polygon key="1" points="0,28 10,32 0,36" style={{ fill: "white" }} />,
                        <circle key="2" r="8" cx="62" cy="32" fill="white"></circle>]}
                </svg>
                <div className="result-wrapper">
                    <label>{this.props.data.label}</label>
                </div>
            </div >
        )
    }
}