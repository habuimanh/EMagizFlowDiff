import { input, single, diff } from "../Interface"
import { load, compare, noteIndexIDListObject } from "../LoadingFunction"
import { SearchingList } from "./SearchingList"

export interface FlowInfo {
    name: string,
    version: string,
}
export interface BigNumber {
    c: number[]
}
export class RevisionUtils {
    private _flowInfo: FlowInfo;
    private _components: (single.IChannel | single.IGeneralObject)[];
    constructor(private _input: input.IInput) {
        this._flowInfo = {
            name: this._input.name,
            version: this._input.version
        }
        this._components = this._input.components.map(component => load(component))
    }
    getInput = () => this._input
    getComponents = () => this._components
    getFlowInfo = () => this._flowInfo
    static compareComponentByGuid(component1: (single.IGeneralObject | single.IChannel), component2: (single.IGeneralObject | single.IChannel)): number {
        // return compareToBigInit(component1.guid, component2.guid);
        if (component1.guid > component2.guid) {
            return 1;
        }
        if (component1.guid === component2.guid) {
            return 0;
        }
        return -1;
    }
}

export class RevisionComparing {
    static compareTwoRevisions(rev1: input.IInput, rev2: input.IInput): diff.comparingResult {
        let revision1 = new RevisionUtils(rev1)
        let revision2 = new RevisionUtils(rev2)
        // if (revision1.getFlowInfo().version > revision2.getFlowInfo().version) {
        //     [revision1, revision2] = [revision2, revision1]
        // }
        let components1 = new SearchingList(revision1.getComponents(), RevisionUtils.compareComponentByGuid)
        let components2 = new SearchingList(revision2.getComponents(), RevisionUtils.compareComponentByGuid)
        let newComponents = components1.missingList(components2);
        let deletedComponents = components2.missingList(components1);
        newComponents = noteIndexIDListObject(newComponents);
        deletedComponents = noteIndexIDListObject(deletedComponents);
        let editedComponents: diff.IComponentDiff[] = [];
        for (let component1 of components1.getList()) {
            let component2 = components2.find(component1);
            if (component2) {
                let tmpComponent: diff.IComponentDiff = {
                    ...compare(component1, component2, { indexID: 0 }) as diff.IComponentDiff,
                    guid: component1.guid
                }
                editedComponents.push(tmpComponent)
            }
        }
        return {
            revision1: rev1,
            revision2: rev2,
            flowDiff: {
                newComponents: newComponents,
                deletedComponents: deletedComponents,
                editedComponents: editedComponents
            }
        }
    }
}

