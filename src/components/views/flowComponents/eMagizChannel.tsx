import * as I from "./interfaces";
import * as React from "react";
import * as  EMagizComponent from "./indexComponents";
export class EMagizChannel extends React.Component<{
    channel: I.ISIChannel, startDict: I.IChannelDict,
    endDict: I.IChannelDict, startErrorDict: I.IChannelDict,
    highlightedId: string, onSelectObject: (id: string) => void,
    setShowDiff: () => void
}, {}>{
    render() {
        let startDict = this.props.startDict;
        let endDict = this.props.endDict;
        let startErrorDict = this.props.startErrorDict;
        let cn = this.props.channel;
        let listRenderChannel: (JSX.Element | undefined)[] = [];
        if (this.props.startDict[this.props.channel.guid] && this.props.endDict[this.props.channel.guid]) {
            for (let s in startDict[cn.guid]) {
                for (let e in endDict[cn.guid]) {
                    listRenderChannel.push(<EMagizComponent.Channel
                        onSelectObject={this.props.onSelectObject}
                        setShowDiff={this.props.setShowDiff} colorStroke={this.props.highlightedId === cn.guid ? "#ffa500" : "grey"}
                        idChannel={cn.guid} origin={startDict[cn.guid][s]}
                        destination={endDict[cn.guid][e]} guid={cn.guid} />)
                }
            }
        }
        else if (this.props.startDict[this.props.channel.guid] && !this.props.endDict[this.props.channel.guid]) {
            for (let s in startDict[cn.guid]) {
                listRenderChannel.push(<EMagizComponent.ChannelNullDestination
                    onSelectObject={this.props.onSelectObject}
                    setShowDiff={this.props.setShowDiff} colorStroke={this.props.highlightedId === cn.guid ? "#ffa500" : "grey"}
                    idChannel={cn.guid} origin={startDict[cn.guid][s]} guid={cn.guid} />
                )
            }
        }
        else if (this.props.startErrorDict[this.props.channel.guid] && this.props.endDict[this.props.channel.guid]) {
            for (let s in startErrorDict[cn.guid]) {
                for (let e in endDict[cn.guid]) {
                    listRenderChannel.push(<EMagizComponent.ErrorChannel
                        guid={cn.guid}
                        idChannel={cn.guid}
                        origin={startErrorDict[cn.guid][s]}
                        destination={endDict[cn.guid][e]} onSelectObject={this.props.onSelectObject}
                        setShowDiff={this.props.setShowDiff} colorStroke={this.props.highlightedId === cn.guid ? "#ffa500" : "grey"} />)
                }
            }
        }
        else if (!this.props.startDict[this.props.channel.guid] && !this.props.startErrorDict[this.props.channel.guid] && this.props.endDict[this.props.channel.guid]) {
            for (let e in endDict[cn.guid]) {
                listRenderChannel.push(<EMagizComponent.ChannelNUllOrigin
                    onSelectObject={this.props.onSelectObject}
                    setShowDiff={this.props.setShowDiff} colorStroke={this.props.highlightedId === cn.guid ? "#ffa500" : "grey"}
                    idChannel={cn.guid} destination={endDict[cn.guid][e]} guid={cn.guid} />
                )
            }
        }
        return (
            <div>
                {listRenderChannel}
            </div>
        )
    }
}