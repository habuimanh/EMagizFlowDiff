import { single } from "../Interface"
import $ = require("./");
export function load(object): single.IChannel | single.IGeneralObject {
    if (object.$$metaData.componentType === "Channel") {
        return $.loadChannel(object);
    } else {
        let result: single.IGeneralObject = {
            componentType: object.$$metaData.componentType,
            flippedHorizontally: object.$$metaData.flippedHorizontally,
            guid: object.$$metaData.guid,
            label: object.$$metaData.label,
            objectType: object.$$metaData.objectType,
            x: object.$$metaData.x,
            y: object.$$metaData.y,
        }
        if (object._id) {
            result.id = object._id;
        }
        for (let i in object) {
            if (i != '$$metaData' && i != "_id") {
                result[i] = object[i];
            }
        } return result;
    }
}
