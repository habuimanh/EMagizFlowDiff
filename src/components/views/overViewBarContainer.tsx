/// <reference path="./../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./flowComponents/interfaces";
import { convertObjectData } from "./flowComponents/convertFunction/convertObjectData";
import utils = require("./flowComponents/utils");
export class OverViewBarContainer extends React.Component<I.IOverviewBarContainerProps, {}>{
    render() {
        const { scrollWidth1, scrollWidth2, offSetWidth, revision1, revision2, diff, config, hidePosition } = this.props;
        let listObjectData1 = new I.IObjectDict();
        let listChannelData1: I.ISIChannel[] = [];
        let startDict1 = new I.IChannelDict();
        let listObjectData2 = new I.IObjectDict();
        let listChannelData2: I.ISIChannel[] = [];
        let startDict2 = new I.IChannelDict();
        //object information of origin flow
        let startErrorDict1 = new I.IChannelDict();
        let startErrorDict2 = new I.IChannelDict();
        //object information of origin errorflow
        let endDict1 = new I.IChannelDict();
        let endDict2 = new I.IChannelDict();
        //object information of destination flow
        convertObjectData(revision1, listObjectData1, listChannelData1, startDict1, endDict1, startErrorDict1);
        convertObjectData(revision2, listObjectData2, listChannelData2, startDict2, endDict2, startErrorDict2);
        //convert object and channel information from data
        let listRenderHighlightObject1: (JSX.Element | undefined)[] = [];
        let listRenderHighlightObject2: (JSX.Element | undefined)[] = [];
        const propotionWidth1 = (offSetWidth - 51) / scrollWidth1;
        const propotionWidth2 = (offSetWidth - 51) / scrollWidth2;
        //render channel
        if (hidePosition) {
            utils.renderHidePositionOverView(diff, listObjectData1, listRenderHighlightObject1, propotionWidth1, "new");
            utils.renderHidePositionOverView(diff, listObjectData2, listRenderHighlightObject2, propotionWidth2, "older");
        }
        else {
            utils.renderOverView(config, diff, listObjectData1, listRenderHighlightObject1, propotionWidth1, "new");
            utils.renderOverView(config, diff, listObjectData2, listRenderHighlightObject2, propotionWidth2, "older");
        }
        //render different components
        const leftStyle = (scrollWidth1 > offSetWidth || scrollWidth2 > offSetWidth) ? 17 : 0
        return (
            <div style={{ width: "100%", backgroundColor: "#EFEFEF" }}>
                <div style={{ fontSize: 10, position: "absolute", left: 0, height: 15, top: 0, padding: 1, border: "solid grey 0.5px", zIndex: 1 }}>{this.props.revision1.version}</div>
                <div style={{ fontSize: 10, position: "absolute", left: 0, height: 15, top: 15, padding: 1, border: "solid grey 0.5px", zIndex: 1 }}>{this.props.revision2.version}</div>
                <div style={{ position: "absolute", left: leftStyle, width: "100%" }}>
                    <div id="mx-mf-visualiser" className="mx-mf-visualiser" style={{ height: 15, border: "solid grey 0.5px", borderLeft: "none" }}>
                        {listRenderHighlightObject1}
                    </div>
                    <div id="mx-mf-visualiser" className="mx-mf-visualiser" style={{ height: 15, border: "solid grey 0.5px", borderLeft: "none" }}>
                        {listRenderHighlightObject2}
                    </div>
                </div>
            </div>
        )
    }
}