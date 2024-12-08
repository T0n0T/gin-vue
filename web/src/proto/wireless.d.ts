import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace api. */
export namespace api {

    /** Namespace wireless. */
    namespace wireless {

        /** Namespace v1. */
        namespace v1 {

            /** Represents a Wireless */
            class Wireless extends $protobuf.rpc.Service {

                /**
                 * Constructs a new Wireless service.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 */
                constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

                /**
                 * Creates new Wireless service using the specified rpc implementation.
                 * @param rpcImpl RPC implementation
                 * @param [requestDelimited=false] Whether requests are length-delimited
                 * @param [responseDelimited=false] Whether responses are length-delimited
                 * @returns RPC service. Useful where requests and/or responses are streamed.
                 */
                public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): Wireless;

                /**
                 * Calls AdapterCheck.
                 * @param request Empty message or plain object
                 * @param callback Node-style callback called with the error, if any, and AdapterCheckResponse
                 */
                public adapterCheck(request: google.protobuf.IEmpty, callback: api.wireless.v1.Wireless.AdapterCheckCallback): void;

                /**
                 * Calls AdapterCheck.
                 * @param request Empty message or plain object
                 * @returns Promise
                 */
                public adapterCheck(request: google.protobuf.IEmpty): Promise<api.wireless.v1.AdapterCheckResponse>;

                /**
                 * Calls AdapterScan.
                 * @param request AdapterScanRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and AdapterScanResponse
                 */
                public adapterScan(request: api.wireless.v1.IAdapterScanRequest, callback: api.wireless.v1.Wireless.AdapterScanCallback): void;

                /**
                 * Calls AdapterScan.
                 * @param request AdapterScanRequest message or plain object
                 * @returns Promise
                 */
                public adapterScan(request: api.wireless.v1.IAdapterScanRequest): Promise<api.wireless.v1.AdapterScanResponse>;

                /**
                 * Calls AdapterConfigure.
                 * @param request AdapterConfigureRequest message or plain object
                 * @param callback Node-style callback called with the error, if any, and Response
                 */
                public adapterConfigure(request: api.wireless.v1.IAdapterConfigureRequest, callback: api.wireless.v1.Wireless.AdapterConfigureCallback): void;

                /**
                 * Calls AdapterConfigure.
                 * @param request AdapterConfigureRequest message or plain object
                 * @returns Promise
                 */
                public adapterConfigure(request: api.wireless.v1.IAdapterConfigureRequest): Promise<api.wireless.v1.Response>;

                /**
                 * Calls DeviceCheck.
                 * @param request Empty message or plain object
                 * @param callback Node-style callback called with the error, if any, and DeviceCheckResponse
                 */
                public deviceCheck(request: google.protobuf.IEmpty, callback: api.wireless.v1.Wireless.DeviceCheckCallback): void;

                /**
                 * Calls DeviceCheck.
                 * @param request Empty message or plain object
                 * @returns Promise
                 */
                public deviceCheck(request: google.protobuf.IEmpty): Promise<api.wireless.v1.DeviceCheckResponse>;

                /**
                 * Calls DeviceCreate.
                 * @param request DeviceCreateContext message or plain object
                 * @param callback Node-style callback called with the error, if any, and Response
                 */
                public deviceCreate(request: api.wireless.v1.IDeviceCreateContext, callback: api.wireless.v1.Wireless.DeviceCreateCallback): void;

                /**
                 * Calls DeviceCreate.
                 * @param request DeviceCreateContext message or plain object
                 * @returns Promise
                 */
                public deviceCreate(request: api.wireless.v1.IDeviceCreateContext): Promise<api.wireless.v1.Response>;

                /**
                 * Calls DeviceDestroy.
                 * @param request DeviceID message or plain object
                 * @param callback Node-style callback called with the error, if any, and Response
                 */
                public deviceDestroy(request: api.wireless.v1.IDeviceID, callback: api.wireless.v1.Wireless.DeviceDestroyCallback): void;

                /**
                 * Calls DeviceDestroy.
                 * @param request DeviceID message or plain object
                 * @returns Promise
                 */
                public deviceDestroy(request: api.wireless.v1.IDeviceID): Promise<api.wireless.v1.Response>;

                /**
                 * Calls DeviceConnectCheck.
                 * @param request DeviceID message or plain object
                 * @param callback Node-style callback called with the error, if any, and ConnectCheckResponse
                 */
                public deviceConnectCheck(request: api.wireless.v1.IDeviceID, callback: api.wireless.v1.Wireless.DeviceConnectCheckCallback): void;

                /**
                 * Calls DeviceConnectCheck.
                 * @param request DeviceID message or plain object
                 * @returns Promise
                 */
                public deviceConnectCheck(request: api.wireless.v1.IDeviceID): Promise<api.wireless.v1.ConnectCheckResponse>;

