import * as React from "react";
import * as I from "./views/flowComponents/interfaces";
import { Layout } from "./views/layout";
import { input } from "./Interface";
import { RevisionComparing } from "./Process";
import JSONbig = require('json-bigint');
function convertBigNumberToString(bigNumber: input.BigNumber): string {
    let str = "";
    bigNumber.c.forEach(num => {
        str += num
    })
    return str;
}
export default class EMagizFlow extends React.Component<I.IEMagizFlowProps, I.IEMagizFlowState> {
    property: I.IEMagizProperty;
    constructor(props) {
        super(props);
        this.property = {
            flowDiff: undefined,
            revision1: undefined,
            revision2: undefined,
            configColor: undefined,
            convertNames: [],
            topBoundClient: 0,
            leftBoundClient: 0,
            loaded: false
        };
        this.state = {
            selectedId: "",
            showDiff: false,
            foldAll: false,
            hidePosition: false,
            showCommonInfo: true,
            showFlow: true
        };
        this.setCommonInfo = this.setCommonInfo.bind(this);
        this.setShowDiff = this.setShowDiff.bind(this);
        this.setUnShowDiff = this.setUnShowDiff.bind(this);
        this.setShowFlow = this.setShowFlow.bind(this);
        this.hidePosition = this.hidePosition.bind(this);
        this.foldAll = this.foldAll.bind(this);
        this.loadAndCompare = this.loadAndCompare.bind(this);
        this.loadAndCompare = this.loadAndCompare.bind(this);
        this.selectObject = this.selectObject.bind(this);

    }
    selectObject(id: string) {
        this.setState({
            ...this.state,
            selectedId: id
        })
    }
    setShowDiff() {
        this.setState({
            ...this.state,
            showDiff: true
        })
    }
    setUnShowDiff() {
        this.setState({
            ...this.state,
            showDiff: false
        })
    }
    setShowFlow() {
        this.setState({
            ...this.state,
            showFlow: !this.state.showFlow
        })
    }
    setCommonInfo() {
        this.setState({
            ...this.state,
            showCommonInfo: !this.state.showCommonInfo
        })
    }
    hidePosition() {
        this.setState({
            ...this.state,
            hidePosition: !this.state.hidePosition
        })
    }
    foldAll() {
        this.setState({
            ...this.state,
            foldAll: !this.state.foldAll
        })
    }
    convertGuidToString(object) {
        for (let a in object) {
            if (object[a] instanceof Array) {
                this.convertGuidToString(object[a]);
            }
            //if object instaceof BigNumber
            if (object[a].c) {
                let tmp = object[a] as input.BigNumber;
                object[a] = convertBigNumberToString(tmp);
            }
            if (object[a].outputChannel) {
                this.convertGuidToString(object[a]);
            }
        }
    }
    loadAndCompare(rev1: any, rev2: any) {
        // this.property.revision1 = JSON.parse(rev1.replace(/([\[:])?(\d+)([,\}\]])/g, "$1\"$2\"$3"));
        // this.property.revision2 = JSON.parse(rev2.replace(/([\[:])?(\d+)([,\}\]])/g, "$1\"$2\"$3"));
        this.property.revision1 = JSONbig.parse(rev1);
        this.property.revision2 = JSONbig.parse(rev2);
        this.property.revision1!.components.forEach(cpn => {
            this.convertGuidToString(cpn.$$metaData);
        })
        this.property.revision2!.components.forEach(cpn => {
            this.convertGuidToString(cpn.$$metaData);
        })
        this.property.flowDiff = RevisionComparing.compareTwoRevisions(this.property.revision1 as input.IInput, this.property.revision2 as input.IInput).flowDiff;
        this.property.loaded = true;
    }
    componentWillMount() {
        const cssId = 'myCss';  // you could encode the css path itself to generate id..
        if (!document.getElementById(cssId)) {
            let head = document.getElementsByTagName('head')[0];
            let link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'widgets/com/mendix/widget/custom/eMagizFlow/ui/eMagizFlowDiff.css';
            link.media = 'all';
            head.appendChild(link);
        }
    }
    sortConvertNameByLength(first: number, last: number) {
        const { convertNames } = this.property;
        if (first < last) {
            const midValue = convertNames[Math.floor((first + last) / 2)].technicalName.length;
            let i = first, j = last;
            while (i <= j) {
                while (convertNames[i].technicalName.length > midValue) i++;
                while (convertNames[j].technicalName.length < midValue) j--;
                if (i <= j) {
                    const temp = convertNames[i]; convertNames[i] = convertNames[j]; convertNames[j] = temp;
                    i++;
                    j--;
                }
            }
            if (i < last) this.sortConvertNameByLength(i, last);
            if (j > first) this.sortConvertNameByLength(first, j);
        }
    }
    componentWillReceiveProps(nextProps: I.IEMagizFlowProps) {
        const { colorAdded, colorEdited, colorDeleted, convertName } = this.props;
        if (nextProps.mxObject) {
            const jsonData1 = nextProps.mxObject.get(nextProps.version1);
            const jsonData2 = nextProps.mxObject.get(nextProps.version2);
            this.property.convertNames = convertName;
            this.sortConvertNameByLength(0, this.property.convertNames.length - 1);
            this.loadAndCompare(jsonData1, jsonData2);
            const newConfig = {
                added: colorAdded ? colorAdded : "#97f295",
                deleted: colorDeleted ? colorDeleted : "#ffb6ba",
                edited: colorEdited ? colorEdited : "rgba(3, 102, 214, 0.73)"
            }
            this.property.configColor = newConfig;
        }
    }

    render() {
        const { selectObject, setShowDiff, setUnShowDiff, foldAll, hidePosition, setCommonInfo, setShowFlow } = this;
        return (
            <div>
                {this.property.loaded ? [<Layout appState={this.state}
                    onSelect={selectObject} eMagizProperty={this.property}
                    setShowDiff={setShowDiff} setUnShowDiff={setUnShowDiff}
                    foldAll={foldAll} hidePosition={hidePosition}
                    setCommonInfo={setCommonInfo} setShowFlow={setShowFlow} />,
                <div id="popupContainer" />] : undefined}
            </div>
        )
    }
    componentDidUpdate() {
        let { revision1, revision2, topBoundClient, leftBoundClient } = this.property;
        if (revision1 && revision2) {
            const thisDiv = document.getElementById("eMagizFlowDiff");
            if (thisDiv) {
                window.setTimeout((thisDiv) => {
                    thisDiv = document.getElementById("eMagizFlowDiff");
                    const body = document.body,
                        html = document.documentElement;
                    const height = Math.max(body.scrollHeight, body.offsetHeight,
                        html.clientHeight, html.scrollHeight, html.offsetHeight);
                    if (thisDiv.getBoundingClientRect().top != 0) {
                        thisDiv.style.height = (height - thisDiv.getBoundingClientRect().top).toString() + "px";
                        topBoundClient = thisDiv.getBoundingClientRect().top;
                        leftBoundClient = thisDiv.getBoundingClientRect().left;
                    }
                })
            }
        }
    }
}
