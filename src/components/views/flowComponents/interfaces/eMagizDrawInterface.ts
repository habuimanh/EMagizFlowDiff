export enum TypeComponents {
    Circle,
    Rectangle,
    Filter,
    Active,
    Split,
    Route,
    Receive,
    Send
}
export interface IPoint {
    x: number,
    y: number
}
export interface ISize {
    width: number,
    height: number
}
export interface IBasicObject {
    objectType: string,
    id?: string,
    guid: string
}
export interface IObject extends IBasicObject {
    label?: string,
    componentType: string
    point: IPoint,
    size: ISize,
    type: TypeComponents,
    flippedHorizontally: boolean
}
export class IObjectDict {
    constructor() { }
    [id: string]: IObject;
}
export class IChannelDict {
    constructor() { }
    [id: string]: IObjectDict
}
//componentType
export interface ISupportObject extends IObject {
}
export interface IChannel extends IBasicObject {
    id: string,
    componentType: string,
}
export interface ITransformer extends IObject {
    inputChannel: string,
    outputChannel: string
}
export interface IInboundChannelAdapter extends IObject {
    outputChannel: string,
    errorChannel?: string
}
export interface IOutboundChannelAdapter extends IObject {
    inputChannel: string
}
//objectType extends ISupportObject
export interface IHornetQUserCredentialsConnectionFactoryAdapter extends ISupportObject {
}
export interface ICONTEXTPropertyPlaceholder extends ISupportObject {
}
export interface ISIMessageHistory extends ISupportObject {
}
export interface ICachingConnectionFactory extends ISupportObject {
}
export interface IZimbraAuthenticationSaajSoapInterceptor extends ISupportObject {
}
//objectType extends IChannel
export interface ISI_interceptor {
    guid: string,
    outputChannel: string
}
export interface ISIChannel extends IChannel {
    siInterceptors: ISI_interceptor[]
}
//objectType extends ITransformer
export interface IErrorToXmlTransformerInvoker extends ITransformer {
}
export interface ISITransformer extends ITransformer {
}
export interface ISIHeaderEnricher extends ITransformer {
}
//objectType extends IInboundChannelAdapter
export interface IJMSMessageDrivenChannelAdapter extends IInboundChannelAdapter {
}
//objectType extends IOutboundChannelAdapter
export interface IJMSOutboundChannelAdapter extends IOutboundChannelAdapter {
}
export interface IFILEOutboundChannelAdapter extends IOutboundChannelAdapter {
}
//new Object
export interface IFilterObject extends IObject {
    inputChannel: string,
    outputChannel: string,
    discardChannel?: string
}
export interface IAnnotation extends IObject {
    documentation: string
}
export interface ISplitObject extends IObject {
    inputChannel: string,
    outputChannel: string
}
export interface IRouteObject extends IObject {
    inputChannel: string,
    defaultOutputChannel: string,
    outputChannels: string[]
}
export interface IActiveObject extends IObject {
    inputChannel: string,
    outputChannel: string
}
export interface IReceiveObject extends IObject {
    inputChannel: string,
    outputChannel: string,
    errorChannel?: string
}
export interface ISendObject extends IObject {
    inputChannel: string,
    outputChannel: string
}