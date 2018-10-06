import * as React from "react";
import * as I from "./interfaces";
export class InboundChannelAdapter extends React.Component<{ highlightedId: string, data: I.IInboundChannelAdapter }, {}>{
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
                <svg width={style.width + 4} height={style.height + 8}>
                    {this.props.data.guid === this.props.highlightedId ?
                        <circle cx="32" cy="32" r="30" x="0" y="0" fill="rgb(105, 183, 49)" style={{ stroke: "#ffa500", strokeWidth: 2 }}></circle> :
                        <circle cx="32" cy="32" r="30" x="0" y="0" fill="rgb(105, 183, 49)"></circle>}
                    <circle r="8" cx="32" cy="62" fill="white"></circle>
                    {this.props.data.flippedHorizontally ? <circle r="8" cx="2" cy="32" fill="white"></circle>
                        : <circle r="8" cx="62" cy="32" fill="white"></circle>}
                    {this.props.data.errorChannel ? undefined : <circle r="5" cx="32" cy="62" fill="red"></circle>}
                </svg>
                <div className="result-wrapper">
                    <label>{this.props.data.label}</label>
                </div>
            </div >
        )
    }
}