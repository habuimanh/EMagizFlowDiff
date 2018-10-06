/// <reference path="./../../../../typings/index.d.ts" /> 
import * as React from "react";
import * as I from "./interfaces";
import { diff, input } from "./../../Interface";
import EMagizComponent = require("./indexComponents");
import { OverViewBar } from "./overviewBar";
export function markSpanDiffCharacter2Strings(originalString: string, modifiedString: string, listDiffChange: any[], colorHighlight: string) {
    let listSpan: I.IListSpan = {
        listSpan1: [],
        listSpan2: []

    }
    let iC = 0;
    for (let i = 0; i < originalString.length; ++i) {
        if (iC < listDiffChange.length && i === listDiffChange[iC].originalStart) {
            let stringDiff = "";
            for (let j = i; j < listDiffChange[iC].originalStart + listDiffChange[iC].originalLength; ++j) {
                stringDiff += originalString[i];
                i++;
            }
            i--;
            iC++;
            listSpan.listSpan1.push(<div style={{ display: "inline-block", background: colorHighlight, color: "white" }}>{stringDiff}</div>)
        } else {
            listSpan.listSpan1.push(originalString[i])
        }
    }
    iC = 0;
    for (let i = 0; i < modifiedString.length; ++i) {
        if (iC < listDiffChange.length && i === listDiffChange[iC].modifiedStart) {
            let stringDiff = "";
            for (let j = i; j < listDiffChange[iC].modifiedStart + listDiffChange[iC].modifiedLength; ++j) {
                stringDiff += modifiedString[i];
                i++;
            }
            i--;
            iC++;
            listSpan.listSpan2.push(<div style={{ display: "inline-block", background: colorHighlight, color: "white" }}>{stringDiff}</div>)
        } else {
            listSpan.listSpan2.push(modifiedString[i])
        }
    }
    return listSpan;
}
// export function markSpanDiffCharacter2Strings(originalString: string, modifiedString: string, listDiffChange: any[], colorHighlight: string) {
//     let listSpan: I.IListSpan = {
//         listSpan1: [],
//         listSpan2: []

