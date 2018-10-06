import { input, single } from "./"

export namespace diff {
    export interface IDiff {
        indexID?: number,
        isDiff: boolean
    }
    export interface IBasicDiff<T> extends IDiff {
        indexID: number,
        member1: T
        member2: T
        isBasic: boolean
    }
    export interface comparingResult {
        revision1: input.IInput,
        revision2: input.IInput,
        flowDiff: IFlowDiff
    }
    export interface IFlowDiff {
        deletedComponents: (single.IGeneralObject | single.IChannel)[],
        newComponents: (single.IGeneralObject | single.IChannel)[],
        editedComponents: IComponentDiff[]
    }
    export interface IComponentDiff extends IDiff {
        id?: string;
        guid: string;
        objectType: string;
        componentType: string;
    }
    export interface INestedObjectDiff extends IDiff {
        guid: string,
        objectType: string
    }
}
