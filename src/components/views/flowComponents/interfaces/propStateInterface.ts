import { input, diff } from "./../../../Interface";
export interface IWrapperProps {
    class?: string;
    mxObject?: mendix.lib.MxObject;
    style?: string;
    friendlyId?: string
}
export interface IConvertName {
    technicalName: string
    displayedName: string
}
export interface IEMagizFlowState {
    selectedId: string,
    showDiff: boolean,
    foldAll: boolean,
    hidePosition: boolean,
    showCommonInfo: boolean,
    showFlow: boolean
}
export interface IEMagizFlowProps extends IWrapperProps {
    version: string;
    version1: string;
    version2: string;
    colorAdded: string;
    colorDeleted: string;
    colorEdited: string;
    convertName: IConvertName[]
}
export interface IEMagizProperty {
    revision1: input.IInput | undefined
    revision2: input.IInput | undefined
    flowDiff: diff.IFlowDiff | undefined
    configColor: input.Config | undefined
    topBoundClient: number
    leftBoundClient: number
    convertNames: IConvertName[],
    loaded: boolean
}
export interface ILayoutProperty {
    mouseClientX: number;
    mouseClientY: number;
    prevScrollLeft1: number;
    prevScrollTop1: number;
    prevScrollLeft2: number;
    prevScrollTop2: number;
    isClicked: boolean;
}
export interface ILayoutProps {
    appState: IEMagizFlowState,
    onSelect: (id: string) => void,
    eMagizProperty: IEMagizProperty,
    setShowDiff: () => void, setUnShowDiff: () => void,
    setShowFlow: () => void, setCommonInfo: () => void,
    foldAll: () => void, hidePosition: () => void
}
export interface ILayoutState {
    scrollWidth1: number,
    scrollWidth2: number,
    offSetWidth: number
}
export interface IEMagizFlowContainerProps {
    paneAbove: boolean,
    config: input.Config,
    setShowDiff: () => void,
    isClicked: () => void,
    onScroll: (e: any) => void, revision: input.IInput, hidePosition: boolean,
    diff: diff.IFlowDiff | undefined, highlightedId: string, onSelectObject: (id: string) => void
}
export interface IEmagizFlowContainerProperty {
    top: number,
    left: number,
    width: number,
    height: number,
    willUpdate: boolean
}
export interface IDiffPopUpProps {
    revision1: input.IInput,
    revision2: input.IInput,
    convertName: IConvertName[],
    config: input.Config,
    showDiff: boolean,
    setUnShowDiff: () => void,
    showFlow: boolean, onChangeShowFlow: () => void,
    onShowCommonInfo: () => void, showCommonInfo: boolean,
    hidePosition: boolean, foldAll: boolean, onChangeFold: () => void, onHidePosition: () => void,
    flowDiff: diff.IFlowDiff | undefined, selectedId: string, onSelectObject: (id: string) => void
}
export interface IDetailObjectCompared {
    indexID?: number,
    show: boolean,
    nameAttribute: string,
    name1: string,
    name2: string
}
export interface IOverviewBarContainerProps {
    config: input.Config,
    offSetWidth: number,
    scrollWidth1: number,
    scrollWidth2: number,
    revision1: input.IInput,
    revision2: input.IInput,
    hidePosition: boolean,
    diff: diff.IFlowDiff | undefined,
    highlightedId: string
}
export interface IDisplayDiff {
    indexID?: number,
    name: string,
    diff: diff.IDiff | diff.IDiff[]
}
export interface IDiffPropertyProps {
    detailObjectCompared: IDetailObjectCompared,
    handleCLickGridRow: () => void,
    property: IDisplayDiff,
    config: input.Config,
    onlyShowChange: boolean
}
export interface IListSpan {
    listSpan1: any[],
    listSpan2: any[],
}