//     }
//     let iC = 0;
//     for (let i = 0; i < originalString.length; ++i) {
//         if (iC < listDiffChange.length && i === listDiffChange[iC].originalStart) {
//             let stringDiff = "";
//             for (let j = i; j < listDiffChange[iC].originalStart + listDiffChange[iC].originalLength; ++j) {
//                 stringDiff += originalString[i];
//                 i++;
//             }
//             if (i < originalString.length) i--;
//             iC++;
//             listSpan.listSpan1.push(<div style={{ display: "inline-block", background: colorHighlight, color: "white" }}>{stringDiff}</div>)
//         } else {
//             let str = "";
//             while ((iC < listDiffChange.length && i < originalString.length && i != listDiffChange[iC].originalStart) || (iC >= listDiffChange.length && i < originalString.length)) {
//                 str += originalString[i];
//                 i++;
//             }
//             if (i < originalString.length) i--;
//             listSpan.listSpan1.push(str)
//         }
//     }
//     iC = 0;
//     for (let i = 0; i < modifiedString.length; ++i) {
//         if (iC < listDiffChange.length && i === listDiffChange[iC].modifiedStart) {
//             let stringDiff = "";
//             for (let j = i; j < listDiffChange[iC].modifiedStart + listDiffChange[iC].modifiedLength; ++j) {
//                 stringDiff += modifiedString[i];
//                 i++;
//             }
//             if (i < modifiedString.length) i--;
//             iC++;
//             listSpan.listSpan2.push(<div style={{ display: "inline-block", background: colorHighlight, color: "white" }}>{stringDiff}</div>)
//         } else {
//             let str = "";
//             while ((iC < listDiffChange.length && i < modifiedString.length && i != listDiffChange[iC].modifiedStart) || (iC >= listDiffChange.length && i < modifiedString.length)) {
//                 str += modifiedString[i];
//                 i++;
//             }
//             if (i < modifiedString.length) i--;
//             listSpan.listSpan2.push(str)
//         }
//     }
//     return listSpan;
// }
export function renderDiffComponent(config: input.Config,
    diff: diff.IFlowDiff | undefined, listObjectData: I.IObjectDict, listHighlightObject: (JSX.Element | undefined)[]) {
    if (diff) {
        diff.deletedComponents.forEach(del => {
            if (listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Rectangle) {
                listHighlightObject.push(<EMagizComponent.HighlightRectangle key={del.guid} data={listObjectData[del.guid]} color={config.deleted} />)
            } else if (listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Circle) {
                listHighlightObject.push(<EMagizComponent.HighlightCircle key={del.guid} data={listObjectData[del.guid]} color={config.deleted} />)
            } else if (listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Filter) {
                listHighlightObject.push(<EMagizComponent.HighlightFilter key={del.guid} data={listObjectData[del.guid]} color={config.deleted} />)
            } else if (listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Active) {
                listHighlightObject.push(<EMagizComponent.HighlightActive key={del.guid} data={listObjectData[del.guid]} color={config.deleted} />)
            } else if (listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Split) {
                listHighlightObject.push(<EMagizComponent.HighlightSplit key={del.guid} data={listObjectData[del.guid]} color={config.deleted} />)
            } else if (listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Route) {
                listHighlightObject.push(<EMagizComponent.HighlightRoute key={del.guid} data={listObjectData[del.guid]} color={config.deleted} />)
            }
            else if ((listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Receive)) {
                listHighlightObject.push(<EMagizComponent.HighlightPost key={del.guid} data={listObjectData[del.guid]} color={config.deleted} />)
            }
            else if ((listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Send)) {
                listHighlightObject.push(<EMagizComponent.HighlightSend key={del.guid} data={listObjectData[del.guid]} color={config.deleted} />)
            }
        })
        diff.editedComponents.forEach(edit => {
            if (edit.isDiff) {
                if (listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Rectangle) {
                    listHighlightObject.push(<EMagizComponent.HighlightRectangle key={edit.guid} data={listObjectData[edit.guid]} color={config.edited} />)
                }
                else if (listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Circle) {
                    listHighlightObject.push(<EMagizComponent.HighlightCircle key={edit.guid} data={listObjectData[edit.guid]} color={config.edited} />)
                }
                else if (listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Filter) {
                    listHighlightObject.push(<EMagizComponent.HighlightFilter key={edit.guid} data={listObjectData[edit.guid]} color={config.edited} />)
                }
                else if (listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Active) {
                    listHighlightObject.push(<EMagizComponent.HighlightActive key={edit.guid} data={listObjectData[edit.guid]} color={config.edited} />)
                }
                else if (listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Split) {
                    listHighlightObject.push(<EMagizComponent.HighlightSplit key={edit.guid} data={listObjectData[edit.guid]} color={config.edited} />)
                }
                else if (listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Route) {
                    listHighlightObject.push(<EMagizComponent.HighlightRoute key={edit.guid} data={listObjectData[edit.guid]} color={config.edited} />)
                }
                else if ((listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Receive)) {
                    listHighlightObject.push(<EMagizComponent.HighlightPost key={edit.guid} data={listObjectData[edit.guid]} color={config.edited} />)
                } else if ((listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Send)) {
                    listHighlightObject.push(<EMagizComponent.HighlightSend key={edit.guid} data={listObjectData[edit.guid]} color={config.edited} />)
                }
            }
        })
        diff.newComponents.forEach(neww => {
            if (listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Rectangle) {
                listHighlightObject.push(<EMagizComponent.HighlightRectangle key={neww.guid} data={listObjectData[neww.guid]} color={config.added} />)
            }
            else if (listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Circle) {
                listHighlightObject.push(<EMagizComponent.HighlightCircle key={neww.guid} data={listObjectData[neww.guid]} color={config.added} />)
            } else if (listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Filter) {
                listHighlightObject.push(<EMagizComponent.HighlightFilter key={neww.guid} data={listObjectData[neww.guid]} color={config.added} />)
            }
            else if (listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Active) {
                listHighlightObject.push(<EMagizComponent.HighlightActive key={neww.guid} data={listObjectData[neww.guid]} color={config.added} />)
            }
            else if (listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Split) {
                listHighlightObject.push(<EMagizComponent.HighlightSplit key={neww.guid} data={listObjectData[neww.guid]} color={config.added} />)
            }
            else if (listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Route) {
                listHighlightObject.push(<EMagizComponent.HighlightRoute key={neww.guid} data={listObjectData[neww.guid]} color={config.added} />)
            }
            else if ((listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Receive)) {
                listHighlightObject.push(<EMagizComponent.HighlightPost key={neww.guid} data={listObjectData[neww.guid]} color={config.added} />)
            } else if ((listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Send)) {
                listHighlightObject.push(<EMagizComponent.HighlightSend key={neww.guid} data={listObjectData[neww.guid]} color={config.added} />)
            }
        })
    }
}
export function renderOverView(config: input.Config, diff: diff.IFlowDiff | undefined, listObjectData: I.IObjectDict,
    listHighlightObject: (JSX.Element | undefined)[], propotionWidth: number, version: string) {
    if (diff) {
        diff.deletedComponents.forEach(del => {
            if (listObjectData[del.guid]) {
                listHighlightObject.push(<OverViewBar data={listObjectData[del.guid]} hightlightStyle={config.deleted} version={version} propotionWidth={propotionWidth} />)
            }
        })
        diff.editedComponents.forEach(edit => {
            if (edit.isDiff) {
                if (listObjectData[edit.guid]) {
                    listHighlightObject.push(<OverViewBar data={listObjectData[edit.guid]} hightlightStyle={config.edited} version={version} propotionWidth={propotionWidth} />)
                }
            }
        })
        diff.newComponents.forEach(neww => {
            if (listObjectData[neww.guid]) {
                listHighlightObject.push(<OverViewBar data={listObjectData[neww.guid]} hightlightStyle={config.added} version={version} propotionWidth={propotionWidth} />)
            }
        })
    }
}
export function renderDiffHidePositionComponent(diff: diff.IFlowDiff | undefined, listObjectData: I.IObjectDict, listHighlightObject: (JSX.Element | undefined)[]) {
    if (diff) {
        diff.deletedComponents.forEach(del => {
            if (listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Rectangle) {
                listHighlightObject.push(<EMagizComponent.HighlightRectangle key={del.guid} data={listObjectData[del.guid]} color="#ffb6ba" />)
            } else if (listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Circle) {
                listHighlightObject.push(<EMagizComponent.HighlightCircle key={del.guid} data={listObjectData[del.guid]} color="#ffb6ba" />)
            }
        })
        diff.editedComponents.forEach(edit => {
            if (edit.isDiff) {
                let checkOnlyPosition: boolean = true;
                for (let prop in edit) {
                    if (prop === "position") {
                        continue;
                    }
                    if (edit[prop].isDiff && edit[prop].isDiff) {
                        checkOnlyPosition = false;
                        break;
                    }
                }
                if (!checkOnlyPosition) {
                    if (listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Rectangle) {
                        listHighlightObject.push(<EMagizComponent.HighlightRectangle key={edit.guid} data={listObjectData[edit.guid]} color="rgba(3, 102, 214, 0.73)" />)
                    }
                    else if (listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Circle) {
                        listHighlightObject.push(<EMagizComponent.HighlightCircle key={edit.guid} data={listObjectData[edit.guid]} color="rgba(3, 102, 214, 0.73)" />)
                    }
                }
            }
        })
        diff.newComponents.forEach(neww => {
            if (listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Rectangle) {
                listHighlightObject.push(<EMagizComponent.HighlightRectangle key={neww.guid} data={listObjectData[neww.guid]} color="#97f295" />)
            }
            else if (listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Circle) {
                listHighlightObject.push(<EMagizComponent.HighlightCircle key={neww.guid} data={listObjectData[neww.guid]} color="#97f295" />)
            }
        })
    }
}
export function renderHidePositionOverView(diff: diff.IFlowDiff | undefined, listObjectData: I.IObjectDict,
    listHighlightObject: (JSX.Element | undefined)[], propotionWidth: number, version: string) {
    if (diff) {
        diff.deletedComponents.forEach(del => {
            if (listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Rectangle) {
                listHighlightObject.push(<OverViewBar data={listObjectData[del.guid]} hightlightStyle="#ffb6ba" version={version} propotionWidth={propotionWidth} />)
            } else if (listObjectData[del.guid] && listObjectData[del.guid].type === I.TypeComponents.Circle) {
                listHighlightObject.push(<OverViewBar data={listObjectData[del.guid]} hightlightStyle="#ffb6ba" version={version} propotionWidth={propotionWidth} />)
            }
        })
        diff.editedComponents.forEach(edit => {
            if (edit.isDiff) {
                let checkOnlyPosition: boolean = true;
                for (let prop in edit) {
                    if (prop === "position") {
                        continue;
                    }
                    if (edit[prop].isDiff && edit[prop].isDiff) {
                        checkOnlyPosition = false;
                        break;
                    }
                }
                if (!checkOnlyPosition) {
                    if (listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Rectangle) {
                        listHighlightObject.push(<OverViewBar data={listObjectData[edit.guid]} hightlightStyle="rgba(3, 102, 214, 0.73)" version={version} propotionWidth={propotionWidth} />)
                    }
                    else if (listObjectData[edit.guid] && listObjectData[edit.guid].type === I.TypeComponents.Circle) {
                        listHighlightObject.push(<OverViewBar data={listObjectData[edit.guid]} hightlightStyle="rgba(3, 102, 214, 0.73)" version={version} propotionWidth={propotionWidth} />)
                    }
                }
            }
        })
        diff.newComponents.forEach(neww => {
            if (listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Rectangle) {
                listHighlightObject.push(<OverViewBar data={listObjectData[neww.guid]} hightlightStyle="#97f295" version={version} propotionWidth={propotionWidth} />)
            }
            else if (listObjectData[neww.guid] && listObjectData[neww.guid].type === I.TypeComponents.Circle) {
                listHighlightObject.push(<OverViewBar data={listObjectData[neww.guid]} hightlightStyle="#97f295" version={version} propotionWidth={propotionWidth} />)
            }
        })
    }
}
export function findMinVertical(listObjectData: I.IObjectDict): number {
    let ys: number[] = [];
    for (let obj in listObjectData) {
        ys.push(listObjectData[obj].point.y);
    }
    let minVertical = Math.min(...ys);
    return minVertical;
}
export function findMinHorizontal(listObjectData: I.IObjectDict): number {
    let xs: number[] = [];
    for (let obj in listObjectData) {
        xs.push(listObjectData[obj].point.x);
    }
    let minHorizontal = Math.min(...xs);
    return minHorizontal;
}
export function findMaxVertical(listObjectData: I.IObjectDict): number {
    let ys: number[] = [];
    for (let obj in listObjectData) {
        ys.push(listObjectData[obj].point.y + listObjectData[obj].size.height);
    }
    let maxVertical = Math.max(...ys);
    return maxVertical;
}
export function findMaxHorizontal(listObjectData: I.IObjectDict): number {
    let xs: number[] = [];
    for (let obj in listObjectData) {
        xs.push(listObjectData[obj].point.x + listObjectData[obj].size.width);
    }
    let maxHorizontal = Math.max(...xs);
    return maxHorizontal;
}
