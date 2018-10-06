import { diff } from "../Interface";
export function noteIndexIDListObject(listObject: Array<any>) {
    listObject.forEach(cpn => {
        cpn = noteIndexID(cpn, { indexID: 0 });
    })
    return listObject;
}
export function noteIndexID(object: Object, indexObj: Object) {
    object.indexID = indexObj['indexID'];
    for (let i1 in object) {
        if (object[i1] instanceof Object) {
            indexObj['indexID']++;
            noteIndexID(object[i1], indexObj);
        }
    }
    return object;
}
export function toIBasicDiff<T>(object1: T, object2: T, indexObj: Object): diff.IBasicDiff<T> {
    if (object1 instanceof Object && !object2) {
        for (let i in object1) {
            object1[i] = toIBasicDiff(object1[i], undefined, indexObj);
        }
    }
    if (!object1 && object2 instanceof Object) {
        for (let i in object2) {
            object2[i] = toIBasicDiff(undefined, object2[i], indexObj);
        }
    }
    indexObj['indexID']++;
    return {
        member1: object1,
        member2: object2,
        isDiff: object1 !== object2,
        isBasic: true,
        indexID: indexObj['indexID']
    }
}

export function compareTwoArrays(array1: any[], array2: any[], indexObj: Object) {
    if (!array1 && !array2) {
        return undefined
    }
    if (!array1 || !array2) {
        return toIBasicDiff(array1, array2, indexObj)
    }
    let output: diff.IDiff[] = []
    if (array1.length >= array2.length) {
        array1.forEach(({ }, index) => {
            output.push(compare(array1[index], array2[index], indexObj) as diff.IDiff)
        })
    } else {
        array2.forEach(({ }, index) => {
            output.push(compare(array1[index], array2[index], indexObj) as diff.IDiff)
        })
    }
    for (let i in output) {
        if (output[i].isDiff) output['isDiff'] = true;
    }
    return output
}

export function compare(object1: any | any[] | undefined | Object, object2: any | any[] | undefined | Object, indexObj: Object) {
    let output: diff.IDiff = { isDiff: false };
    if (object1 && object2) {
        if (object1 instanceof Array || object2 instanceof Array) {
            return compareTwoArrays(object1 as any[], object2 as any[], indexObj)
        } else if (object1 instanceof Object || object2 instanceof Object) {
            for (let i1 in object1) {
                output[i1] = compare(object1[i1], object2[i1], indexObj);
                if (output[i1]['isDiff']) {
                    output.isDiff = true
                }
            }
            for (let i2 in object2) {
                if (!object1[i2]) {
                    output[i2] = compare(object1[i2], object2[i2], indexObj);
                    if (output[i2]['isDiff']) {
                        output.isDiff = true
                    }
                }
            }
            return output
        }
    }
    return toIBasicDiff(object1, object2, indexObj)
}