/// <reference path="./../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./flowComponents/interfaces";
import { EMagizObject } from "./flowComponents/eMagizObject";
import { EMagizChannel } from "./flowComponents/eMagizChannel"
import { convertObjectData } from "./flowComponents/convertFunction/convertObjectData";
import utils = require("./flowComponents/utils");
import { ChannelSIWireTap } from "./flowComponents/channelSIWireTap"
import { NullChannel } from "./flowComponents/nuLLChannel"
function checkExistedInSIChennels(listChannelData: I.ISIChannel[], id: string) {
    for (let i = 0; i < listChannelData.length; ++i) {
        if (listChannelData[i].siInterceptors) {
            for (let j = 0; j < listChannelData[i].siInterceptors!.length; ++j) {
                if (listChannelData[i].siInterceptors![j].outputChannel === id) {
                    return true;
                }
            }
        }
    } return false
}
export class EMagizFlowContainer extends React.Component<I.IEMagizFlowContainerProps, {}>{
    property: I.IEmagizFlowContainerProperty;
    thisDiv: HTMLDivElement;
    constructor(props) {
        super(props);
        this.property = {
            height: 0,
            width: 0,
            top: 0,
            left: 0,
            willUpdate: false
        };
        this.onClickRenderer = this.onClickRenderer.bind(this);
    }
    onClickRenderer() {
        this.props.onSelectObject("");
    }
    componentDidUpdate(prevProps) {
        /**
         * Update if user clicked on component then find component's geometry to move scroll position if necessery  
         * 
         */
        const { top, height, left, width, willUpdate } = this.property;
        if (this.props.highlightedId != prevProps.highlightedId && this.props.highlightedId != "" && willUpdate) {
            if (top + height > this.thisDiv.offsetHeight + this.thisDiv.scrollTop) {
                this.thisDiv.scrollTop += top + height - (this.thisDiv.offsetHeight + this.thisDiv.scrollTop) + 17;
            }
            else if (top < this.thisDiv.scrollTop) {
                this.thisDiv.scrollTop = top;
            }
            if (left + width > this.thisDiv.offsetWidth + this.thisDiv.scrollLeft) {
                this.thisDiv.scrollLeft += left + width - (this.thisDiv.offsetWidth + this.thisDiv.scrollLeft) + 17;
            }
            else if (left < this.thisDiv.scrollLeft) {
                this.thisDiv.scrollLeft = left;
            }
            this.props.isClicked();
            this.property.willUpdate = false;
        }
    }
    updateHighlightPosition(highlightedCpn: I.IObject) {
        this.property = {
            height: highlightedCpn.size.height,
            top: highlightedCpn.point.y,
            left: highlightedCpn.point.x,
            width: highlightedCpn.size.width,
            willUpdate: true
        }
    }
    render() {
        const { diff, onScroll, revision, onSelectObject, setShowDiff, highlightedId, hidePosition, config } = this.props;
        let listObjectData = new I.IObjectDict();
        let listChannelData: I.ISIChannel[] = [];
        let startDict = new I.IChannelDict();
        let startErrorDict = new I.IChannelDict();
        let endDict = new I.IChannelDict();
        let listRenderObject: (JSX.Element | undefined)[] = [];
        let listRenderHighlightObject: (JSX.Element | undefined)[] = [];
        let listRenderChannelWireTap: (JSX.Element | undefined)[] = [];
        convertObjectData(revision, listObjectData, listChannelData, startDict, endDict, startErrorDict);
        //Find max min geometry to find width&height of div container
        const minY = utils.findMinVertical(listObjectData);
        const maxY = utils.findMaxVertical(listObjectData);
        const minX = utils.findMinHorizontal(listObjectData);
        const maxX = utils.findMaxHorizontal(listObjectData);
        /**
         * Find component highlighted by Id and update position to move scroll if necessery
         * Send data to list render components to render
         */
        for (let id in listObjectData) {
            if (highlightedId === id) this.updateHighlightPosition(listObjectData[id])
            listRenderObject.push(<EMagizObject setShowDiff={setShowDiff} highlightedId={highlightedId}
                key={listObjectData[id].id} data={listObjectData[id]} onSelectObject={onSelectObject} />)
        }
        //Find Null Channel and Render
        for (let cnId in startDict) {
            if (cnId.toString() === "-1") {
                for (let s in startDict[cnId]) {
                    listRenderObject.push(<NullChannel component={startDict[cnId][s]} objId={s} nullError={false} />)
                }
                break;
            }
        }
        for (let cnId in startErrorDict) {
            if (cnId.toString() === "-1") {
                for (let s in startErrorDict[cnId]) {
                    listRenderObject.push(<NullChannel component={startErrorDict[cnId][s]} objId={s} nullError={true} />)
                }
                break;
            }
        }
        //Match start dictionary object to end dictionary object by Id then render channels
        let listRenderChannel = listChannelData.map(cn => {
            if (cn.siInterceptors) {
                cn.siInterceptors.map(siC => {
                    if (startDict[cn.guid] && endDict[cn.guid]) {
                        for (let s in startDict[cn.guid]) {
                            for (let e in endDict[cn.guid]) {
                                if (siC.guid) {
                                    for (let er in endDict[siC.outputChannel]) {
                                        listRenderChannelWireTap.push(<ChannelSIWireTap
                                            onSelectObject={onSelectObject} idChannel={siC.guid}
                                            setShowDiff={setShowDiff} colorStroke={highlightedId === cn.guid ? "#ffa500" : "grey"}
                                            origin={startDict[cn.guid][s]} destinationMediate={endDict[cn.guid][e]} destination={endDict[siC.outputChannel][er]}
                                            guid={cn.guid} />)
                                    }
                                }
                            }
                        }
                        // listRenderChannelWireTap.push(<EMagizComponent.ChannelSIWireTap key={siC._channel} origin={startDict[cn.guid]} destinationMediate={endDict[cn.guid]} destination={endDict[siC._channel]} />)
                        //render ChannelWireTap
                    }
                    if (startDict[cn.guid] && !endDict[cn.guid]) {
                        for (let s in startDict[cn.guid]) {
                            if (siC.guid) {
                                for (let er in endDict[siC.outputChannel]) {
                                    listRenderChannelWireTap.push(<ChannelSIWireTap
                                        onSelectObject={onSelectObject} idChannel={siC.guid}
                                        setShowDiff={setShowDiff} colorStroke={highlightedId === cn.guid ? "#ffa500" : "grey"}
                                        origin={startDict[cn.guid][s]} destination={endDict[siC.outputChannel][er]}
                                        guid={cn.guid} />)
                                }
                            }
                        }
                    }
                    if (endDict[cn.guid] && !startDict[cn.guid]) {
                        for (let e in endDict[cn.guid]) {
                            if (siC.guid) {
                                for (let er in endDict[siC.outputChannel]) {
                                    listRenderChannelWireTap.push(<ChannelSIWireTap
                                        onSelectObject={onSelectObject} idChannel={siC.guid}
                                        setShowDiff={setShowDiff} colorStroke={highlightedId === cn.guid ? "#ffa500" : "grey"}
                                        destinationMediate={endDict[cn.guid][e]} destination={endDict[siC.outputChannel][er]}
                                        guid={cn.guid} />)
                                }
                            }
                        }
                    }
                })
            }
            if (!checkExistedInSIChennels(listChannelData, cn.guid))
                return <EMagizChannel setShowDiff={setShowDiff} onSelectObject={onSelectObject} highlightedId={highlightedId} startDict={startDict} endDict={endDict} channel={cn} startErrorDict={startErrorDict} />
        });
        if (hidePosition) utils.renderDiffHidePositionComponent(diff, listObjectData, listRenderHighlightObject)
        else utils.renderDiffComponent(config!, diff, listObjectData, listRenderHighlightObject);
        return (
            <div onScroll={onScroll} ref={div => this.thisDiv = div} style={{ width: "100%", height: "100%", overflow: "auto", background: "white" }}>
                {/* <div className="version-title" style={this.props.paneAbove ? { position: "absolute", left: 0, bottom: 0 } : { position: "absolute", left: 0 }}>
                    <h5 style={{ fontSize: 11 }}>{revision.version}</h5>
                </div> */}
                <div onClick={this.onClickRenderer} style={{ position: "relative", left: 0, width: maxX + minX, height: maxY + minY }}>
                    {[listRenderHighlightObject, listRenderObject, listRenderChannel, listRenderChannelWireTap]}
                </div>
                {this.props.paneAbove ? <Category configColor={{ added: this.props.config.added, deleted: this.props.config.deleted, edited: this.props.config.edited }} /> : undefined}
            </div>
        )
    }
}

const Category = (props: {
    configColor: {
        edited: string,
        deleted: string,
        added: string
    }
}) => (
        <div style={{ position: "absolute", top: 3, right: 20, backgroundColor: "#e7e3e3", border: "solid grey 2px" }}>
            <div class='legend'>
                <div class='legend-scale'>
                    <ul class='legend-labels'>
                        <li><span style={{ background: props.configColor.added }}></span>Added</li>
                        <li><span style={{ background: props.configColor.deleted }}></span>Removed</li>
                        <li><span style={{ background: props.configColor.edited }} p></span>Changed</li>
                    </ul>
                </div>
            </div>
        </div>
    )