                /**
                 * Calls DeviceConnectCreate.
                 * @param request ConnectCreateContext message or plain object
                 * @param callback Node-style callback called with the error, if any, and Response
                 */
                public deviceConnectCreate(request: api.wireless.v1.IConnectCreateContext, callback: api.wireless.v1.Wireless.DeviceConnectCreateCallback): void;

                /**
                 * Calls DeviceConnectCreate.
                 * @param request ConnectCreateContext message or plain object
                 * @returns Promise
                 */
                public deviceConnectCreate(request: api.wireless.v1.IConnectCreateContext): Promise<api.wireless.v1.Response>;

                /**
                 * Calls DeviceConnectDestroy.
                 * @param request ConnectDestroyContext message or plain object
                 * @param callback Node-style callback called with the error, if any, and Response
                 */
                public deviceConnectDestroy(request: api.wireless.v1.IConnectDestroyContext, callback: api.wireless.v1.Wireless.DeviceConnectDestroyCallback): void;

                /**
                 * Calls DeviceConnectDestroy.
                 * @param request ConnectDestroyContext message or plain object
                 * @returns Promise
                 */
                public deviceConnectDestroy(request: api.wireless.v1.IConnectDestroyContext): Promise<api.wireless.v1.Response>;

                /**
                 * Calls ChannelCreate.
                 * @param request ChannelCreateContext message or plain object
                 * @param callback Node-style callback called with the error, if any, and ChannelID
                 */
                public channelCreate(request: api.wireless.v1.IChannelCreateContext, callback: api.wireless.v1.Wireless.ChannelCreateCallback): void;

                /**
                 * Calls ChannelCreate.
                 * @param request ChannelCreateContext message or plain object
                 * @returns Promise
                 */
                public channelCreate(request: api.wireless.v1.IChannelCreateContext): Promise<api.wireless.v1.ChannelID>;

                /**
                 * Calls ChannelDestroy.
                 * @param request ChannelID message or plain object
                 * @param callback Node-style callback called with the error, if any, and Response
                 */
                public channelDestroy(request: api.wireless.v1.IChannelID, callback: api.wireless.v1.Wireless.ChannelDestroyCallback): void;

                /**
                 * Calls ChannelDestroy.
                 * @param request ChannelID message or plain object
                 * @returns Promise
                 */
                public channelDestroy(request: api.wireless.v1.IChannelID): Promise<api.wireless.v1.Response>;

                /**
                 * Calls ChannelBind.
                 * @param request ChannelBindContext message or plain object
                 * @param callback Node-style callback called with the error, if any, and Response
                 */
                public channelBind(request: api.wireless.v1.IChannelBindContext, callback: api.wireless.v1.Wireless.ChannelBindCallback): void;

                /**
                 * Calls ChannelBind.
                 * @param request ChannelBindContext message or plain object
                 * @returns Promise
                 */
                public channelBind(request: api.wireless.v1.IChannelBindContext): Promise<api.wireless.v1.Response>;

                /**
                 * Calls ChannelUnbind.
                 * @param request ChannelBindContext message or plain object
                 * @param callback Node-style callback called with the error, if any, and Response
                 */
                public channelUnbind(request: api.wireless.v1.IChannelBindContext, callback: api.wireless.v1.Wireless.ChannelUnbindCallback): void;

                /**
                 * Calls ChannelUnbind.
                 * @param request ChannelBindContext message or plain object
                 * @returns Promise
                 */
                public channelUnbind(request: api.wireless.v1.IChannelBindContext): Promise<api.wireless.v1.Response>;

                /**
                 * Calls ChannelEnable.
                 * @param request ChannelID message or plain object
                 * @param callback Node-style callback called with the error, if any, and Response
                 */
                public channelEnable(request: api.wireless.v1.IChannelID, callback: api.wireless.v1.Wireless.ChannelEnableCallback): void;

                /**
                 * Calls ChannelEnable.
                 * @param request ChannelID message or plain object
                 * @returns Promise
                 */
                public channelEnable(request: api.wireless.v1.IChannelID): Promise<api.wireless.v1.Response>;

                /**
                 * Calls ChannelDisable.
                 * @param request ChannelID message or plain object
                 * @param callback Node-style callback called with the error, if any, and Response
                 */
                public channelDisable(request: api.wireless.v1.IChannelID, callback: api.wireless.v1.Wireless.ChannelDisableCallback): void;

                /**
                 * Calls ChannelDisable.
                 * @param request ChannelID message or plain object
                 * @returns Promise
                 */
                public channelDisable(request: api.wireless.v1.IChannelID): Promise<api.wireless.v1.Response>;
            }

