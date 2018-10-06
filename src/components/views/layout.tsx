import React = require('react')
import SplitPane = require('react-split-pane')
import { DiffPopUp } from './diffPopUp'
import { input } from "./../Interface";
import { EMagizFlowContainer } from "./eMagizFlowContainer"
import { OverViewBarContainer } from "./overViewBarContainer"
import ReactDOM = require("react-dom");
import * as I from "./flowComponents/interfaces";
export class Layout extends React.Component<I.ILayoutProps, I.ILayoutState> {
    property: I.ILayoutProperty;
    constructor(props) {
        super(props);
        this.property = {
            mouseClientX: 0,
            mouseClientY: 0,
            prevScrollLeft1: 0,
            prevScrollTop1: 0,
            prevScrollLeft2: 0,
            prevScrollTop2: 0,
            isClicked: false
        }
        this.state = {
            offSetWidth: 0,
            scrollWidth1: 0,
            scrollWidth2: 0
        }
        this.onScroll1 = this.onScroll1.bind(this);
        this.onScroll2 = this.onScroll2.bind(this);
        this.setPrevScroll = this.setPrevScroll.bind(this);
        this.setIsClicked = this.setIsClicked.bind(this);
    }
    setPrevScroll(scrollLeft1: number, scrollTop1: number, scrollLeft2: number, scrollTop2: number) {
        this.property.prevScrollLeft1 = scrollLeft1;
        this.property.prevScrollLeft2 = scrollLeft2;
        this.property.prevScrollTop1 = scrollTop1;
        this.property.prevScrollTop2 = scrollTop2;
        this.property.isClicked = false
    }
    setIsClicked() {
        this.property.isClicked = true;
    }
    onScroll1() {
        const { eMagizProperty } = this.props;
        const refVersion1 = ReactDOM.findDOMNode(this.refs['1']);
        const refVersion2 = ReactDOM.findDOMNode(this.refs['2']);
        if (refVersion1 && refVersion2 && !this.property.isClicked) {
            const clientHeight1 = refVersion1.clientHeight + eMagizProperty.topBoundClient;
            const clientWidth = refVersion1.clientWidth + eMagizProperty.leftBoundClient;
            const scrollVertical1 = refVersion1.clientHeight < refVersion1.scrollHeight ? 17 : 0
            const scrollHorizontal1 = refVersion1.clientWidth < refVersion1.scrollWidth ? 17 : 0
            if (this.property.mouseClientY <= clientHeight1 + scrollHorizontal1 && this.property.mouseClientX <= clientWidth + scrollVertical1) {
                if (refVersion1.scrollWidth > refVersion1.clientWidth && refVersion1.scrollLeft != this.property.prevScrollLeft1
                ) {
                    refVersion2.scrollLeft = refVersion1.scrollLeft;
                }
                if (refVersion1.scrollHeight > refVersion1.clientHeight && refVersion1.scrollTop != this.property.prevScrollTop1
                ) {
                    refVersion2.scrollTop = refVersion1.scrollTop;
                }
            }
            this.setPrevScroll(refVersion1.scrollLeft, refVersion1.scrollTop, refVersion2.scrollLeft, refVersion2.scrollTop)
        }
        else if (this.property.isClicked) {
            this.property.isClicked = false;
        }
    }
    onScroll2() {
        const { topBoundClient, leftBoundClient } = this.props.eMagizProperty;
        const refVersion1 = ReactDOM.findDOMNode(this.refs['1']);
        const refVersion2 = ReactDOM.findDOMNode(this.refs['2']);
        if (refVersion1 && refVersion2 && !this.property.isClicked) {
            const scrollHorizontal1 = refVersion1.clientWidth < refVersion1.scrollWidth ? 17 : 0
            const scrollVertical2 = refVersion2.clientHeight < refVersion2.scrollHeight ? 17 : 0
            const scrollHorizontal2 = refVersion2.clientWidth < refVersion2.scrollWidth ? 17 : 0
            const clientHeight1 = refVersion1.clientHeight + topBoundClient + 17;
            const clientHeight2 = clientHeight1 + scrollHorizontal1 + refVersion2.clientHeight;
            const clientWidth = refVersion1.clientWidth + leftBoundClient;
            if (this.property.mouseClientY <= clientHeight2 + scrollHorizontal2 && this.property.mouseClientX <= clientWidth + scrollVertical2 &&
                this.property.mouseClientY > clientHeight1 + scrollHorizontal1) {
                if (refVersion2.scrollWidth > refVersion2.clientWidth && refVersion2.scrollLeft != this.property.prevScrollLeft2
                ) {
                    refVersion1.scrollLeft = refVersion2.scrollLeft;
                }
                if (refVersion2.scrollHeight > refVersion2.clientHeight && refVersion2.scrollTop != this.property.prevScrollTop2
                ) {
                    refVersion1.scrollTop = refVersion2.scrollTop;
                }
            }
            this.setPrevScroll(refVersion1.scrollLeft, refVersion1.scrollTop, refVersion2.scrollLeft, refVersion2.scrollTop)
        } else if (this.property.isClicked) {
            this.property.isClicked = false;
        }
    }
    componentDidMount() {
        const refVersion1 = ReactDOM.findDOMNode(this.refs['1']);
        const refVersion2 = ReactDOM.findDOMNode(this.refs['2']);
        if (refVersion1 && refVersion2) {
            this.setState({
                scrollWidth1: refVersion1.scrollWidth,
                scrollWidth2: refVersion2.scrollWidth,
                offSetWidth: refVersion1.offsetWidth
            })
        }
    }
    componentWillReceiveProps() {
        const refVersion1 = ReactDOM.findDOMNode(this.refs['1']);
        const refVersion2 = ReactDOM.findDOMNode(this.refs['2']);
        if (refVersion1 && refVersion2) {
            this.setState({
                scrollWidth1: refVersion1.scrollWidth,
                scrollWidth2: refVersion2.scrollWidth,
                offSetWidth: refVersion1.offsetWidth
            })
        }
    }

