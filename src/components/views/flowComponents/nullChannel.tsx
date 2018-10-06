/// <reference path="../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
export class NullChannel extends React.Component<{ component: I.IObject, objId: string, nullError: boolean }, {}>{
    render() {
        let style = {
            position: "absolute",
            top: (this.props.component.point.y + this.props.component.size.height / 2) - 5,
            left: this.props.component.point.x + this.props.component.size.width - 5,
            width: 10,
            height: 10
        }
        if (this.props.component.type === I.TypeComponents.Route && this.props.objId.includes(this.props.component.guid + "s")) {
            let index = this.props.objId.slice(this.props.objId.indexOf("s") + 1);
            style.top = (this.props.component.point.y + this.props.component.size.height) + 11 * Number.parseInt(index);
        }
        else if ((this.props.component.type === I.TypeComponents.Filter && this.props.objId === this.props.component.guid + "dC") || this.props.nullError) {
            style.left = (this.props.component.point.x + this.props.component.size.width / 2) - 5;
            style.top = this.props.component.point.y + this.props.component.size.height - 5;
        }
        return (
            <div style={style} >
                <svg style={{ position: "absolute" }} width={style.width} height={style.height}>
                    {this.props.component.type === I.TypeComponents.Filter && this.props.objId === this.props.component.guid + "dC" ?
                        <circle r="2" cx="5.5" cy="5" fill="white"></circle> :
                        [this.props.nullError ? <circle r="5" cx="5" cy="5" fill="red"></circle> : <circle r="5" cx="5" cy="5" fill="grey"></circle>,
                        <circle r="3" cx="5" cy="5" fill="white"></circle>]}
                </svg>
            </div>
        )
    }
}