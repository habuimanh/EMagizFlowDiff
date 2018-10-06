// import React from "react"
// import PropTypes from "prop-types"
// import { observable } from "mobx"
// import { AppState } from "../../dist/ApplicationState"
// const mobx_react_1 = require("mobx-react");

// var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
//     var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
//     if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
//     else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
//     return c > 3 && r && Object.defineProperty(target, key, r), r;
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// let Container = class Container extends React.Component {
//     render() {
//         return <div>
//             <MxObject guid="1234" isHightlight={this.props.appData.SelectedId === "1234"} hightlight={() => this.props.appData.selectObject("1234")}></MxObject>
//             <Element guid="1234" isHightlight={this.props.appData.SelectedId === "1234"} hightlight={() => this.props.appData.selectObject("1234")}></Element>
//         </div>
//     }
// }
// Container = __decorate([
//     mobx_react_1.observer
// ], Container);
// exports.Container = Container

// Container.propTypes = {
//     appData: AppState.isRequired
// }

// export class MxObject extends React.Component {
//     render() {
//         return <div id={this.props.guid}
//             onClick={() => this.props.hightlight(this.props.guid)}>
//         </div>
//     }
// }

// export class Element extends React.Component {
//     render() {
//         return <div key={this.props.guid}
//             onClick={() => this.props.hightlight(this.props.guid)}>
//         </div>
//     }
// }

// Element.propTypes = {
//     guid: PropTypes.string.isRequired,
//     isHightlight: PropTypes.bool.isRequired,
//     hightlight: PropTypes.func.isRequired
// }

// MxObject.propTypes = {
//     guid: PropTypes.string.isRequired,
//     isHightlight: PropTypes.bool.isRequired,
//     hightlight: PropTypes.func.isRequired
// }