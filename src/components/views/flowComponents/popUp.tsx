import React = require("react")
//import ReactDOM = require("react-dom")
// import { Modal, Button } from "react-bootstrap"
import Rnd from 'react-rnd';
import * as I from "./interfaces";
import { stringDiff } from './diff';
import { markSpanDiffCharacter2Strings } from "./utils";
export class PopUp extends React.Component<{ onlyShowChange: boolean, handleInputChange: () => void, revision1: Object, revision2: Object, config: Object, tittle: string, setUnShowDiff: () => void, detailObjectCompared: I.IDetailObjectCompared, resetDetailObjectCompared: () => void }, { show: boolean, width: number, height: number, x: number, y: number }> {
    constructor(props) {
        super(props);
        this.state = {
            width: 800,
            height: 600,
            x: window.innerWidth / 2 - 800 / 2 - 21,
            y: window.innerHeight / 2 - 600 / 2 - 50,
            show: true
        }
    }
    onClose() {
        this.setState({
            ...this.state,
            show: false
        });
        this.props.setUnShowDiff();
        this.props.resetDetailObjectCompared();
    }
    showOrHide() {
        return !this.state.show
    }
    handleOnDragStop(e, d) {
        this.setState({
            ...this.state,
            x: d.x,
            y: d.y
        })
    }
    handleOnResize(e, direction, ref, delta, position) {
        this.setState({
            ...this.state,
            x: position.x,
            y: position.y,
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        });
    }
    render() {
        const style = {
            justifyContent: 'center',
            border: 'solid 1px #ddd',
            background: 'white',
            zIndex: 1
        };
        const changes = stringDiff(this.props.detailObjectCompared.name1, this.props.detailObjectCompared.name2, false);
        const spanDiffCharacter2Strings = markSpanDiffCharacter2Strings(this.props.detailObjectCompared.name1, this.props.detailObjectCompared.name2, changes, this.props.config['edited'])
        return <div id="pop-up" className="ReactModalPortal">
            {this.state.show ?
                <Rnd minWidth={580} minHeight={200} cancel=".modal-body" overlayClassName="modal-overlay" style={style} position={{ x: this.state.x, y: this.state.y }} size={{ width: this.state.width, height: this.state.height }}
                    onDragStop={this.handleOnDragStop.bind(this)}
                    onResize={this.handleOnResize.bind(this)}
                    isOpen={this.state.show} onRequestClose={this.onClose.bind(this)} >
                    <div className="modal-header">
                        <h4 className="modal-title"> {this.props.tittle}</h4>
                    </div>
                    <div className="diff-controls" style={{ paddingLeft: 20, borderBottom: "solid #ddd 1px" }}>
                        <span style={{ width: "calc(100% - 550px)", display: "inline-block" }}>
                            <input name="isGoing" type="checkbox" checked={this.props.onlyShowChange} onChange={this.props.handleInputChange} />Only show changes
                            </span>
                        <span style={{ width: "250px", display: "inline-block" }}>{"Version " + this.props.revision1['version']}</span>
                        <span style={{ width: 250, display: "inline-block", color: this.props.config['added'] }}>{"Version " + this.props.revision2['version']}</span>
                    </div>
                    <div style={{ width: "100%", height: this.state.height - 262, cursor: "pointer" }} className="modal-body" ref="modal-body">
                        {this.props.children}
                    </div>
                    <div className="modal-select-container">
                        {this.props.detailObjectCompared.show ?
                            [<div className="modal-select-container-first-element">
                                <div className="modal-select-first-attribute-element">{this.props.detailObjectCompared.nameAttribute + "  "}<span >{"(" + this.props.revision1['version'] + ")"}</span></div>
                                <div className="modal-select-first-value-element">{spanDiffCharacter2Strings.listSpan1}</div>
                            </div>,
                            <div className="modal-select-container-second-element">
                                <div className="modal-select-second-attribute-element">{this.props.detailObjectCompared.nameAttribute + " "}<span style={{ color: this.props.config['added'] }}>{"(" + this.props.revision2['version'] + ")"}</span></div>
                                <div className="modal-select-second-value-element">{spanDiffCharacter2Strings.listSpan2}</div></div>] :
                            <div className="modal-select-nothing">Nothing selected</div>
                        }
                    </div>
                    <div className="modal-footer" style={{ position: "absolute", bottom: 15 }}>
                        <button onClick={this.onClose.bind(this)} className="close-button">Close</button>
                    </div>
                </Rnd> : undefined}
        </div >
    }
    componentDidUpdate() {
        this.state.show = true;
        document.getElementById("pop-up")!.style.position = "static";
    }
    componentDidMount() {
        document.getElementById("pop-up")!.style.position = "static";
    }
}