            namespace Wireless {

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#adapterCheck}.
                 * @param error Error, if any
                 * @param [response] AdapterCheckResponse
                 */
                type AdapterCheckCallback = (error: (Error|null), response?: api.wireless.v1.AdapterCheckResponse) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#adapterScan}.
                 * @param error Error, if any
                 * @param [response] AdapterScanResponse
                 */
                type AdapterScanCallback = (error: (Error|null), response?: api.wireless.v1.AdapterScanResponse) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#adapterConfigure}.
                 * @param error Error, if any
                 * @param [response] Response
                 */
                type AdapterConfigureCallback = (error: (Error|null), response?: api.wireless.v1.Response) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceCheck}.
                 * @param error Error, if any
                 * @param [response] DeviceCheckResponse
                 */
                type DeviceCheckCallback = (error: (Error|null), response?: api.wireless.v1.DeviceCheckResponse) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceCreate}.
                 * @param error Error, if any
                 * @param [response] Response
                 */
                type DeviceCreateCallback = (error: (Error|null), response?: api.wireless.v1.Response) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceDestroy}.
                 * @param error Error, if any
                 * @param [response] Response
                 */
                type DeviceDestroyCallback = (error: (Error|null), response?: api.wireless.v1.Response) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceConnectCheck}.
                 * @param error Error, if any
                 * @param [response] ConnectCheckResponse
                 */
                type DeviceConnectCheckCallback = (error: (Error|null), response?: api.wireless.v1.ConnectCheckResponse) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceConnectCreate}.
                 * @param error Error, if any
                 * @param [response] Response
                 */
                type DeviceConnectCreateCallback = (error: (Error|null), response?: api.wireless.v1.Response) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceConnectDestroy}.
                 * @param error Error, if any
                 * @param [response] Response
                 */
                type DeviceConnectDestroyCallback = (error: (Error|null), response?: api.wireless.v1.Response) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelCreate}.
                 * @param error Error, if any
                 * @param [response] ChannelID
                 */
                type ChannelCreateCallback = (error: (Error|null), response?: api.wireless.v1.ChannelID) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelDestroy}.
                 * @param error Error, if any
                 * @param [response] Response
                 */
                type ChannelDestroyCallback = (error: (Error|null), response?: api.wireless.v1.Response) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelBind}.
                 * @param error Error, if any
                 * @param [response] Response
                 */
                type ChannelBindCallback = (error: (Error|null), response?: api.wireless.v1.Response) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelUnbind}.
                 * @param error Error, if any
                 * @param [response] Response
                 */
                type ChannelUnbindCallback = (error: (Error|null), response?: api.wireless.v1.Response) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelEnable}.
                 * @param error Error, if any
                 * @param [response] Response
                 */
                type ChannelEnableCallback = (error: (Error|null), response?: api.wireless.v1.Response) => void;

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelDisable}.
                 * @param error Error, if any
                 * @param [response] Response
                 */
                type ChannelDisableCallback = (error: (Error|null), response?: api.wireless.v1.Response) => void;
            }

            /** Properties of a Response. */
            interface IResponse {

                /** Response msg */
                msg?: (string|null);
            }

            /** Represents a Response. */
            class Response implements IResponse {

                /**
                 * Constructs a new Response.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IResponse);

                /** Response msg. */
                public msg: string;

                /**
                 * Creates a new Response instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Response instance
                 */
                public static create(properties?: api.wireless.v1.IResponse): api.wireless.v1.Response;

                /**
                 * Encodes the specified Response message. Does not implicitly {@link api.wireless.v1.Response.verify|verify} messages.
                 * @param message Response message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Response message, length delimited. Does not implicitly {@link api.wireless.v1.Response.verify|verify} messages.
                 * @param message Response message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Response message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.Response;

                /**
                 * Decodes a Response message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.Response;

                /**
                 * Verifies a Response message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Response message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Response
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.Response;

                /**
                 * Creates a plain object from a Response message. Also converts values to other types if specified.
                 * @param message Response
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Response to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for Response
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an AdapterCheckResponse. */
            interface IAdapterCheckResponse {

                /** AdapterCheckResponse isAlive */
                isAlive?: (boolean|null);

                /** AdapterCheckResponse isScanActivate */
                isScanActivate?: (boolean|null);

                /** AdapterCheckResponse adapterName */
                adapterName?: (string|null);
            }

            /** Represents an AdapterCheckResponse. */
            class AdapterCheckResponse implements IAdapterCheckResponse {

                /**
                 * Constructs a new AdapterCheckResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IAdapterCheckResponse);

                /** AdapterCheckResponse isAlive. */
                public isAlive: boolean;

                /** AdapterCheckResponse isScanActivate. */
                public isScanActivate: boolean;

                /** AdapterCheckResponse adapterName. */
                public adapterName: string;

                /**
                 * Creates a new AdapterCheckResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AdapterCheckResponse instance
                 */
                public static create(properties?: api.wireless.v1.IAdapterCheckResponse): api.wireless.v1.AdapterCheckResponse;

                /**
                 * Encodes the specified AdapterCheckResponse message. Does not implicitly {@link api.wireless.v1.AdapterCheckResponse.verify|verify} messages.
                 * @param message AdapterCheckResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IAdapterCheckResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AdapterCheckResponse message, length delimited. Does not implicitly {@link api.wireless.v1.AdapterCheckResponse.verify|verify} messages.
                 * @param message AdapterCheckResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IAdapterCheckResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AdapterCheckResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AdapterCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.AdapterCheckResponse;

                /**
                 * Decodes an AdapterCheckResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AdapterCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.AdapterCheckResponse;

                /**
                 * Verifies an AdapterCheckResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AdapterCheckResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AdapterCheckResponse
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.AdapterCheckResponse;

                /**
                 * Creates a plain object from an AdapterCheckResponse message. Also converts values to other types if specified.
                 * @param message AdapterCheckResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.AdapterCheckResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AdapterCheckResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for AdapterCheckResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an AdapterScanRequest. */
            interface IAdapterScanRequest {

                /** AdapterScanRequest isScanActivate */
                isScanActivate?: (boolean|null);

                /** AdapterScanRequest duration */
                duration?: (number|null);
            }

            /** Represents an AdapterScanRequest. */
            class AdapterScanRequest implements IAdapterScanRequest {

                /**
                 * Constructs a new AdapterScanRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IAdapterScanRequest);

                /** AdapterScanRequest isScanActivate. */
                public isScanActivate: boolean;

                /** AdapterScanRequest duration. */
                public duration?: (number|null);

                /**
                 * Creates a new AdapterScanRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AdapterScanRequest instance
                 */
                public static create(properties?: api.wireless.v1.IAdapterScanRequest): api.wireless.v1.AdapterScanRequest;

                /**
                 * Encodes the specified AdapterScanRequest message. Does not implicitly {@link api.wireless.v1.AdapterScanRequest.verify|verify} messages.
                 * @param message AdapterScanRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IAdapterScanRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AdapterScanRequest message, length delimited. Does not implicitly {@link api.wireless.v1.AdapterScanRequest.verify|verify} messages.
                 * @param message AdapterScanRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IAdapterScanRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AdapterScanRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AdapterScanRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.AdapterScanRequest;

                /**
                 * Decodes an AdapterScanRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AdapterScanRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.AdapterScanRequest;

                /**
                 * Verifies an AdapterScanRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AdapterScanRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AdapterScanRequest
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.AdapterScanRequest;

                /**
                 * Creates a plain object from an AdapterScanRequest message. Also converts values to other types if specified.
                 * @param message AdapterScanRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.AdapterScanRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AdapterScanRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for AdapterScanRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an AdapterScanResponse. */
            interface IAdapterScanResponse {

                /** AdapterScanResponse ctx */
                ctx?: (Uint8Array|null);
            }

            /** Represents an AdapterScanResponse. */
            class AdapterScanResponse implements IAdapterScanResponse {

                /**
                 * Constructs a new AdapterScanResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IAdapterScanResponse);

                /** AdapterScanResponse ctx. */
                public ctx: Uint8Array;

                /**
                 * Creates a new AdapterScanResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AdapterScanResponse instance
                 */
                public static create(properties?: api.wireless.v1.IAdapterScanResponse): api.wireless.v1.AdapterScanResponse;

                /**
                 * Encodes the specified AdapterScanResponse message. Does not implicitly {@link api.wireless.v1.AdapterScanResponse.verify|verify} messages.
                 * @param message AdapterScanResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IAdapterScanResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AdapterScanResponse message, length delimited. Does not implicitly {@link api.wireless.v1.AdapterScanResponse.verify|verify} messages.
                 * @param message AdapterScanResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IAdapterScanResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AdapterScanResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AdapterScanResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.AdapterScanResponse;

                /**
                 * Decodes an AdapterScanResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AdapterScanResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.AdapterScanResponse;

                /**
                 * Verifies an AdapterScanResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AdapterScanResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AdapterScanResponse
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.AdapterScanResponse;

                /**
                 * Creates a plain object from an AdapterScanResponse message. Also converts values to other types if specified.
                 * @param message AdapterScanResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.AdapterScanResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AdapterScanResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for AdapterScanResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of an AdapterConfigureRequest. */
            interface IAdapterConfigureRequest {

                /** AdapterConfigureRequest ctx */
                ctx?: (Uint8Array|null);
            }

            /** Represents an AdapterConfigureRequest. */
            class AdapterConfigureRequest implements IAdapterConfigureRequest {

                /**
                 * Constructs a new AdapterConfigureRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IAdapterConfigureRequest);

                /** AdapterConfigureRequest ctx. */
                public ctx: Uint8Array;

                /**
                 * Creates a new AdapterConfigureRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns AdapterConfigureRequest instance
                 */
                public static create(properties?: api.wireless.v1.IAdapterConfigureRequest): api.wireless.v1.AdapterConfigureRequest;

                /**
                 * Encodes the specified AdapterConfigureRequest message. Does not implicitly {@link api.wireless.v1.AdapterConfigureRequest.verify|verify} messages.
                 * @param message AdapterConfigureRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IAdapterConfigureRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified AdapterConfigureRequest message, length delimited. Does not implicitly {@link api.wireless.v1.AdapterConfigureRequest.verify|verify} messages.
                 * @param message AdapterConfigureRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IAdapterConfigureRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an AdapterConfigureRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns AdapterConfigureRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.AdapterConfigureRequest;

                /**
                 * Decodes an AdapterConfigureRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns AdapterConfigureRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.AdapterConfigureRequest;

                /**
                 * Verifies an AdapterConfigureRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an AdapterConfigureRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns AdapterConfigureRequest
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.AdapterConfigureRequest;

                /**
                 * Creates a plain object from an AdapterConfigureRequest message. Also converts values to other types if specified.
                 * @param message AdapterConfigureRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.AdapterConfigureRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this AdapterConfigureRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for AdapterConfigureRequest
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeviceCreateContext. */
            interface IDeviceCreateContext {

                /** DeviceCreateContext deviceData */
                deviceData?: (Uint8Array|null);
            }

            /** Represents a DeviceCreateContext. */
            class DeviceCreateContext implements IDeviceCreateContext {

                /**
                 * Constructs a new DeviceCreateContext.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IDeviceCreateContext);

                /** DeviceCreateContext deviceData. */
                public deviceData: Uint8Array;

                /**
                 * Creates a new DeviceCreateContext instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeviceCreateContext instance
                 */
                public static create(properties?: api.wireless.v1.IDeviceCreateContext): api.wireless.v1.DeviceCreateContext;

                /**
                 * Encodes the specified DeviceCreateContext message. Does not implicitly {@link api.wireless.v1.DeviceCreateContext.verify|verify} messages.
                 * @param message DeviceCreateContext message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IDeviceCreateContext, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeviceCreateContext message, length delimited. Does not implicitly {@link api.wireless.v1.DeviceCreateContext.verify|verify} messages.
                 * @param message DeviceCreateContext message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IDeviceCreateContext, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeviceCreateContext message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeviceCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.DeviceCreateContext;

                /**
                 * Decodes a DeviceCreateContext message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeviceCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.DeviceCreateContext;

                /**
                 * Verifies a DeviceCreateContext message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeviceCreateContext message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeviceCreateContext
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.DeviceCreateContext;

                /**
                 * Creates a plain object from a DeviceCreateContext message. Also converts values to other types if specified.
                 * @param message DeviceCreateContext
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.DeviceCreateContext, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeviceCreateContext to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeviceCreateContext
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeviceID. */
            interface IDeviceID {

                /** DeviceID ID */
                ID?: (number|null);
            }

            /** Represents a DeviceID. */
            class DeviceID implements IDeviceID {

                /**
                 * Constructs a new DeviceID.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IDeviceID);

                /** DeviceID ID. */
                public ID: number;

                /**
                 * Creates a new DeviceID instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeviceID instance
                 */
                public static create(properties?: api.wireless.v1.IDeviceID): api.wireless.v1.DeviceID;

                /**
                 * Encodes the specified DeviceID message. Does not implicitly {@link api.wireless.v1.DeviceID.verify|verify} messages.
                 * @param message DeviceID message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IDeviceID, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeviceID message, length delimited. Does not implicitly {@link api.wireless.v1.DeviceID.verify|verify} messages.
                 * @param message DeviceID message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IDeviceID, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeviceID message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeviceID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.DeviceID;

                /**
                 * Decodes a DeviceID message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeviceID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.DeviceID;

                /**
                 * Verifies a DeviceID message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeviceID message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeviceID
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.DeviceID;

                /**
                 * Creates a plain object from a DeviceID message. Also converts values to other types if specified.
                 * @param message DeviceID
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.DeviceID, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeviceID to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeviceID
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a DeviceCheckResponse. */
            interface IDeviceCheckResponse {

                /** DeviceCheckResponse deviceStatusList */
                deviceStatusList?: ({ [k: string]: Uint8Array }|null);
            }

            /** Represents a DeviceCheckResponse. */
            class DeviceCheckResponse implements IDeviceCheckResponse {

                /**
                 * Constructs a new DeviceCheckResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IDeviceCheckResponse);

                /** DeviceCheckResponse deviceStatusList. */
                public deviceStatusList: { [k: string]: Uint8Array };

                /**
                 * Creates a new DeviceCheckResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DeviceCheckResponse instance
                 */
                public static create(properties?: api.wireless.v1.IDeviceCheckResponse): api.wireless.v1.DeviceCheckResponse;

                /**
                 * Encodes the specified DeviceCheckResponse message. Does not implicitly {@link api.wireless.v1.DeviceCheckResponse.verify|verify} messages.
                 * @param message DeviceCheckResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IDeviceCheckResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DeviceCheckResponse message, length delimited. Does not implicitly {@link api.wireless.v1.DeviceCheckResponse.verify|verify} messages.
                 * @param message DeviceCheckResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IDeviceCheckResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DeviceCheckResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DeviceCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.DeviceCheckResponse;

                /**
                 * Decodes a DeviceCheckResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DeviceCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.DeviceCheckResponse;

                /**
                 * Verifies a DeviceCheckResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DeviceCheckResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DeviceCheckResponse
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.DeviceCheckResponse;

                /**
                 * Creates a plain object from a DeviceCheckResponse message. Also converts values to other types if specified.
                 * @param message DeviceCheckResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.DeviceCheckResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DeviceCheckResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for DeviceCheckResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ConnectStatus. */
            interface IConnectStatus {

                /** ConnectStatus status */
                status?: (boolean|null);

                /** ConnectStatus connectSpec */
                connectSpec?: (Uint8Array|null);
            }

            /** Represents a ConnectStatus. */
            class ConnectStatus implements IConnectStatus {

                /**
                 * Constructs a new ConnectStatus.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IConnectStatus);

                /** ConnectStatus status. */
                public status: boolean;

                /** ConnectStatus connectSpec. */
                public connectSpec: Uint8Array;

                /**
                 * Creates a new ConnectStatus instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ConnectStatus instance
                 */
                public static create(properties?: api.wireless.v1.IConnectStatus): api.wireless.v1.ConnectStatus;

                /**
                 * Encodes the specified ConnectStatus message. Does not implicitly {@link api.wireless.v1.ConnectStatus.verify|verify} messages.
                 * @param message ConnectStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IConnectStatus, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ConnectStatus message, length delimited. Does not implicitly {@link api.wireless.v1.ConnectStatus.verify|verify} messages.
                 * @param message ConnectStatus message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IConnectStatus, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ConnectStatus message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ConnectStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.ConnectStatus;

                /**
                 * Decodes a ConnectStatus message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ConnectStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.ConnectStatus;

                /**
                 * Verifies a ConnectStatus message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ConnectStatus message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ConnectStatus
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.ConnectStatus;

                /**
                 * Creates a plain object from a ConnectStatus message. Also converts values to other types if specified.
                 * @param message ConnectStatus
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.ConnectStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ConnectStatus to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ConnectStatus
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ConnectCheckResponse. */
            interface IConnectCheckResponse {

                /** ConnectCheckResponse connectStatusList */
                connectStatusList?: ({ [k: string]: api.wireless.v1.IConnectStatus }|null);
            }

            /** Represents a ConnectCheckResponse. */
            class ConnectCheckResponse implements IConnectCheckResponse {

                /**
                 * Constructs a new ConnectCheckResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IConnectCheckResponse);

                /** ConnectCheckResponse connectStatusList. */
                public connectStatusList: { [k: string]: api.wireless.v1.IConnectStatus };

                /**
                 * Creates a new ConnectCheckResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ConnectCheckResponse instance
                 */
                public static create(properties?: api.wireless.v1.IConnectCheckResponse): api.wireless.v1.ConnectCheckResponse;

                /**
                 * Encodes the specified ConnectCheckResponse message. Does not implicitly {@link api.wireless.v1.ConnectCheckResponse.verify|verify} messages.
                 * @param message ConnectCheckResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IConnectCheckResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ConnectCheckResponse message, length delimited. Does not implicitly {@link api.wireless.v1.ConnectCheckResponse.verify|verify} messages.
                 * @param message ConnectCheckResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IConnectCheckResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ConnectCheckResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ConnectCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.ConnectCheckResponse;

                /**
                 * Decodes a ConnectCheckResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ConnectCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.ConnectCheckResponse;

                /**
                 * Verifies a ConnectCheckResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ConnectCheckResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ConnectCheckResponse
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.ConnectCheckResponse;

                /**
                 * Creates a plain object from a ConnectCheckResponse message. Also converts values to other types if specified.
                 * @param message ConnectCheckResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.ConnectCheckResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ConnectCheckResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ConnectCheckResponse
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ConnectCreateContext. */
            interface IConnectCreateContext {

                /** ConnectCreateContext devID */
                devID?: (number|null);

                /** ConnectCreateContext connectData */
                connectData?: (Uint8Array|null);
            }

            /** Represents a ConnectCreateContext. */
            class ConnectCreateContext implements IConnectCreateContext {

                /**
                 * Constructs a new ConnectCreateContext.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IConnectCreateContext);

                /** ConnectCreateContext devID. */
                public devID: number;

                /** ConnectCreateContext connectData. */
                public connectData: Uint8Array;

                /**
                 * Creates a new ConnectCreateContext instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ConnectCreateContext instance
                 */
                public static create(properties?: api.wireless.v1.IConnectCreateContext): api.wireless.v1.ConnectCreateContext;

                /**
                 * Encodes the specified ConnectCreateContext message. Does not implicitly {@link api.wireless.v1.ConnectCreateContext.verify|verify} messages.
                 * @param message ConnectCreateContext message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IConnectCreateContext, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ConnectCreateContext message, length delimited. Does not implicitly {@link api.wireless.v1.ConnectCreateContext.verify|verify} messages.
                 * @param message ConnectCreateContext message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IConnectCreateContext, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ConnectCreateContext message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ConnectCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.ConnectCreateContext;

                /**
                 * Decodes a ConnectCreateContext message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ConnectCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.ConnectCreateContext;

                /**
                 * Verifies a ConnectCreateContext message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ConnectCreateContext message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ConnectCreateContext
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.ConnectCreateContext;

                /**
                 * Creates a plain object from a ConnectCreateContext message. Also converts values to other types if specified.
                 * @param message ConnectCreateContext
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.ConnectCreateContext, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ConnectCreateContext to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ConnectCreateContext
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ConnectDestroyContext. */
            interface IConnectDestroyContext {

                /** ConnectDestroyContext devID */
                devID?: (number|null);

                /** ConnectDestroyContext connID */
                connID?: (number|null);
            }

            /** Represents a ConnectDestroyContext. */
            class ConnectDestroyContext implements IConnectDestroyContext {

                /**
                 * Constructs a new ConnectDestroyContext.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IConnectDestroyContext);

                /** ConnectDestroyContext devID. */
                public devID: number;

                /** ConnectDestroyContext connID. */
                public connID: number;

                /**
                 * Creates a new ConnectDestroyContext instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ConnectDestroyContext instance
                 */
                public static create(properties?: api.wireless.v1.IConnectDestroyContext): api.wireless.v1.ConnectDestroyContext;

                /**
                 * Encodes the specified ConnectDestroyContext message. Does not implicitly {@link api.wireless.v1.ConnectDestroyContext.verify|verify} messages.
                 * @param message ConnectDestroyContext message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IConnectDestroyContext, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ConnectDestroyContext message, length delimited. Does not implicitly {@link api.wireless.v1.ConnectDestroyContext.verify|verify} messages.
                 * @param message ConnectDestroyContext message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IConnectDestroyContext, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ConnectDestroyContext message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ConnectDestroyContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.ConnectDestroyContext;

                /**
                 * Decodes a ConnectDestroyContext message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ConnectDestroyContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.ConnectDestroyContext;

                /**
                 * Verifies a ConnectDestroyContext message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ConnectDestroyContext message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ConnectDestroyContext
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.ConnectDestroyContext;

                /**
                 * Creates a plain object from a ConnectDestroyContext message. Also converts values to other types if specified.
                 * @param message ConnectDestroyContext
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.ConnectDestroyContext, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ConnectDestroyContext to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ConnectDestroyContext
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ConnectID. */
            interface IConnectID {

                /** ConnectID ID */
                ID?: (number|null);
            }

            /** Represents a ConnectID. */
            class ConnectID implements IConnectID {

                /**
                 * Constructs a new ConnectID.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IConnectID);

                /** ConnectID ID. */
                public ID: number;

                /**
                 * Creates a new ConnectID instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ConnectID instance
                 */
                public static create(properties?: api.wireless.v1.IConnectID): api.wireless.v1.ConnectID;

                /**
                 * Encodes the specified ConnectID message. Does not implicitly {@link api.wireless.v1.ConnectID.verify|verify} messages.
                 * @param message ConnectID message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IConnectID, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ConnectID message, length delimited. Does not implicitly {@link api.wireless.v1.ConnectID.verify|verify} messages.
                 * @param message ConnectID message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IConnectID, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ConnectID message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ConnectID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.ConnectID;

                /**
                 * Decodes a ConnectID message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ConnectID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.ConnectID;

                /**
                 * Verifies a ConnectID message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ConnectID message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ConnectID
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.ConnectID;

                /**
                 * Creates a plain object from a ConnectID message. Also converts values to other types if specified.
                 * @param message ConnectID
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.ConnectID, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ConnectID to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ConnectID
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** ChannelType enum. */
            enum ChannelType {
                Channel_TYPE_UP = 0,
                Channel_TYPE_DOWN = 1
            }

            /** Properties of a ChannelCreateContext. */
            interface IChannelCreateContext {

                /** ChannelCreateContext topic */
                topic?: (string|null);

                /** ChannelCreateContext type */
                type?: (api.wireless.v1.ChannelType|null);
            }

            /** Represents a ChannelCreateContext. */
            class ChannelCreateContext implements IChannelCreateContext {

                /**
                 * Constructs a new ChannelCreateContext.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IChannelCreateContext);

                /** ChannelCreateContext topic. */
                public topic: string;

                /** ChannelCreateContext type. */
                public type: api.wireless.v1.ChannelType;

                /**
                 * Creates a new ChannelCreateContext instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ChannelCreateContext instance
                 */
                public static create(properties?: api.wireless.v1.IChannelCreateContext): api.wireless.v1.ChannelCreateContext;

                /**
                 * Encodes the specified ChannelCreateContext message. Does not implicitly {@link api.wireless.v1.ChannelCreateContext.verify|verify} messages.
                 * @param message ChannelCreateContext message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IChannelCreateContext, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ChannelCreateContext message, length delimited. Does not implicitly {@link api.wireless.v1.ChannelCreateContext.verify|verify} messages.
                 * @param message ChannelCreateContext message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IChannelCreateContext, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ChannelCreateContext message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ChannelCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.ChannelCreateContext;

                /**
                 * Decodes a ChannelCreateContext message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ChannelCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.ChannelCreateContext;

                /**
                 * Verifies a ChannelCreateContext message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ChannelCreateContext message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ChannelCreateContext
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.ChannelCreateContext;

                /**
                 * Creates a plain object from a ChannelCreateContext message. Also converts values to other types if specified.
                 * @param message ChannelCreateContext
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.ChannelCreateContext, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ChannelCreateContext to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ChannelCreateContext
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ChannelBindContext. */
            interface IChannelBindContext {

                /** ChannelBindContext chanId */
                chanId?: (number|null);

                /** ChannelBindContext devID */
                devID?: (number|null);

                /** ChannelBindContext connID */
                connID?: (number|null);
            }

            /** Represents a ChannelBindContext. */
            class ChannelBindContext implements IChannelBindContext {

                /**
                 * Constructs a new ChannelBindContext.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IChannelBindContext);

                /** ChannelBindContext chanId. */
                public chanId: number;

                /** ChannelBindContext devID. */
                public devID: number;

                /** ChannelBindContext connID. */
                public connID: number;

                /**
                 * Creates a new ChannelBindContext instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ChannelBindContext instance
                 */
                public static create(properties?: api.wireless.v1.IChannelBindContext): api.wireless.v1.ChannelBindContext;

                /**
                 * Encodes the specified ChannelBindContext message. Does not implicitly {@link api.wireless.v1.ChannelBindContext.verify|verify} messages.
                 * @param message ChannelBindContext message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IChannelBindContext, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ChannelBindContext message, length delimited. Does not implicitly {@link api.wireless.v1.ChannelBindContext.verify|verify} messages.
                 * @param message ChannelBindContext message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IChannelBindContext, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ChannelBindContext message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ChannelBindContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.ChannelBindContext;

                /**
                 * Decodes a ChannelBindContext message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ChannelBindContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.ChannelBindContext;

                /**
                 * Verifies a ChannelBindContext message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ChannelBindContext message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ChannelBindContext
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.ChannelBindContext;

                /**
                 * Creates a plain object from a ChannelBindContext message. Also converts values to other types if specified.
                 * @param message ChannelBindContext
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.ChannelBindContext, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ChannelBindContext to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ChannelBindContext
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }

            /** Properties of a ChannelID. */
            interface IChannelID {

                /** ChannelID ID */
                ID?: (number|null);
            }

            /** Represents a ChannelID. */
            class ChannelID implements IChannelID {

                /**
                 * Constructs a new ChannelID.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: api.wireless.v1.IChannelID);

                /** ChannelID ID. */
                public ID: number;

                /**
                 * Creates a new ChannelID instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ChannelID instance
                 */
                public static create(properties?: api.wireless.v1.IChannelID): api.wireless.v1.ChannelID;

                /**
                 * Encodes the specified ChannelID message. Does not implicitly {@link api.wireless.v1.ChannelID.verify|verify} messages.
                 * @param message ChannelID message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: api.wireless.v1.IChannelID, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ChannelID message, length delimited. Does not implicitly {@link api.wireless.v1.ChannelID.verify|verify} messages.
                 * @param message ChannelID message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: api.wireless.v1.IChannelID, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ChannelID message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ChannelID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): api.wireless.v1.ChannelID;

                /**
                 * Decodes a ChannelID message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ChannelID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): api.wireless.v1.ChannelID;

                /**
                 * Verifies a ChannelID message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ChannelID message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ChannelID
                 */
                public static fromObject(object: { [k: string]: any }): api.wireless.v1.ChannelID;

                /**
                 * Creates a plain object from a ChannelID message. Also converts values to other types if specified.
                 * @param message ChannelID
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: api.wireless.v1.ChannelID, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ChannelID to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };

                /**
                 * Gets the default type url for ChannelID
                 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns The default type url
                 */
                public static getTypeUrl(typeUrlPrefix?: string): string;
            }
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Empty. */
        interface IEmpty {
        }

        /** Represents an Empty. */
        class Empty implements IEmpty {

            /**
             * Constructs a new Empty.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IEmpty);

            /**
             * Creates a new Empty instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Empty instance
             */
            public static create(properties?: google.protobuf.IEmpty): google.protobuf.Empty;

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @param message Empty message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IEmpty, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Empty;

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Empty;

            /**
             * Verifies an Empty message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Empty
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Empty;

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @param message Empty
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Empty, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Empty to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Empty
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
