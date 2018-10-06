import React = require("react")
import { diff, input } from "../Interface"
import { IViewOption, checkInMetaData } from "./diffPopUp"
import { markSpanDiffCharacter2Strings } from "./flowComponents/utils"
import { stringDiff } from './flowComponents/diff';
export class SingleObj extends React.Component<{ config: input.Config, diff: any, member: number, index: number, handleClickGridRow: () => void, detailObjectCompared: any }, {}>{
    render(): any {
        const nextIndex = this.props.index + 10;
        let result: JSX.Element[] = [];
        if (this.props.diff instanceof Object) {
            for (let i in this.props.diff) {
                if (checkInMetaData(i)) continue;
                if (!(this.props.diff[i] instanceof Object)) {
                    result.push(<SingleItem handleClickGridRow={this.props.handleClickGridRow} detailObjectCompared={this.props.detailObjectCompared} indexID={this.props.diff.indexID} name={i} config={this.props.config} value={this.props.diff[i]} member={this.props.member} index={this.props.index} />)
                } else {
                    if (this.props.diff[i]['member1'] != undefined && this.props.diff[i]['member2'] == undefined) {
                        result.push(<SingleObjectItem handleClickGridRow={this.props.handleClickGridRow} detailObjectCompared={this.props.detailObjectCompared} diff={this.props.diff[i]} name={i} config={this.props.config} value={this.props.diff[i]['member1']} member={1} index={this.props.index} />)
                    }
                    else if (this.props.diff[i]['member1'] == undefined && this.props.diff[i]['member2'] != undefined) {
                        result.push(<SingleObjectItem handleClickGridRow={this.props.handleClickGridRow} detailObjectCompared={this.props.detailObjectCompared} diff={this.props.diff[i]} name={i} config={this.props.config} value={this.props.diff[i]['member2']} member={2} index={this.props.index} />)

                    }
                    else {
                        result.push(<DiffContainer name={i} index={this.props.index} backgroundColor={this.props.member == 1 ? this.props.config.deleted : this.props.config.added} config={this.props.config}>
                            <SingleObj handleClickGridRow={this.props.handleClickGridRow} detailObjectCompared={this.props.detailObjectCompared} config={this.props.config} diff={this.props.diff[i]} member={this.props.member} index={nextIndex} />
                        </DiffContainer>)
                    }
                }
            }
        }
        return [result]
    }
}
export const SingleItem = (props: { detailObjectCompared: any, indexID: number, member: number, name: string, value?: string | number | boolean, index: number, config: input.Config, handleClickGridRow: (indexID: number, nameAtribute: string, name1: string, name2: string, isSingleItem: boolean) => void }) => (
    <li className="diff-attribute" onClick={() => props.handleClickGridRow(props.indexID, props.name, props.member === 1 ? props.value : "", props.member === 2 ? props.value : "", true)}>
        {props.member === 1 ? [
            <div className="attribute-row has-deleted">
                {props.detailObjectCompared.show && props.detailObjectCompared.indexID === props.indexID && props.detailObjectCompared.nameAttribute === props.name ?
                    <span className="attribute-title selected">{props.name}</span>
                    : <span className="attribute-title">{props.name}</span>
                }
                {props.detailObjectCompared.show && props.detailObjectCompared.indexID === props.indexID && props.detailObjectCompared.nameAttribute === props.name ?
                    <span className="attribute-value-old selected" >{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>
                    : <span className="attribute-value-old" >{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>
                }
                <span className="attribute-value-new"></span>
            </div>
        ] : [
                <div className="attribute-row has-added">
                    {props.detailObjectCompared.show && props.detailObjectCompared.indexID === props.indexID && props.detailObjectCompared.nameAttribute === props.name ?
                        <span className="attribute-title selected">{props.name}</span>
                        : <span className="attribute-title">{props.name}</span>
                    }
                    <span className="attribute-value-old"></span>
                    {props.detailObjectCompared.show && props.detailObjectCompared.indexID === props.indexID && props.detailObjectCompared.nameAttribute === props.name ?
                        <span className="attribute-value-new selected">{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>
                        : <span className="attribute-value-new">{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>
                    }
                </div>
            ]}
    </li>
)

export class PairItem extends React.Component<{ detailObjectCompared: any, diff: diff.IDiff, name: string, config: input.Config, index: number, handleClickGridRow: (indexID: number, nameAtribute: string, name1: string, name2: string) => void }, {}>  {
    render() {
        const props = this.props;
        if ((props.diff['member1'] === true || props.diff['member1'] === false) &&
            (props.diff['member2'] === true || props.diff['member2'] === false)) {
            const name1 = props.diff['member1'] ? 'true' : 'false';
            const name2 = props.diff['member2'] ? 'true' : 'false';
            const changes = stringDiff(name1, name2, false);
            const spanDiffCharacter2Strings = markSpanDiffCharacter2Strings(name1, name2, changes, props.config.edited);
            return <li className="diff-attribute" onClick={() => props.handleClickGridRow(props.diff.indexID, props.name, props.diff['member1'] ? 'true' : 'false', props.diff['member2'] ? 'true' : 'false')}>
                <div className="attribute-row has-change">
                    {props.detailObjectCompared.show && props.detailObjectCompared.indexID === props.diff.indexID ?
                        [<span className="attribute-title selected">{props.name}</span>,
                        <span className="attribute-value-old selected">{spanDiffCharacter2Strings.listSpan1}</span>,
                        <span className="attribute-value-new selected">{spanDiffCharacter2Strings.listSpan2}</span>] :
                        [<span className="attribute-title">{props.name}</span>,
                        <span className="attribute-value-old">{spanDiffCharacter2Strings.listSpan1}</span>,
                        <span className="attribute-value-new">{spanDiffCharacter2Strings.listSpan2}</span>]}
                </div>
            </li>
        }
        else {
            const name1 = props.diff['member1'] ? props.diff['member1'] : 'undefined';
            const name2 = props.diff['member2'] ? props.diff['member2'] : 'undefined'
            const changes = stringDiff(name1, name2, false);
            const spanDiffCharacter2Strings = markSpanDiffCharacter2Strings(name1, name2, changes, props.config.edited);
            return <li className="diff-attribute" onClick={() => props.handleClickGridRow(props.diff.indexID, props.name, props.diff['member1'] ? props.diff['member1'] : 'undefined', props.diff['member2'] ? props.diff['member2'] : 'undefined')}>
                <div className="attribute-row has-change">{props.detailObjectCompared.show && props.detailObjectCompared.indexID === props.diff.indexID ?
                    [<span className="attribute-title selected">{props.name}</span>,
                    <span className="attribute-value-old selected">{spanDiffCharacter2Strings.listSpan1}</span>,
                    <span className="attribute-value-new selected">{spanDiffCharacter2Strings.listSpan2}</span>] :
                    [<span className="attribute-title">{props.name}</span>,
                    <span className="attribute-value-old">{spanDiffCharacter2Strings.listSpan1}</span>,
                    <span className="attribute-value-new">{spanDiffCharacter2Strings.listSpan2}</span>]}
                </div>
            </li>
        }
    }
}
export const DiffContainer = (props: { name: string, index: number, backgroundColor: string, config: Object }) => (
    <li className="diff-list">
        {props.backgroundColor === 'grey' ?
            <div className="list-title">{props.name}</div> : (
                props.backgroundColor === props.config['added'] ?
                    <div className="list-title has-added">{props.name}</div> :
                    (props.backgroundColor === props.config['deleted'] ?
                        <div className="list-title has-deleted">{props.name}</div> :
                        <div className="list-title has-change">{props.name}</div>)
            )}
        <ul className="diff-list">
            {props['children']}
        </ul>
    </li>
)
export const SameItem = (props: { diff: diff.IDiff, detailObjectCompared: any, name: string, value?: string | number | boolean, index: number, handleClickGridRow: (indexID: number, nameAtribute: string, name1: string, name2: string) => void }) => (
    <li className="diff-attribute" onClick={() => props.handleClickGridRow(props.diff.indexID, props.name, props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value, props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value)}>
        <div className="attribute-row">
            {props.detailObjectCompared.show && props.detailObjectCompared.indexID === props.diff.indexID ?
                [<span className="attribute-title selected">{props.name}</span>,
                <span className="attribute-value-old selected">{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>,
                <span className="attribute-value-new selected">{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>] :
                [<span className="attribute-title">{props.name}</span>,
                <span className="attribute-value-old">{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>,
                <span className="attribute-value-new">{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>]}
        </div>
    </li>
)
export const SingleObjectItem = (props: { detailObjectCompared: any, diff: diff.IDiff, member: number, name: string, value?: string | number | boolean, index: number, config: input.Config, handleClickGridRow: (indexID: number, nameAtribute: string, name1: string, name2: string) => void }) => (
    <li className="diff-attribute" onClick={() => props.handleClickGridRow(props.diff.indexID, props.name, props.member === 1 ? props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value : "", props.member === 2 ? props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value : "")}>
        {props.member === 1 ? [<div className="attribute-row has-deleted">
            {props.detailObjectCompared.show && props.detailObjectCompared.indexID === props.diff.indexID ?
                [<span className="attribute-title selected">{props.name}</span>,
                <span className="attribute-value-old selected">{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>] :
                [<span className="attribute-title">{props.name}</span>,
                <span className="attribute-value-old">{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>]}
            <span className="attribute-value-new"></span></div>] :
            [<div className="attribute-row has-added">
                {props.detailObjectCompared.show && props.detailObjectCompared.indexID === props.diff.indexID ?
                    [<span className="attribute-title selected">{props.name}</span>,
                    <span className="attribute-value-old"></span>,
                    <span className="attribute-value-new selected">{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>] :
                    [<span className="attribute-title">{props.name}</span>,
                    <span className="attribute-value-old"></span>,
                    <span className="attribute-value-new">{props.value === true || props.value === false ? (props.value ? "true" : "false") : props.value}</span>]}
            </div>]}

    </li >
)

export class ElementContainer extends React.Component<{ name: string, viewOption: IViewOption }, { isShowed: boolean }> {
    constructor(props) {
        super(props)
        this.state = {
            isShowed: true,
        }
    }
    _body: HTMLDivElement
    showOrHideContent() {
        if (this.state.isShowed) {
            this._body.style.display = "none";
        } else {
            this._body.style.display = "block";
        }
        this.setState({ isShowed: !this.state.isShowed })
    }
    componentWillReceiveProps(nextProps: { viewOption: IViewOption }) {
        this.setState({
            isShowed: !!nextProps.viewOption.foldAll
        })
    }
    render() {
        return <div style={{ height: "100%" }} className="mx-mf-details-sidebar mx-mf-details-sidebar-active element-container" role="dialog" aria-hidden={false}>
            <div className="mx-mf-details-sidebar-contents">
                <div className="mx-mf-details-body" ref={body => this._body = body} style={{ display: this.props.viewOption.foldAll ? "none" : "block" }}>
                    <div class="diff-container">
                        <ul class="diff-root diff-list">
                            {this.props.children}
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    }
}