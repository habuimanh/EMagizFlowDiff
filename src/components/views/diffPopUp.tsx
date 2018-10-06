import React = require("react")
import ReactDOM = require("react-dom")
import { diff, single, input } from "../Interface"
import { SameItem, PairItem, ElementContainer, DiffContainer, SingleObj, SingleObjectItem } from "./basic-items"
import * as I from "./flowComponents/interfaces";
import { PopUp } from "./flowComponents/popUp";
enum TypeDiff {
    None,
    Delete,
    New,
    Edit
}
export function checkInMetaData(nameProperty: string): boolean {
    switch (nameProperty) {
        case "objectType":
        case "guid":
        case "componentType":
        case "x":
        case "y":
        case "flippedHorizontally":
        case "label":
        case "$$metaData": {
            return true;
        }
    }return false;
}
function findDiffArray(object) {
    if (object instanceof Array) {
        object['isDiff'] = false;
        object.forEach(el => {
            if (el instanceof Array || el instanceof Object) {
                findDiffArray(el);
            }
            if (el.isDiff) {
                object['isDiff'] = true;
            }
        })
    }
    else if (object instanceof Object) {
        for (let i in object) {
            findDiffArray(object[i]);
        }
    }
    return object;
}
function convertName2(object, convertName: I.IConvertName, count: number) {
    let techName = ""; techName = convertName.technicalName;
    for (let i in object) {
        if (convertName.technicalName.split("/")[count] && i === convertName.technicalName.split("/")[count]) {
            if (convertName.technicalName.split("/")[count + 1]) {
                convertName2(object[i], convertName, count + 1);
            } else {
                const disName = convertName.displayedName;
                object[disName] = object[i];
                delete object[i];
            }
        }
    }
}
function convert(object, convertName: I.IConvertName[]) {
    for (let i = 0; i < convertName.length; ++i) {
        convertName2(object, convertName[i], 0);
    }
}
function findPopUpByGuid(listComponents: (diff.IComponentDiff | single.IGeneralObject | single.IChannel)[], selectedId: string) {
    let first = 0, last = listComponents.length - 1;
    while (first <= last) {
        let mid = Math.floor((first + last) / 2);
        if (listComponents[mid].guid) {
            if (listComponents[mid].guid === selectedId) return listComponents[mid];
            else if (listComponents[mid].guid > selectedId) {
                last = mid - 1;
            } else {
                first = mid + 1;
            }
        }
    } return undefined;
}
export class DiffPopUp extends React.Component<I.IDiffPopUpProps, { onlyShowChange: boolean, detailObjectCompared: I.IDetailObjectCompared }> {
    _scrollingDiv: HTMLDivElement;
    constructor(props) {
        super(props);
        this.state = {
            onlyShowChange: false,
            detailObjectCompared: {
                indexID: -1,
                show: false,
                nameAttribute: "",
                name1: "",
                name2: ""
            }
        }
    }
    handleInputChange() {
        this.setState({
            onlyShowChange: !this.state.onlyShowChange,
            detailObjectCompared: this.state.detailObjectCompared
        })
    }
    resetDetailObjectCompared() {
        this.setState({
            onlyShowChange: false,
            detailObjectCompared: {
                indexID: -1,
                show: false,
                nameAttribute: "",
                name1: "",
                name2: ""
            }
        })
    }
    handleClickGidRow(indexID: number, nameAttribute: string, name1: string | number, name2: string | number, isSingleItem?: boolean) {
        let show = false;
        if (!this.state.detailObjectCompared.show && this.state.detailObjectCompared.indexID != indexID) {
            show = true;
        } else {
            if (this.state.detailObjectCompared.indexID === indexID) {
                if (isSingleItem) {
                    if (this.state.detailObjectCompared.nameAttribute != nameAttribute) {
                        show = true;
                    } else if (this.state.detailObjectCompared.nameAttribute === nameAttribute && !this.state.detailObjectCompared.show) {
                        show = true;
                    }
                    else {
                        show = false;
                    }
                }
                else {
                    show = !this.state.detailObjectCompared.show;
                }
            } else {
                show = this.state.detailObjectCompared.show;
            }
        }
        this.setState({
            onlyShowChange: this.state.onlyShowChange,
            detailObjectCompared: {
                indexID: indexID,
                show: show,
                name1: name1.toString(),
                name2: name2.toString(),
                nameAttribute: nameAttribute
            }
        })
    }
    render() {
        const { flowDiff, convertName, setUnShowDiff, config, showDiff, selectedId
            , hidePosition, showFlow, foldAll, showCommonInfo, onChangeFold, onSelectObject } = this.props;
        let popUpCpn, typeDiff: TypeDiff = TypeDiff.None;
        if (flowDiff) {
            popUpCpn = findPopUpByGuid(flowDiff.editedComponents, selectedId);
            if (popUpCpn) typeDiff = TypeDiff.Edit;
            if (!popUpCpn) {
                popUpCpn = findPopUpByGuid(flowDiff.newComponents, selectedId);
                typeDiff = TypeDiff.New;
            }
            if (!popUpCpn) {
                popUpCpn = findPopUpByGuid(flowDiff.deletedComponents, selectedId)
                typeDiff = TypeDiff.Delete;
            };
        }
        if (showDiff && popUpCpn) {
            let title = (popUpCpn['label'] && !popUpCpn['label']['isDiff'] && popUpCpn['label']['member1'] ? popUpCpn['label']['member1'] : popUpCpn['objectType']['member1'])
            if (title === undefined) {
                title = popUpCpn.label;
            }
            let coppyPopUpCpn = JSON.parse(JSON.stringify(popUpCpn));
            coppyPopUpCpn = findDiffArray(coppyPopUpCpn);
            convert(coppyPopUpCpn, convertName);
            ReactDOM.render(<PopUp onlyShowChange={this.state.onlyShowChange} handleInputChange={this.handleInputChange.bind(this)} config={config} setUnShowDiff={setUnShowDiff} detailObjectCompared={this.state.detailObjectCompared} revision1={this.props.revision1}
                tittle={title} revision2={this.props.revision2} resetDetailObjectCompared={this.resetDetailObjectCompared.bind(this)}>
                {typeDiff === 3 ?
                    <DiffItem checked={this.state.onlyShowChange} handleInputChange={this.handleInputChange.bind(this)} detailObjectCompared={this.state.detailObjectCompared}
                        config={config} diff={coppyPopUpCpn as diff.IComponentDiff}
                        key={popUpCpn.guid} onlyShowChange={this.state.onlyShowChange}
                        ref={popUpCpn.guid}
                        viewOption={{
                            hidePosition: hidePosition,
                            showFlow: showFlow,
                            showCommonInfo: showCommonInfo,
                            foldAll: foldAll,
                            onFoldAll: onChangeFold,
                            hightlighted: selectedId === popUpCpn.guid,
                            onSelectObject: () => onSelectObject(popUpCpn.guid),
                        }} revision1={this.props.revision1}
                        revision2={this.props.revision2}
                        handleClickGridRow={this.handleClickGidRow.bind(this)}
                    />
                    : <ElementContainer name={popUpCpn.objectType}
                        viewOption={{
                            hidePosition: hidePosition,
                            showFlow: showFlow,
                            showCommonInfo: showCommonInfo,
                            foldAll: foldAll,
                            onFoldAll: onChangeFold,
                            hightlighted: selectedId === popUpCpn.guid,
                            onSelectObject: () => onSelectObject(popUpCpn.guid)
                        }}>
                        <SingleObj config={config} diff={coppyPopUpCpn} member={typeDiff} index={0} detailObjectCompared={this.state.detailObjectCompared} handleClickGridRow={this.handleClickGidRow.bind(this)} />
                    </ElementContainer>}
            </PopUp>, document.getElementById("popupContainer") as Element);
            return <div />
        } else {
            return <div hidden />
        }
    }
}
export class DiffProperty extends React.Component<I.IDiffPropertyProps, {}> {
    renderProperty(props: I.IDiffPropertyProps, index: number) {
        const nextIndex = index + 10;
        let _diff = props.property.diff;
        let _name = props.property.name;
        if (!checkInMetaData(props.property.name)) {
            if (_diff instanceof Array && ((_diff['isDiff'] && this.props.onlyShowChange) || !this.props.onlyShowChange)) {
                return <DiffContainer name={_name} index={index} backgroundColor={_diff['isDiff'] ? this.props.config.edited : "grey"} config={this.props.config}>
                    {_diff.map((element, index) => this.renderProperty({ property: { name: `${_name}[${index}]`, diff: element, indexID: element.indexID }, config: props.config, detailObjectCompared: props.detailObjectCompared, handleCLickGridRow: props.handleCLickGridRow, onlyShowChange: props.onlyShowChange }, nextIndex))}
                </DiffContainer>
            }
            else if (_diff['member1'] instanceof Object && !_diff['member2']) {
                return <DiffContainer name={_name} index={index} backgroundColor={this.props.config.deleted} config={this.props.config}>
                    <SingleObj detailObjectCompared={this.props.detailObjectCompared} handleClickGridRow={this.props.handleCLickGridRow} config={this.props.config} diff={_diff['member1']} member={1} index={nextIndex} />
                </DiffContainer >
            }
            else if (!_diff['member1'] && _diff['member2'] instanceof Object) {
                return <DiffContainer name={_name} index={index} backgroundColor={this.props.config.added} config={this.props.config}>
                    <SingleObj detailObjectCompared={this.props.detailObjectCompared} handleClickGridRow={this.props.handleCLickGridRow} config={this.props.config} diff={_diff['member2']} member={2} index={nextIndex} />
                </DiffContainer>
            }
            if (_diff['isBasic']) {
                if (_diff['isDiff']) {
                    if (_diff['member1'] != undefined && _diff['member2'] == undefined) {
                        return <SingleObjectItem handleClickGridRow={this.props.handleCLickGridRow} detailObjectCompared={this.props.detailObjectCompared} diff={_diff} name={_name} config={this.props.config} value={_diff['member1']} member={1} index={index} />
                    }
                    else if (_diff['member1'] == undefined && _diff['member2'] != undefined) {
                        return <SingleObjectItem handleClickGridRow={this.props.handleCLickGridRow} detailObjectCompared={this.props.detailObjectCompared} diff={_diff} name={_name} config={this.props.config} value={_diff['member2']} member={2} index={index} />
                    }
                    else if (!(_diff['member1'] instanceof Array) && !(_diff['member2'] instanceof Array)) {
                        return <PairItem detailObjectCompared={this.props.detailObjectCompared} config={this.props.config} diff={_diff} name={_name} index={index} handleClickGridRow={this.props.handleCLickGridRow} />
                    }
                    return <DiffContainer name={_name} index={index} backgroundColor={this.props.config.edited} config={this.props.config}>
                        {(_diff['member1'] as Array<diff.INestedObjectDiff>).map((element, index) => this.renderProperty({ property: { name: `${_name}[${index}]`, diff: element }, config: props.config }, nextIndex))}
                    </DiffContainer>
                }
                else if (!this.props.onlyShowChange) return <SameItem handleClickGridRow={this.props.handleCLickGridRow} detailObjectCompared={this.props.detailObjectCompared} diff={_diff} name={_name} value={_diff['member1']} index={index} />
                else return;
            }
            let subProperties = getComparingProperties(_diff)
            if (_name !== 'position' && ((_diff['isDiff'] && this.props.onlyShowChange) || !this.props.onlyShowChange)) {
                return <DiffContainer name={_name} index={index} backgroundColor={_diff['isDiff'] ? this.props.config.edited : "grey"} config={this.props.config}>
                    {subProperties.map(subProperty => this.renderProperty({ property: subProperty, config: props.config, detailObjectCompared: props.detailObjectCompared, onlyShowChange: props.onlyShowChange, handleCLickGridRow: props.handleCLickGridRow }, nextIndex))}
                </DiffContainer>
            } else {
                return
                // <tr>
                //     {/* <SingleItem name={_name} /> */}
                //     {subProperties.map(subProperty => <div key={subProperty.name}>{this.renderProperty({ property: subProperty, config: props.config })}</div>)}
                // </tr>
            }
        }
    }
    render(): any {
        return [this.renderProperty(this.props, 0)]
    }
}

