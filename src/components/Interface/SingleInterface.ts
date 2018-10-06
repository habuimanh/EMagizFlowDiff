export namespace single {
    export interface IGeneralObject {
        objectType: string,
        guid: string,
        componentType: string,
        label: string,
        x: number,
        y: number,
        flippedHorizontally: boolean,
        id?: string
    }
    export interface INested {
        objectType: string,
        guid: string
    }
    export interface ISIChannel extends INested {
        channel: string
    }
    export interface IChannel {
        objectType: string,
        guid: string,
        componentType: string,
        id: string,
        iSI_interceptors?: ISIChannel[]
    }
}
