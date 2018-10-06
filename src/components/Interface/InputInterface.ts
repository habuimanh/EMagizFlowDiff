export namespace input {
    export interface IInput {
        name: string;
        version: string,
        components: IComponent[]
    }
    export interface Config {
        edited: string,
        deleted: string,
        added: string
    }
    export interface BigNumber {
        c: number[];
        s: number;
        e: number;
    }
    export interface IComponent {
        "$$metaData": {
            "objectType": string,
            "componentType": string,
            "guid": string | BigNumber,
        },
        "_id": string
    }
    export interface IBlockComponent extends IComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            "label": string,
            "x": number,
            "y": number,
            "flippedHorizontally": boolean;
        },
    }
    export interface IAnnotation extends IBlockComponent {
        "_documentation": string
    }
    export interface IInboundChannelAdpater extends IBlockComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            "label": string,
            "x": number,
            "y": number,
            "flippedHorizontally": boolean,
            usesPoller: boolean,
            outputChannel: string,
            errorChannel?: string
        }
    }
    export interface IOutboundChannelAdapter extends IBlockComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            "label": string,
            "x": number,
            "y": number,
            "flippedHorizontally": boolean,
            inputChannel: string,
        }
    }
    export interface ITransformer extends IBlockComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            "label": string,
            "x": number,
            "y": number,
            "flippedHorizontally": boolean,
            inputChannel: string,
            outputChannel: string
        }
    }
    export interface IFilterValidiate extends IBlockComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            "label": string,
            "x": number,
            "y": number,
            "flippedHorizontally": boolean,
            inputChannel: string,
            outputChannel: string
            discardChannel: string
        }
    }
    export interface INestedObject {
        "$$metaData": {
            "objectType": string,
            "guid": string
        }
    }
    export interface ISI_interceptor {
        guid: string,
        outputChannel: string
    }
    export interface IChannel extends IComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            interceptors: ISI_interceptor[]
        },
    }
    export interface IActive extends IBlockComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            "label": string,
            "x": number,
            "y": number,
            "flippedHorizontally": boolean,
            inputChannel: string,
            outputChannel: string
        }
    }
    export interface ISplit extends IBlockComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            "label": string,
            "x": number,
            "y": number,
            "flippedHorizontally": boolean,
            inputChannel: string,
            outputChannel: string
        }
    }
    export interface IRoute extends IBlockComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            "label": string,
            "x": number,
            "y": number,
            "flippedHorizontally": boolean,
            inputChannel: string,
            defaultOutputChannel: string,
            outputChannels: string[]
        }
    }export interface IReceive extends IBlockComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            "label": string,
            "x": number,
            "y": number,
            "flippedHorizontally": boolean,
            inputChannel: string,
            outputChannel: string,
            errorChannel?: string
        }
    }
    export interface ISend extends IBlockComponent {
        "$$metaData": {
            "objectType": string,
            "guid": string,
            "componentType": string,
            "label": string,
            "x": number,
            "y": number,
            "flippedHorizontally": boolean,
            inputChannel: string,
            outputChannel: string
        }
    }
}