interface IDisplayDiff {
    name: string,
    diff: diff.IDiff | diff.IDiff[]
}
function getComparingProperties(diff: diff.IDiff) {
    let diffProperties: IDisplayDiff[] = [];
    for (let property in diff) {
        diffProperties.push({
            name: property,
            diff: diff[property]
        })
    }
    return diffProperties.filter(diffProperty => (diffProperty.diff as diff.IDiff).isDiff !== undefined || diffProperty.diff instanceof Array)
}
export class DiffItem extends React.Component<{
    checked: boolean,
    handleInputChange: () => void,
    detailObjectCompared: I.IDetailObjectCompared,
    config: input.Config, diff: diff.IComponentDiff, viewOption: IViewOption, onlyShowChange: boolean, revision1: input.IInput,
    revision2: input.IInput, handleClickGridRow: () => void,
}, {}> {
    render() {
        if (this.props.diff.componentType === "Channel") {
            if (!this.props.viewOption.showFlow) return <span />
        }
        let diffProperties = getComparingProperties(this.props.diff);
        if (!this.props.diff.isDiff && !this.props.viewOption.showCommonInfo) {
            return <span />
        }
        return <ElementContainer
            name={(this.props.diff['label'] && !this.props.diff['label']['isDiff'] ? this.props.diff['label']['member1'] : this.props.diff.objectType)}
            viewOption={this.props.viewOption}>
            {
                diffProperties.map(diffProperty => {
                    if (checkInMetaData(diffProperty.name)) {
                        return undefined
                    }
                    if (this.props.viewOption.hidePosition && diffProperty.name === 'position') {
                        return undefined
                    }
                    return <DiffProperty detailObjectCompared={this.props.detailObjectCompared} config={this.props.config} property={diffProperty} onlyShowChange={this.props.onlyShowChange} handleCLickGridRow={this.props.handleClickGridRow} />
                })
            }
        </ElementContainer>
    }
}

export interface IViewOption {
    hidePosition: boolean,
    showFlow: boolean,
    showCommonInfo: boolean,
    hightlighted: boolean,
    onSelectObject: () => void,
    foldAll: boolean,
    onFoldAll: () => void
}