    setMousePosition(e: React.MouseEvent) {
        const divLayoutContainer = document.getElementById("eMagizFlowDiff");
        if (!divLayoutContainer) return;
        const heightReducdancy = window.innerHeight - divLayoutContainer.offsetHeight;
        this.property.mouseClientX = e.clientX; this.property.mouseClientY = e.clientY - heightReducdancy;
    }

    render() {
        const { onScroll1, onScroll2, setIsClicked } = this;
        const { setCommonInfo, setShowDiff, appState, eMagizProperty, onSelect, setUnShowDiff, setShowFlow, foldAll, hidePosition } = this.props;
        const { offSetWidth, scrollWidth1, scrollWidth2 } = this.state;
        return <div onMouseMove={(e: React.MouseEvent) => { this.setMousePosition(e) }} id={"eMagizFlowDiff"} style={{ position: "relative" }}>
            <div style={{ position: "absolute", width: "100%", height: "100%" }}>
                <SplitPane split="horizontal" defaultSize="45%" maxSize={-200}>
                    <EMagizFlowContainer config={eMagizProperty.configColor!} paneAbove={true}
                        setShowDiff={setShowDiff}
                        isClicked={setIsClicked} onScroll={onScroll1} ref="1"
                        revision={eMagizProperty.revision1 as input.IInput} diff={eMagizProperty.flowDiff}
                        hidePosition={appState.hidePosition}
                        highlightedId={appState.selectedId} onSelectObject={onSelect} />
                    <SplitPane split="horizontal" defaultSize="30px" allowResize={false} pane2Style={{ display: "flex" }}>
                        <OverViewBarContainer offSetWidth={offSetWidth}
                            config={eMagizProperty.configColor!}
                            scrollWidth1={scrollWidth1} scrollWidth2={scrollWidth2}
                            revision1={eMagizProperty.revision1 as input.IInput}
                            revision2={eMagizProperty.revision2 as input.IInput}
                            diff={eMagizProperty.flowDiff} hidePosition={appState.hidePosition}
                            highlightedId={appState.selectedId} />
                        <EMagizFlowContainer
                            config={eMagizProperty.configColor!} paneAbove={false}
                            setShowDiff={setShowDiff}
                            isClicked={setIsClicked} ref="2" onScroll={onScroll2}
                            revision={eMagizProperty.revision2 as input.IInput} diff={eMagizProperty.flowDiff}
                            hidePosition={appState.hidePosition}
                            highlightedId={appState.selectedId} onSelectObject={onSelect} />
                    </SplitPane>
                </SplitPane>
                <DiffPopUp
                    revision1={eMagizProperty.revision1 as input.IInput}
                    revision2={eMagizProperty.revision2 as input.IInput}
                    convertName={eMagizProperty.convertNames}
                    config={eMagizProperty.configColor!}
                    showDiff={appState.showDiff}
                    setUnShowDiff={setUnShowDiff}
                    showFlow={appState.showFlow}
                    onChangeShowFlow={setShowFlow}
                    onShowCommonInfo={setCommonInfo}
                    showCommonInfo={appState.showCommonInfo}
                    flowDiff={eMagizProperty.flowDiff}
                    foldAll={appState.foldAll}
                    hidePosition={appState.hidePosition}
                    onChangeFold={foldAll}
                    onHidePosition={hidePosition}
                    selectedId={appState.selectedId}
                    onSelectObject={onSelect} />
            </div>
        </div >
    }
}