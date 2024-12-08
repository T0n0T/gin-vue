/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.api = (function() {

    /**
     * Namespace api.
     * @exports api
     * @namespace
     */
    var api = {};

    api.wireless = (function() {

        /**
         * Namespace wireless.
         * @memberof api
         * @namespace
         */
        var wireless = {};

        wireless.v1 = (function() {

            /**
             * Namespace v1.
             * @memberof api.wireless
             * @namespace
             */
            var v1 = {};

            v1.Wireless = (function() {

                /**
                 * Constructs a new Wireless service.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a Wireless
                 * @extends $protobuf.rpc.Service
                 * @constructor
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 */
                function Wireless(rpcImpl, requestDelimited, responseDelimited) {
                    $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
                }

                (Wireless.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = Wireless;

                /**
                 * Creates new Wireless service using the specified rpc implementation.
                 * @function create
                 * @memberof api.wireless.v1.Wireless
                 * @static
                 * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
                 * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
                 * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
                 * @returns {Wireless} RPC service. Useful where requests and/or responses are streamed.
                 */
                Wireless.create = function create(rpcImpl, requestDelimited, responseDelimited) {
                    return new this(rpcImpl, requestDelimited, responseDelimited);
                };

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#adapterCheck}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef AdapterCheckCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.AdapterCheckResponse} [response] AdapterCheckResponse
                 */

                /**
                 * Calls AdapterCheck.
                 * @function adapterCheck
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {google.protobuf.IEmpty} request Empty message or plain object
                 * @param {api.wireless.v1.Wireless.AdapterCheckCallback} callback Node-style callback called with the error, if any, and AdapterCheckResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.adapterCheck = function adapterCheck(request, callback) {
                    return this.rpcCall(adapterCheck, $root.google.protobuf.Empty, $root.api.wireless.v1.AdapterCheckResponse, request, callback);
                }, "name", { value: "AdapterCheck" });

                /**
                 * Calls AdapterCheck.
                 * @function adapterCheck
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {google.protobuf.IEmpty} request Empty message or plain object
                 * @returns {Promise<api.wireless.v1.AdapterCheckResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#adapterScan}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef AdapterScanCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.AdapterScanResponse} [response] AdapterScanResponse
                 */

                /**
                 * Calls AdapterScan.
                 * @function adapterScan
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IAdapterScanRequest} request AdapterScanRequest message or plain object
                 * @param {api.wireless.v1.Wireless.AdapterScanCallback} callback Node-style callback called with the error, if any, and AdapterScanResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.adapterScan = function adapterScan(request, callback) {
                    return this.rpcCall(adapterScan, $root.api.wireless.v1.AdapterScanRequest, $root.api.wireless.v1.AdapterScanResponse, request, callback);
                }, "name", { value: "AdapterScan" });

                /**
                 * Calls AdapterScan.
                 * @function adapterScan
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IAdapterScanRequest} request AdapterScanRequest message or plain object
                 * @returns {Promise<api.wireless.v1.AdapterScanResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#adapterConfigure}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef AdapterConfigureCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.Response} [response] Response
                 */

                /**
                 * Calls AdapterConfigure.
                 * @function adapterConfigure
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IAdapterConfigureRequest} request AdapterConfigureRequest message or plain object
                 * @param {api.wireless.v1.Wireless.AdapterConfigureCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.adapterConfigure = function adapterConfigure(request, callback) {
                    return this.rpcCall(adapterConfigure, $root.api.wireless.v1.AdapterConfigureRequest, $root.api.wireless.v1.Response, request, callback);
                }, "name", { value: "AdapterConfigure" });

                /**
                 * Calls AdapterConfigure.
                 * @function adapterConfigure
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IAdapterConfigureRequest} request AdapterConfigureRequest message or plain object
                 * @returns {Promise<api.wireless.v1.Response>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceCheck}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef DeviceCheckCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.DeviceCheckResponse} [response] DeviceCheckResponse
                 */

                /**
                 * Calls DeviceCheck.
                 * @function deviceCheck
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {google.protobuf.IEmpty} request Empty message or plain object
                 * @param {api.wireless.v1.Wireless.DeviceCheckCallback} callback Node-style callback called with the error, if any, and DeviceCheckResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.deviceCheck = function deviceCheck(request, callback) {
                    return this.rpcCall(deviceCheck, $root.google.protobuf.Empty, $root.api.wireless.v1.DeviceCheckResponse, request, callback);
                }, "name", { value: "DeviceCheck" });

                /**
                 * Calls DeviceCheck.
                 * @function deviceCheck
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {google.protobuf.IEmpty} request Empty message or plain object
                 * @returns {Promise<api.wireless.v1.DeviceCheckResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceCreate}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef DeviceCreateCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.Response} [response] Response
                 */

                /**
                 * Calls DeviceCreate.
                 * @function deviceCreate
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IDeviceCreateContext} request DeviceCreateContext message or plain object
                 * @param {api.wireless.v1.Wireless.DeviceCreateCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.deviceCreate = function deviceCreate(request, callback) {
                    return this.rpcCall(deviceCreate, $root.api.wireless.v1.DeviceCreateContext, $root.api.wireless.v1.Response, request, callback);
                }, "name", { value: "DeviceCreate" });

                /**
                 * Calls DeviceCreate.
                 * @function deviceCreate
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IDeviceCreateContext} request DeviceCreateContext message or plain object
                 * @returns {Promise<api.wireless.v1.Response>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceDestroy}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef DeviceDestroyCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.Response} [response] Response
                 */

                /**
                 * Calls DeviceDestroy.
                 * @function deviceDestroy
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IDeviceID} request DeviceID message or plain object
                 * @param {api.wireless.v1.Wireless.DeviceDestroyCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.deviceDestroy = function deviceDestroy(request, callback) {
                    return this.rpcCall(deviceDestroy, $root.api.wireless.v1.DeviceID, $root.api.wireless.v1.Response, request, callback);
                }, "name", { value: "DeviceDestroy" });

                /**
                 * Calls DeviceDestroy.
                 * @function deviceDestroy
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IDeviceID} request DeviceID message or plain object
                 * @returns {Promise<api.wireless.v1.Response>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceConnectCheck}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef DeviceConnectCheckCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.ConnectCheckResponse} [response] ConnectCheckResponse
                 */

                /**
                 * Calls DeviceConnectCheck.
                 * @function deviceConnectCheck
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IDeviceID} request DeviceID message or plain object
                 * @param {api.wireless.v1.Wireless.DeviceConnectCheckCallback} callback Node-style callback called with the error, if any, and ConnectCheckResponse
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.deviceConnectCheck = function deviceConnectCheck(request, callback) {
                    return this.rpcCall(deviceConnectCheck, $root.api.wireless.v1.DeviceID, $root.api.wireless.v1.ConnectCheckResponse, request, callback);
                }, "name", { value: "DeviceConnectCheck" });

                /**
                 * Calls DeviceConnectCheck.
                 * @function deviceConnectCheck
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IDeviceID} request DeviceID message or plain object
                 * @returns {Promise<api.wireless.v1.ConnectCheckResponse>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceConnectCreate}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef DeviceConnectCreateCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.Response} [response] Response
                 */

                /**
                 * Calls DeviceConnectCreate.
                 * @function deviceConnectCreate
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IConnectCreateContext} request ConnectCreateContext message or plain object
                 * @param {api.wireless.v1.Wireless.DeviceConnectCreateCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.deviceConnectCreate = function deviceConnectCreate(request, callback) {
                    return this.rpcCall(deviceConnectCreate, $root.api.wireless.v1.ConnectCreateContext, $root.api.wireless.v1.Response, request, callback);
                }, "name", { value: "DeviceConnectCreate" });

                /**
                 * Calls DeviceConnectCreate.
                 * @function deviceConnectCreate
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IConnectCreateContext} request ConnectCreateContext message or plain object
                 * @returns {Promise<api.wireless.v1.Response>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#deviceConnectDestroy}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef DeviceConnectDestroyCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.Response} [response] Response
                 */

                /**
                 * Calls DeviceConnectDestroy.
                 * @function deviceConnectDestroy
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IConnectDestroyContext} request ConnectDestroyContext message or plain object
                 * @param {api.wireless.v1.Wireless.DeviceConnectDestroyCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.deviceConnectDestroy = function deviceConnectDestroy(request, callback) {
                    return this.rpcCall(deviceConnectDestroy, $root.api.wireless.v1.ConnectDestroyContext, $root.api.wireless.v1.Response, request, callback);
                }, "name", { value: "DeviceConnectDestroy" });

                /**
                 * Calls DeviceConnectDestroy.
                 * @function deviceConnectDestroy
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IConnectDestroyContext} request ConnectDestroyContext message or plain object
                 * @returns {Promise<api.wireless.v1.Response>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelCreate}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef ChannelCreateCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.ChannelID} [response] ChannelID
                 */

                /**
                 * Calls ChannelCreate.
                 * @function channelCreate
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelCreateContext} request ChannelCreateContext message or plain object
                 * @param {api.wireless.v1.Wireless.ChannelCreateCallback} callback Node-style callback called with the error, if any, and ChannelID
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.channelCreate = function channelCreate(request, callback) {
                    return this.rpcCall(channelCreate, $root.api.wireless.v1.ChannelCreateContext, $root.api.wireless.v1.ChannelID, request, callback);
                }, "name", { value: "ChannelCreate" });

                /**
                 * Calls ChannelCreate.
                 * @function channelCreate
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelCreateContext} request ChannelCreateContext message or plain object
                 * @returns {Promise<api.wireless.v1.ChannelID>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelDestroy}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef ChannelDestroyCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.Response} [response] Response
                 */

                /**
                 * Calls ChannelDestroy.
                 * @function channelDestroy
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelID} request ChannelID message or plain object
                 * @param {api.wireless.v1.Wireless.ChannelDestroyCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.channelDestroy = function channelDestroy(request, callback) {
                    return this.rpcCall(channelDestroy, $root.api.wireless.v1.ChannelID, $root.api.wireless.v1.Response, request, callback);
                }, "name", { value: "ChannelDestroy" });

                /**
                 * Calls ChannelDestroy.
                 * @function channelDestroy
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelID} request ChannelID message or plain object
                 * @returns {Promise<api.wireless.v1.Response>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelBind}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef ChannelBindCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.Response} [response] Response
                 */

                /**
                 * Calls ChannelBind.
                 * @function channelBind
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelBindContext} request ChannelBindContext message or plain object
                 * @param {api.wireless.v1.Wireless.ChannelBindCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.channelBind = function channelBind(request, callback) {
                    return this.rpcCall(channelBind, $root.api.wireless.v1.ChannelBindContext, $root.api.wireless.v1.Response, request, callback);
                }, "name", { value: "ChannelBind" });

                /**
                 * Calls ChannelBind.
                 * @function channelBind
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelBindContext} request ChannelBindContext message or plain object
                 * @returns {Promise<api.wireless.v1.Response>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelUnbind}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef ChannelUnbindCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.Response} [response] Response
                 */

                /**
                 * Calls ChannelUnbind.
                 * @function channelUnbind
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelBindContext} request ChannelBindContext message or plain object
                 * @param {api.wireless.v1.Wireless.ChannelUnbindCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.channelUnbind = function channelUnbind(request, callback) {
                    return this.rpcCall(channelUnbind, $root.api.wireless.v1.ChannelBindContext, $root.api.wireless.v1.Response, request, callback);
                }, "name", { value: "ChannelUnbind" });

                /**
                 * Calls ChannelUnbind.
                 * @function channelUnbind
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelBindContext} request ChannelBindContext message or plain object
                 * @returns {Promise<api.wireless.v1.Response>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelEnable}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef ChannelEnableCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.Response} [response] Response
                 */

                /**
                 * Calls ChannelEnable.
                 * @function channelEnable
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelID} request ChannelID message or plain object
                 * @param {api.wireless.v1.Wireless.ChannelEnableCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.channelEnable = function channelEnable(request, callback) {
                    return this.rpcCall(channelEnable, $root.api.wireless.v1.ChannelID, $root.api.wireless.v1.Response, request, callback);
                }, "name", { value: "ChannelEnable" });

                /**
                 * Calls ChannelEnable.
                 * @function channelEnable
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelID} request ChannelID message or plain object
                 * @returns {Promise<api.wireless.v1.Response>} Promise
                 * @variation 2
                 */

                /**
                 * Callback as used by {@link api.wireless.v1.Wireless#channelDisable}.
                 * @memberof api.wireless.v1.Wireless
                 * @typedef ChannelDisableCallback
                 * @type {function}
                 * @param {Error|null} error Error, if any
                 * @param {api.wireless.v1.Response} [response] Response
                 */

                /**
                 * Calls ChannelDisable.
                 * @function channelDisable
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelID} request ChannelID message or plain object
                 * @param {api.wireless.v1.Wireless.ChannelDisableCallback} callback Node-style callback called with the error, if any, and Response
                 * @returns {undefined}
                 * @variation 1
                 */
                Object.defineProperty(Wireless.prototype.channelDisable = function channelDisable(request, callback) {
                    return this.rpcCall(channelDisable, $root.api.wireless.v1.ChannelID, $root.api.wireless.v1.Response, request, callback);
                }, "name", { value: "ChannelDisable" });

                /**
                 * Calls ChannelDisable.
                 * @function channelDisable
                 * @memberof api.wireless.v1.Wireless
                 * @instance
                 * @param {api.wireless.v1.IChannelID} request ChannelID message or plain object
                 * @returns {Promise<api.wireless.v1.Response>} Promise
                 * @variation 2
                 */

                return Wireless;
            })();

            v1.Response = (function() {

                /**
                 * Properties of a Response.
                 * @memberof api.wireless.v1
                 * @interface IResponse
                 * @property {string|null} [msg] Response msg
                 */

                /**
                 * Constructs a new Response.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a Response.
                 * @implements IResponse
                 * @constructor
                 * @param {api.wireless.v1.IResponse=} [properties] Properties to set
                 */
                function Response(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * Response msg.
                 * @member {string} msg
                 * @memberof api.wireless.v1.Response
                 * @instance
                 */
                Response.prototype.msg = "";

                /**
                 * Creates a new Response instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.Response
                 * @static
                 * @param {api.wireless.v1.IResponse=} [properties] Properties to set
                 * @returns {api.wireless.v1.Response} Response instance
                 */
                Response.create = function create(properties) {
                    return new Response(properties);
                };

                /**
                 * Encodes the specified Response message. Does not implicitly {@link api.wireless.v1.Response.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.Response
                 * @static
                 * @param {api.wireless.v1.IResponse} message Response message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Response.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.msg != null && Object.hasOwnProperty.call(message, "msg"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.msg);
                    return writer;
                };

                /**
                 * Encodes the specified Response message, length delimited. Does not implicitly {@link api.wireless.v1.Response.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.Response
                 * @static
                 * @param {api.wireless.v1.IResponse} message Response message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                Response.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a Response message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.Response
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.Response} Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Response.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.Response();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.msg = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a Response message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.Response
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.Response} Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                Response.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a Response message.
                 * @function verify
                 * @memberof api.wireless.v1.Response
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                Response.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        if (!$util.isString(message.msg))
                            return "msg: string expected";
                    return null;
                };

                /**
                 * Creates a Response message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.Response
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.Response} Response
                 */
                Response.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.Response)
                        return object;
                    var message = new $root.api.wireless.v1.Response();
                    if (object.msg != null)
                        message.msg = String(object.msg);
                    return message;
                };

                /**
                 * Creates a plain object from a Response message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.Response
                 * @static
                 * @param {api.wireless.v1.Response} message Response
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                Response.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.msg = "";
                    if (message.msg != null && message.hasOwnProperty("msg"))
                        object.msg = message.msg;
                    return object;
                };

                /**
                 * Converts this Response to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.Response
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                Response.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for Response
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.Response
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.Response";
                };

                return Response;
            })();

            v1.AdapterCheckResponse = (function() {

                /**
                 * Properties of an AdapterCheckResponse.
                 * @memberof api.wireless.v1
                 * @interface IAdapterCheckResponse
                 * @property {boolean|null} [isAlive] AdapterCheckResponse isAlive
                 * @property {boolean|null} [isScanActivate] AdapterCheckResponse isScanActivate
                 * @property {string|null} [adapterName] AdapterCheckResponse adapterName
                 */

                /**
                 * Constructs a new AdapterCheckResponse.
                 * @memberof api.wireless.v1
                 * @classdesc Represents an AdapterCheckResponse.
                 * @implements IAdapterCheckResponse
                 * @constructor
                 * @param {api.wireless.v1.IAdapterCheckResponse=} [properties] Properties to set
                 */
                function AdapterCheckResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AdapterCheckResponse isAlive.
                 * @member {boolean} isAlive
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @instance
                 */
                AdapterCheckResponse.prototype.isAlive = false;

                /**
                 * AdapterCheckResponse isScanActivate.
                 * @member {boolean} isScanActivate
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @instance
                 */
                AdapterCheckResponse.prototype.isScanActivate = false;

                /**
                 * AdapterCheckResponse adapterName.
                 * @member {string} adapterName
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @instance
                 */
                AdapterCheckResponse.prototype.adapterName = "";

                /**
                 * Creates a new AdapterCheckResponse instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @static
                 * @param {api.wireless.v1.IAdapterCheckResponse=} [properties] Properties to set
                 * @returns {api.wireless.v1.AdapterCheckResponse} AdapterCheckResponse instance
                 */
                AdapterCheckResponse.create = function create(properties) {
                    return new AdapterCheckResponse(properties);
                };

                /**
                 * Encodes the specified AdapterCheckResponse message. Does not implicitly {@link api.wireless.v1.AdapterCheckResponse.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @static
                 * @param {api.wireless.v1.IAdapterCheckResponse} message AdapterCheckResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AdapterCheckResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.isAlive != null && Object.hasOwnProperty.call(message, "isAlive"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isAlive);
                    if (message.isScanActivate != null && Object.hasOwnProperty.call(message, "isScanActivate"))
                        writer.uint32(/* id 2, wireType 0 =*/16).bool(message.isScanActivate);
                    if (message.adapterName != null && Object.hasOwnProperty.call(message, "adapterName"))
                        writer.uint32(/* id 3, wireType 2 =*/26).string(message.adapterName);
                    return writer;
                };

                /**
                 * Encodes the specified AdapterCheckResponse message, length delimited. Does not implicitly {@link api.wireless.v1.AdapterCheckResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @static
                 * @param {api.wireless.v1.IAdapterCheckResponse} message AdapterCheckResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AdapterCheckResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AdapterCheckResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.AdapterCheckResponse} AdapterCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AdapterCheckResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.AdapterCheckResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.isAlive = reader.bool();
                                break;
                            }
                        case 2: {
                                message.isScanActivate = reader.bool();
                                break;
                            }
                        case 3: {
                                message.adapterName = reader.string();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an AdapterCheckResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.AdapterCheckResponse} AdapterCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AdapterCheckResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AdapterCheckResponse message.
                 * @function verify
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AdapterCheckResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.isAlive != null && message.hasOwnProperty("isAlive"))
                        if (typeof message.isAlive !== "boolean")
                            return "isAlive: boolean expected";
                    if (message.isScanActivate != null && message.hasOwnProperty("isScanActivate"))
                        if (typeof message.isScanActivate !== "boolean")
                            return "isScanActivate: boolean expected";
                    if (message.adapterName != null && message.hasOwnProperty("adapterName"))
                        if (!$util.isString(message.adapterName))
                            return "adapterName: string expected";
                    return null;
                };

                /**
                 * Creates an AdapterCheckResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.AdapterCheckResponse} AdapterCheckResponse
                 */
                AdapterCheckResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.AdapterCheckResponse)
                        return object;
                    var message = new $root.api.wireless.v1.AdapterCheckResponse();
                    if (object.isAlive != null)
                        message.isAlive = Boolean(object.isAlive);
                    if (object.isScanActivate != null)
                        message.isScanActivate = Boolean(object.isScanActivate);
                    if (object.adapterName != null)
                        message.adapterName = String(object.adapterName);
                    return message;
                };

                /**
                 * Creates a plain object from an AdapterCheckResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @static
                 * @param {api.wireless.v1.AdapterCheckResponse} message AdapterCheckResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AdapterCheckResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.isAlive = false;
                        object.isScanActivate = false;
                        object.adapterName = "";
                    }
                    if (message.isAlive != null && message.hasOwnProperty("isAlive"))
                        object.isAlive = message.isAlive;
                    if (message.isScanActivate != null && message.hasOwnProperty("isScanActivate"))
                        object.isScanActivate = message.isScanActivate;
                    if (message.adapterName != null && message.hasOwnProperty("adapterName"))
                        object.adapterName = message.adapterName;
                    return object;
                };

                /**
                 * Converts this AdapterCheckResponse to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AdapterCheckResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for AdapterCheckResponse
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.AdapterCheckResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                AdapterCheckResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.AdapterCheckResponse";
                };

                return AdapterCheckResponse;
            })();

            v1.AdapterScanRequest = (function() {

                /**
                 * Properties of an AdapterScanRequest.
                 * @memberof api.wireless.v1
                 * @interface IAdapterScanRequest
                 * @property {boolean|null} [isScanActivate] AdapterScanRequest isScanActivate
                 * @property {number|null} [duration] AdapterScanRequest duration
                 */

                /**
                 * Constructs a new AdapterScanRequest.
                 * @memberof api.wireless.v1
                 * @classdesc Represents an AdapterScanRequest.
                 * @implements IAdapterScanRequest
                 * @constructor
                 * @param {api.wireless.v1.IAdapterScanRequest=} [properties] Properties to set
                 */
                function AdapterScanRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AdapterScanRequest isScanActivate.
                 * @member {boolean} isScanActivate
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @instance
                 */
                AdapterScanRequest.prototype.isScanActivate = false;

                /**
                 * AdapterScanRequest duration.
                 * @member {number|null|undefined} duration
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @instance
                 */
                AdapterScanRequest.prototype.duration = null;

                // OneOf field names bound to virtual getters and setters
                var $oneOfFields;

                // Virtual OneOf for proto3 optional field
                Object.defineProperty(AdapterScanRequest.prototype, "_duration", {
                    get: $util.oneOfGetter($oneOfFields = ["duration"]),
                    set: $util.oneOfSetter($oneOfFields)
                });

                /**
                 * Creates a new AdapterScanRequest instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @static
                 * @param {api.wireless.v1.IAdapterScanRequest=} [properties] Properties to set
                 * @returns {api.wireless.v1.AdapterScanRequest} AdapterScanRequest instance
                 */
                AdapterScanRequest.create = function create(properties) {
                    return new AdapterScanRequest(properties);
                };

                /**
                 * Encodes the specified AdapterScanRequest message. Does not implicitly {@link api.wireless.v1.AdapterScanRequest.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @static
                 * @param {api.wireless.v1.IAdapterScanRequest} message AdapterScanRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AdapterScanRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.isScanActivate != null && Object.hasOwnProperty.call(message, "isScanActivate"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.isScanActivate);
                    if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.duration);
                    return writer;
                };

                /**
                 * Encodes the specified AdapterScanRequest message, length delimited. Does not implicitly {@link api.wireless.v1.AdapterScanRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @static
                 * @param {api.wireless.v1.IAdapterScanRequest} message AdapterScanRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AdapterScanRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AdapterScanRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.AdapterScanRequest} AdapterScanRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AdapterScanRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.AdapterScanRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.isScanActivate = reader.bool();
                                break;
                            }
                        case 2: {
                                message.duration = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an AdapterScanRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.AdapterScanRequest} AdapterScanRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AdapterScanRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AdapterScanRequest message.
                 * @function verify
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AdapterScanRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    var properties = {};
                    if (message.isScanActivate != null && message.hasOwnProperty("isScanActivate"))
                        if (typeof message.isScanActivate !== "boolean")
                            return "isScanActivate: boolean expected";
                    if (message.duration != null && message.hasOwnProperty("duration")) {
                        properties._duration = 1;
                        if (!$util.isInteger(message.duration))
                            return "duration: integer expected";
                    }
                    return null;
                };

                /**
                 * Creates an AdapterScanRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.AdapterScanRequest} AdapterScanRequest
                 */
                AdapterScanRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.AdapterScanRequest)
                        return object;
                    var message = new $root.api.wireless.v1.AdapterScanRequest();
                    if (object.isScanActivate != null)
                        message.isScanActivate = Boolean(object.isScanActivate);
                    if (object.duration != null)
                        message.duration = object.duration | 0;
                    return message;
                };

                /**
                 * Creates a plain object from an AdapterScanRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @static
                 * @param {api.wireless.v1.AdapterScanRequest} message AdapterScanRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AdapterScanRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.isScanActivate = false;
                    if (message.isScanActivate != null && message.hasOwnProperty("isScanActivate"))
                        object.isScanActivate = message.isScanActivate;
                    if (message.duration != null && message.hasOwnProperty("duration")) {
                        object.duration = message.duration;
                        if (options.oneofs)
                            object._duration = "duration";
                    }
                    return object;
                };

                /**
                 * Converts this AdapterScanRequest to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AdapterScanRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for AdapterScanRequest
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.AdapterScanRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                AdapterScanRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.AdapterScanRequest";
                };

                return AdapterScanRequest;
            })();

            v1.AdapterScanResponse = (function() {

                /**
                 * Properties of an AdapterScanResponse.
                 * @memberof api.wireless.v1
                 * @interface IAdapterScanResponse
                 * @property {Uint8Array|null} [ctx] AdapterScanResponse ctx
                 */

                /**
                 * Constructs a new AdapterScanResponse.
                 * @memberof api.wireless.v1
                 * @classdesc Represents an AdapterScanResponse.
                 * @implements IAdapterScanResponse
                 * @constructor
                 * @param {api.wireless.v1.IAdapterScanResponse=} [properties] Properties to set
                 */
                function AdapterScanResponse(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AdapterScanResponse ctx.
                 * @member {Uint8Array} ctx
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @instance
                 */
                AdapterScanResponse.prototype.ctx = $util.newBuffer([]);

                /**
                 * Creates a new AdapterScanResponse instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @static
                 * @param {api.wireless.v1.IAdapterScanResponse=} [properties] Properties to set
                 * @returns {api.wireless.v1.AdapterScanResponse} AdapterScanResponse instance
                 */
                AdapterScanResponse.create = function create(properties) {
                    return new AdapterScanResponse(properties);
                };

                /**
                 * Encodes the specified AdapterScanResponse message. Does not implicitly {@link api.wireless.v1.AdapterScanResponse.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @static
                 * @param {api.wireless.v1.IAdapterScanResponse} message AdapterScanResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AdapterScanResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.ctx != null && Object.hasOwnProperty.call(message, "ctx"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.ctx);
                    return writer;
                };

                /**
                 * Encodes the specified AdapterScanResponse message, length delimited. Does not implicitly {@link api.wireless.v1.AdapterScanResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @static
                 * @param {api.wireless.v1.IAdapterScanResponse} message AdapterScanResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AdapterScanResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AdapterScanResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.AdapterScanResponse} AdapterScanResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AdapterScanResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.AdapterScanResponse();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 2: {
                                message.ctx = reader.bytes();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an AdapterScanResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.AdapterScanResponse} AdapterScanResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AdapterScanResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AdapterScanResponse message.
                 * @function verify
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AdapterScanResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.ctx != null && message.hasOwnProperty("ctx"))
                        if (!(message.ctx && typeof message.ctx.length === "number" || $util.isString(message.ctx)))
                            return "ctx: buffer expected";
                    return null;
                };

                /**
                 * Creates an AdapterScanResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.AdapterScanResponse} AdapterScanResponse
                 */
                AdapterScanResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.AdapterScanResponse)
                        return object;
                    var message = new $root.api.wireless.v1.AdapterScanResponse();
                    if (object.ctx != null)
                        if (typeof object.ctx === "string")
                            $util.base64.decode(object.ctx, message.ctx = $util.newBuffer($util.base64.length(object.ctx)), 0);
                        else if (object.ctx.length >= 0)
                            message.ctx = object.ctx;
                    return message;
                };

                /**
                 * Creates a plain object from an AdapterScanResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @static
                 * @param {api.wireless.v1.AdapterScanResponse} message AdapterScanResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AdapterScanResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        if (options.bytes === String)
                            object.ctx = "";
                        else {
                            object.ctx = [];
                            if (options.bytes !== Array)
                                object.ctx = $util.newBuffer(object.ctx);
                        }
                    if (message.ctx != null && message.hasOwnProperty("ctx"))
                        object.ctx = options.bytes === String ? $util.base64.encode(message.ctx, 0, message.ctx.length) : options.bytes === Array ? Array.prototype.slice.call(message.ctx) : message.ctx;
                    return object;
                };

                /**
                 * Converts this AdapterScanResponse to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AdapterScanResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for AdapterScanResponse
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.AdapterScanResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                AdapterScanResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.AdapterScanResponse";
                };

                return AdapterScanResponse;
            })();

            v1.AdapterConfigureRequest = (function() {

                /**
                 * Properties of an AdapterConfigureRequest.
                 * @memberof api.wireless.v1
                 * @interface IAdapterConfigureRequest
                 * @property {Uint8Array|null} [ctx] AdapterConfigureRequest ctx
                 */

                /**
                 * Constructs a new AdapterConfigureRequest.
                 * @memberof api.wireless.v1
                 * @classdesc Represents an AdapterConfigureRequest.
                 * @implements IAdapterConfigureRequest
                 * @constructor
                 * @param {api.wireless.v1.IAdapterConfigureRequest=} [properties] Properties to set
                 */
                function AdapterConfigureRequest(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * AdapterConfigureRequest ctx.
                 * @member {Uint8Array} ctx
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @instance
                 */
                AdapterConfigureRequest.prototype.ctx = $util.newBuffer([]);

                /**
                 * Creates a new AdapterConfigureRequest instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @static
                 * @param {api.wireless.v1.IAdapterConfigureRequest=} [properties] Properties to set
                 * @returns {api.wireless.v1.AdapterConfigureRequest} AdapterConfigureRequest instance
                 */
                AdapterConfigureRequest.create = function create(properties) {
                    return new AdapterConfigureRequest(properties);
                };

                /**
                 * Encodes the specified AdapterConfigureRequest message. Does not implicitly {@link api.wireless.v1.AdapterConfigureRequest.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @static
                 * @param {api.wireless.v1.IAdapterConfigureRequest} message AdapterConfigureRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AdapterConfigureRequest.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.ctx != null && Object.hasOwnProperty.call(message, "ctx"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.ctx);
                    return writer;
                };

                /**
                 * Encodes the specified AdapterConfigureRequest message, length delimited. Does not implicitly {@link api.wireless.v1.AdapterConfigureRequest.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @static
                 * @param {api.wireless.v1.IAdapterConfigureRequest} message AdapterConfigureRequest message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                AdapterConfigureRequest.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes an AdapterConfigureRequest message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.AdapterConfigureRequest} AdapterConfigureRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AdapterConfigureRequest.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.AdapterConfigureRequest();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.ctx = reader.bytes();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes an AdapterConfigureRequest message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.AdapterConfigureRequest} AdapterConfigureRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                AdapterConfigureRequest.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies an AdapterConfigureRequest message.
                 * @function verify
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                AdapterConfigureRequest.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.ctx != null && message.hasOwnProperty("ctx"))
                        if (!(message.ctx && typeof message.ctx.length === "number" || $util.isString(message.ctx)))
                            return "ctx: buffer expected";
                    return null;
                };

                /**
                 * Creates an AdapterConfigureRequest message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.AdapterConfigureRequest} AdapterConfigureRequest
                 */
                AdapterConfigureRequest.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.AdapterConfigureRequest)
                        return object;
                    var message = new $root.api.wireless.v1.AdapterConfigureRequest();
                    if (object.ctx != null)
                        if (typeof object.ctx === "string")
                            $util.base64.decode(object.ctx, message.ctx = $util.newBuffer($util.base64.length(object.ctx)), 0);
                        else if (object.ctx.length >= 0)
                            message.ctx = object.ctx;
                    return message;
                };

                /**
                 * Creates a plain object from an AdapterConfigureRequest message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @static
                 * @param {api.wireless.v1.AdapterConfigureRequest} message AdapterConfigureRequest
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                AdapterConfigureRequest.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        if (options.bytes === String)
                            object.ctx = "";
                        else {
                            object.ctx = [];
                            if (options.bytes !== Array)
                                object.ctx = $util.newBuffer(object.ctx);
                        }
                    if (message.ctx != null && message.hasOwnProperty("ctx"))
                        object.ctx = options.bytes === String ? $util.base64.encode(message.ctx, 0, message.ctx.length) : options.bytes === Array ? Array.prototype.slice.call(message.ctx) : message.ctx;
                    return object;
                };

                /**
                 * Converts this AdapterConfigureRequest to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                AdapterConfigureRequest.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for AdapterConfigureRequest
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.AdapterConfigureRequest
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                AdapterConfigureRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.AdapterConfigureRequest";
                };

                return AdapterConfigureRequest;
            })();

            v1.DeviceCreateContext = (function() {

                /**
                 * Properties of a DeviceCreateContext.
                 * @memberof api.wireless.v1
                 * @interface IDeviceCreateContext
                 * @property {Uint8Array|null} [deviceData] DeviceCreateContext deviceData
                 */

                /**
                 * Constructs a new DeviceCreateContext.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a DeviceCreateContext.
                 * @implements IDeviceCreateContext
                 * @constructor
                 * @param {api.wireless.v1.IDeviceCreateContext=} [properties] Properties to set
                 */
                function DeviceCreateContext(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeviceCreateContext deviceData.
                 * @member {Uint8Array} deviceData
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @instance
                 */
                DeviceCreateContext.prototype.deviceData = $util.newBuffer([]);

                /**
                 * Creates a new DeviceCreateContext instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @static
                 * @param {api.wireless.v1.IDeviceCreateContext=} [properties] Properties to set
                 * @returns {api.wireless.v1.DeviceCreateContext} DeviceCreateContext instance
                 */
                DeviceCreateContext.create = function create(properties) {
                    return new DeviceCreateContext(properties);
                };

                /**
                 * Encodes the specified DeviceCreateContext message. Does not implicitly {@link api.wireless.v1.DeviceCreateContext.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @static
                 * @param {api.wireless.v1.IDeviceCreateContext} message DeviceCreateContext message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeviceCreateContext.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.deviceData != null && Object.hasOwnProperty.call(message, "deviceData"))
                        writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.deviceData);
                    return writer;
                };

                /**
                 * Encodes the specified DeviceCreateContext message, length delimited. Does not implicitly {@link api.wireless.v1.DeviceCreateContext.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @static
                 * @param {api.wireless.v1.IDeviceCreateContext} message DeviceCreateContext message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeviceCreateContext.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeviceCreateContext message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.DeviceCreateContext} DeviceCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeviceCreateContext.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.DeviceCreateContext();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.deviceData = reader.bytes();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeviceCreateContext message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.DeviceCreateContext} DeviceCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeviceCreateContext.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeviceCreateContext message.
                 * @function verify
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeviceCreateContext.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.deviceData != null && message.hasOwnProperty("deviceData"))
                        if (!(message.deviceData && typeof message.deviceData.length === "number" || $util.isString(message.deviceData)))
                            return "deviceData: buffer expected";
                    return null;
                };

                /**
                 * Creates a DeviceCreateContext message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.DeviceCreateContext} DeviceCreateContext
                 */
                DeviceCreateContext.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.DeviceCreateContext)
                        return object;
                    var message = new $root.api.wireless.v1.DeviceCreateContext();
                    if (object.deviceData != null)
                        if (typeof object.deviceData === "string")
                            $util.base64.decode(object.deviceData, message.deviceData = $util.newBuffer($util.base64.length(object.deviceData)), 0);
                        else if (object.deviceData.length >= 0)
                            message.deviceData = object.deviceData;
                    return message;
                };

                /**
                 * Creates a plain object from a DeviceCreateContext message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @static
                 * @param {api.wireless.v1.DeviceCreateContext} message DeviceCreateContext
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeviceCreateContext.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        if (options.bytes === String)
                            object.deviceData = "";
                        else {
                            object.deviceData = [];
                            if (options.bytes !== Array)
                                object.deviceData = $util.newBuffer(object.deviceData);
                        }
                    if (message.deviceData != null && message.hasOwnProperty("deviceData"))
                        object.deviceData = options.bytes === String ? $util.base64.encode(message.deviceData, 0, message.deviceData.length) : options.bytes === Array ? Array.prototype.slice.call(message.deviceData) : message.deviceData;
                    return object;
                };

                /**
                 * Converts this DeviceCreateContext to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeviceCreateContext.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeviceCreateContext
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.DeviceCreateContext
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeviceCreateContext.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.DeviceCreateContext";
                };

                return DeviceCreateContext;
            })();

            v1.DeviceID = (function() {

                /**
                 * Properties of a DeviceID.
                 * @memberof api.wireless.v1
                 * @interface IDeviceID
                 * @property {number|null} [ID] DeviceID ID
                 */

                /**
                 * Constructs a new DeviceID.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a DeviceID.
                 * @implements IDeviceID
                 * @constructor
                 * @param {api.wireless.v1.IDeviceID=} [properties] Properties to set
                 */
                function DeviceID(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeviceID ID.
                 * @member {number} ID
                 * @memberof api.wireless.v1.DeviceID
                 * @instance
                 */
                DeviceID.prototype.ID = 0;

                /**
                 * Creates a new DeviceID instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.DeviceID
                 * @static
                 * @param {api.wireless.v1.IDeviceID=} [properties] Properties to set
                 * @returns {api.wireless.v1.DeviceID} DeviceID instance
                 */
                DeviceID.create = function create(properties) {
                    return new DeviceID(properties);
                };

                /**
                 * Encodes the specified DeviceID message. Does not implicitly {@link api.wireless.v1.DeviceID.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.DeviceID
                 * @static
                 * @param {api.wireless.v1.IDeviceID} message DeviceID message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeviceID.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ID);
                    return writer;
                };

                /**
                 * Encodes the specified DeviceID message, length delimited. Does not implicitly {@link api.wireless.v1.DeviceID.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.DeviceID
                 * @static
                 * @param {api.wireless.v1.IDeviceID} message DeviceID message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeviceID.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeviceID message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.DeviceID
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.DeviceID} DeviceID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeviceID.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.DeviceID();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.ID = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeviceID message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.DeviceID
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.DeviceID} DeviceID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeviceID.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeviceID message.
                 * @function verify
                 * @memberof api.wireless.v1.DeviceID
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeviceID.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.ID != null && message.hasOwnProperty("ID"))
                        if (!$util.isInteger(message.ID))
                            return "ID: integer expected";
                    return null;
                };

                /**
                 * Creates a DeviceID message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.DeviceID
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.DeviceID} DeviceID
                 */
                DeviceID.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.DeviceID)
                        return object;
                    var message = new $root.api.wireless.v1.DeviceID();
                    if (object.ID != null)
                        message.ID = object.ID >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a DeviceID message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.DeviceID
                 * @static
                 * @param {api.wireless.v1.DeviceID} message DeviceID
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeviceID.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.ID = 0;
                    if (message.ID != null && message.hasOwnProperty("ID"))
                        object.ID = message.ID;
                    return object;
                };

                /**
                 * Converts this DeviceID to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.DeviceID
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeviceID.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeviceID
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.DeviceID
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeviceID.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.DeviceID";
                };

                return DeviceID;
            })();

            v1.DeviceCheckResponse = (function() {

                /**
                 * Properties of a DeviceCheckResponse.
                 * @memberof api.wireless.v1
                 * @interface IDeviceCheckResponse
                 * @property {Object.<string,Uint8Array>|null} [deviceStatusList] DeviceCheckResponse deviceStatusList
                 */

                /**
                 * Constructs a new DeviceCheckResponse.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a DeviceCheckResponse.
                 * @implements IDeviceCheckResponse
                 * @constructor
                 * @param {api.wireless.v1.IDeviceCheckResponse=} [properties] Properties to set
                 */
                function DeviceCheckResponse(properties) {
                    this.deviceStatusList = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * DeviceCheckResponse deviceStatusList.
                 * @member {Object.<string,Uint8Array>} deviceStatusList
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @instance
                 */
                DeviceCheckResponse.prototype.deviceStatusList = $util.emptyObject;

                /**
                 * Creates a new DeviceCheckResponse instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @static
                 * @param {api.wireless.v1.IDeviceCheckResponse=} [properties] Properties to set
                 * @returns {api.wireless.v1.DeviceCheckResponse} DeviceCheckResponse instance
                 */
                DeviceCheckResponse.create = function create(properties) {
                    return new DeviceCheckResponse(properties);
                };

                /**
                 * Encodes the specified DeviceCheckResponse message. Does not implicitly {@link api.wireless.v1.DeviceCheckResponse.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @static
                 * @param {api.wireless.v1.IDeviceCheckResponse} message DeviceCheckResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeviceCheckResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.deviceStatusList != null && Object.hasOwnProperty.call(message, "deviceStatusList"))
                        for (var keys = Object.keys(message.deviceStatusList), i = 0; i < keys.length; ++i)
                            writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]).uint32(/* id 2, wireType 2 =*/18).bytes(message.deviceStatusList[keys[i]]).ldelim();
                    return writer;
                };

                /**
                 * Encodes the specified DeviceCheckResponse message, length delimited. Does not implicitly {@link api.wireless.v1.DeviceCheckResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @static
                 * @param {api.wireless.v1.IDeviceCheckResponse} message DeviceCheckResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                DeviceCheckResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a DeviceCheckResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.DeviceCheckResponse} DeviceCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeviceCheckResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.DeviceCheckResponse(), key, value;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                if (message.deviceStatusList === $util.emptyObject)
                                    message.deviceStatusList = {};
                                var end2 = reader.uint32() + reader.pos;
                                key = 0;
                                value = [];
                                while (reader.pos < end2) {
                                    var tag2 = reader.uint32();
                                    switch (tag2 >>> 3) {
                                    case 1:
                                        key = reader.uint32();
                                        break;
                                    case 2:
                                        value = reader.bytes();
                                        break;
                                    default:
                                        reader.skipType(tag2 & 7);
                                        break;
                                    }
                                }
                                message.deviceStatusList[key] = value;
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a DeviceCheckResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.DeviceCheckResponse} DeviceCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                DeviceCheckResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a DeviceCheckResponse message.
                 * @function verify
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                DeviceCheckResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.deviceStatusList != null && message.hasOwnProperty("deviceStatusList")) {
                        if (!$util.isObject(message.deviceStatusList))
                            return "deviceStatusList: object expected";
                        var key = Object.keys(message.deviceStatusList);
                        for (var i = 0; i < key.length; ++i) {
                            if (!$util.key32Re.test(key[i]))
                                return "deviceStatusList: integer key{k:uint32} expected";
                            if (!(message.deviceStatusList[key[i]] && typeof message.deviceStatusList[key[i]].length === "number" || $util.isString(message.deviceStatusList[key[i]])))
                                return "deviceStatusList: buffer{k:uint32} expected";
                        }
                    }
                    return null;
                };

                /**
                 * Creates a DeviceCheckResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.DeviceCheckResponse} DeviceCheckResponse
                 */
                DeviceCheckResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.DeviceCheckResponse)
                        return object;
                    var message = new $root.api.wireless.v1.DeviceCheckResponse();
                    if (object.deviceStatusList) {
                        if (typeof object.deviceStatusList !== "object")
                            throw TypeError(".api.wireless.v1.DeviceCheckResponse.deviceStatusList: object expected");
                        message.deviceStatusList = {};
                        for (var keys = Object.keys(object.deviceStatusList), i = 0; i < keys.length; ++i)
                            if (typeof object.deviceStatusList[keys[i]] === "string")
                                $util.base64.decode(object.deviceStatusList[keys[i]], message.deviceStatusList[keys[i]] = $util.newBuffer($util.base64.length(object.deviceStatusList[keys[i]])), 0);
                            else if (object.deviceStatusList[keys[i]].length >= 0)
                                message.deviceStatusList[keys[i]] = object.deviceStatusList[keys[i]];
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a DeviceCheckResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @static
                 * @param {api.wireless.v1.DeviceCheckResponse} message DeviceCheckResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                DeviceCheckResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.objects || options.defaults)
                        object.deviceStatusList = {};
                    var keys2;
                    if (message.deviceStatusList && (keys2 = Object.keys(message.deviceStatusList)).length) {
                        object.deviceStatusList = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.deviceStatusList[keys2[j]] = options.bytes === String ? $util.base64.encode(message.deviceStatusList[keys2[j]], 0, message.deviceStatusList[keys2[j]].length) : options.bytes === Array ? Array.prototype.slice.call(message.deviceStatusList[keys2[j]]) : message.deviceStatusList[keys2[j]];
                    }
                    return object;
                };

                /**
                 * Converts this DeviceCheckResponse to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                DeviceCheckResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for DeviceCheckResponse
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.DeviceCheckResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                DeviceCheckResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.DeviceCheckResponse";
                };

                return DeviceCheckResponse;
            })();

            v1.ConnectStatus = (function() {

                /**
                 * Properties of a ConnectStatus.
                 * @memberof api.wireless.v1
                 * @interface IConnectStatus
                 * @property {boolean|null} [status] ConnectStatus status
                 * @property {Uint8Array|null} [connectSpec] ConnectStatus connectSpec
                 */

                /**
                 * Constructs a new ConnectStatus.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a ConnectStatus.
                 * @implements IConnectStatus
                 * @constructor
                 * @param {api.wireless.v1.IConnectStatus=} [properties] Properties to set
                 */
                function ConnectStatus(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ConnectStatus status.
                 * @member {boolean} status
                 * @memberof api.wireless.v1.ConnectStatus
                 * @instance
                 */
                ConnectStatus.prototype.status = false;

                /**
                 * ConnectStatus connectSpec.
                 * @member {Uint8Array} connectSpec
                 * @memberof api.wireless.v1.ConnectStatus
                 * @instance
                 */
                ConnectStatus.prototype.connectSpec = $util.newBuffer([]);

                /**
                 * Creates a new ConnectStatus instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.ConnectStatus
                 * @static
                 * @param {api.wireless.v1.IConnectStatus=} [properties] Properties to set
                 * @returns {api.wireless.v1.ConnectStatus} ConnectStatus instance
                 */
                ConnectStatus.create = function create(properties) {
                    return new ConnectStatus(properties);
                };

                /**
                 * Encodes the specified ConnectStatus message. Does not implicitly {@link api.wireless.v1.ConnectStatus.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.ConnectStatus
                 * @static
                 * @param {api.wireless.v1.IConnectStatus} message ConnectStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConnectStatus.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.status != null && Object.hasOwnProperty.call(message, "status"))
                        writer.uint32(/* id 1, wireType 0 =*/8).bool(message.status);
                    if (message.connectSpec != null && Object.hasOwnProperty.call(message, "connectSpec"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.connectSpec);
                    return writer;
                };

                /**
                 * Encodes the specified ConnectStatus message, length delimited. Does not implicitly {@link api.wireless.v1.ConnectStatus.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.ConnectStatus
                 * @static
                 * @param {api.wireless.v1.IConnectStatus} message ConnectStatus message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConnectStatus.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ConnectStatus message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.ConnectStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.ConnectStatus} ConnectStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConnectStatus.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.ConnectStatus();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.status = reader.bool();
                                break;
                            }
                        case 2: {
                                message.connectSpec = reader.bytes();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ConnectStatus message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.ConnectStatus
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.ConnectStatus} ConnectStatus
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConnectStatus.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ConnectStatus message.
                 * @function verify
                 * @memberof api.wireless.v1.ConnectStatus
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ConnectStatus.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.status != null && message.hasOwnProperty("status"))
                        if (typeof message.status !== "boolean")
                            return "status: boolean expected";
                    if (message.connectSpec != null && message.hasOwnProperty("connectSpec"))
                        if (!(message.connectSpec && typeof message.connectSpec.length === "number" || $util.isString(message.connectSpec)))
                            return "connectSpec: buffer expected";
                    return null;
                };

                /**
                 * Creates a ConnectStatus message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.ConnectStatus
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.ConnectStatus} ConnectStatus
                 */
                ConnectStatus.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.ConnectStatus)
                        return object;
                    var message = new $root.api.wireless.v1.ConnectStatus();
                    if (object.status != null)
                        message.status = Boolean(object.status);
                    if (object.connectSpec != null)
                        if (typeof object.connectSpec === "string")
                            $util.base64.decode(object.connectSpec, message.connectSpec = $util.newBuffer($util.base64.length(object.connectSpec)), 0);
                        else if (object.connectSpec.length >= 0)
                            message.connectSpec = object.connectSpec;
                    return message;
                };

                /**
                 * Creates a plain object from a ConnectStatus message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.ConnectStatus
                 * @static
                 * @param {api.wireless.v1.ConnectStatus} message ConnectStatus
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ConnectStatus.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.status = false;
                        if (options.bytes === String)
                            object.connectSpec = "";
                        else {
                            object.connectSpec = [];
                            if (options.bytes !== Array)
                                object.connectSpec = $util.newBuffer(object.connectSpec);
                        }
                    }
                    if (message.status != null && message.hasOwnProperty("status"))
                        object.status = message.status;
                    if (message.connectSpec != null && message.hasOwnProperty("connectSpec"))
                        object.connectSpec = options.bytes === String ? $util.base64.encode(message.connectSpec, 0, message.connectSpec.length) : options.bytes === Array ? Array.prototype.slice.call(message.connectSpec) : message.connectSpec;
                    return object;
                };

                /**
                 * Converts this ConnectStatus to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.ConnectStatus
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ConnectStatus.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ConnectStatus
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.ConnectStatus
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ConnectStatus.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.ConnectStatus";
                };

                return ConnectStatus;
            })();

            v1.ConnectCheckResponse = (function() {

                /**
                 * Properties of a ConnectCheckResponse.
                 * @memberof api.wireless.v1
                 * @interface IConnectCheckResponse
                 * @property {Object.<string,api.wireless.v1.IConnectStatus>|null} [connectStatusList] ConnectCheckResponse connectStatusList
                 */

                /**
                 * Constructs a new ConnectCheckResponse.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a ConnectCheckResponse.
                 * @implements IConnectCheckResponse
                 * @constructor
                 * @param {api.wireless.v1.IConnectCheckResponse=} [properties] Properties to set
                 */
                function ConnectCheckResponse(properties) {
                    this.connectStatusList = {};
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ConnectCheckResponse connectStatusList.
                 * @member {Object.<string,api.wireless.v1.IConnectStatus>} connectStatusList
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @instance
                 */
                ConnectCheckResponse.prototype.connectStatusList = $util.emptyObject;

                /**
                 * Creates a new ConnectCheckResponse instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @static
                 * @param {api.wireless.v1.IConnectCheckResponse=} [properties] Properties to set
                 * @returns {api.wireless.v1.ConnectCheckResponse} ConnectCheckResponse instance
                 */
                ConnectCheckResponse.create = function create(properties) {
                    return new ConnectCheckResponse(properties);
                };

                /**
                 * Encodes the specified ConnectCheckResponse message. Does not implicitly {@link api.wireless.v1.ConnectCheckResponse.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @static
                 * @param {api.wireless.v1.IConnectCheckResponse} message ConnectCheckResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConnectCheckResponse.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.connectStatusList != null && Object.hasOwnProperty.call(message, "connectStatusList"))
                        for (var keys = Object.keys(message.connectStatusList), i = 0; i < keys.length; ++i) {
                            writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 0 =*/8).uint32(keys[i]);
                            $root.api.wireless.v1.ConnectStatus.encode(message.connectStatusList[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                        }
                    return writer;
                };

                /**
                 * Encodes the specified ConnectCheckResponse message, length delimited. Does not implicitly {@link api.wireless.v1.ConnectCheckResponse.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @static
                 * @param {api.wireless.v1.IConnectCheckResponse} message ConnectCheckResponse message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConnectCheckResponse.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ConnectCheckResponse message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.ConnectCheckResponse} ConnectCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConnectCheckResponse.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.ConnectCheckResponse(), key, value;
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                if (message.connectStatusList === $util.emptyObject)
                                    message.connectStatusList = {};
                                var end2 = reader.uint32() + reader.pos;
                                key = 0;
                                value = null;
                                while (reader.pos < end2) {
                                    var tag2 = reader.uint32();
                                    switch (tag2 >>> 3) {
                                    case 1:
                                        key = reader.uint32();
                                        break;
                                    case 2:
                                        value = $root.api.wireless.v1.ConnectStatus.decode(reader, reader.uint32());
                                        break;
                                    default:
                                        reader.skipType(tag2 & 7);
                                        break;
                                    }
                                }
                                message.connectStatusList[key] = value;
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ConnectCheckResponse message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.ConnectCheckResponse} ConnectCheckResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConnectCheckResponse.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ConnectCheckResponse message.
                 * @function verify
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ConnectCheckResponse.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.connectStatusList != null && message.hasOwnProperty("connectStatusList")) {
                        if (!$util.isObject(message.connectStatusList))
                            return "connectStatusList: object expected";
                        var key = Object.keys(message.connectStatusList);
                        for (var i = 0; i < key.length; ++i) {
                            if (!$util.key32Re.test(key[i]))
                                return "connectStatusList: integer key{k:uint32} expected";
                            {
                                var error = $root.api.wireless.v1.ConnectStatus.verify(message.connectStatusList[key[i]]);
                                if (error)
                                    return "connectStatusList." + error;
                            }
                        }
                    }
                    return null;
                };

                /**
                 * Creates a ConnectCheckResponse message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.ConnectCheckResponse} ConnectCheckResponse
                 */
                ConnectCheckResponse.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.ConnectCheckResponse)
                        return object;
                    var message = new $root.api.wireless.v1.ConnectCheckResponse();
                    if (object.connectStatusList) {
                        if (typeof object.connectStatusList !== "object")
                            throw TypeError(".api.wireless.v1.ConnectCheckResponse.connectStatusList: object expected");
                        message.connectStatusList = {};
                        for (var keys = Object.keys(object.connectStatusList), i = 0; i < keys.length; ++i) {
                            if (typeof object.connectStatusList[keys[i]] !== "object")
                                throw TypeError(".api.wireless.v1.ConnectCheckResponse.connectStatusList: object expected");
                            message.connectStatusList[keys[i]] = $root.api.wireless.v1.ConnectStatus.fromObject(object.connectStatusList[keys[i]]);
                        }
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ConnectCheckResponse message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @static
                 * @param {api.wireless.v1.ConnectCheckResponse} message ConnectCheckResponse
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ConnectCheckResponse.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.objects || options.defaults)
                        object.connectStatusList = {};
                    var keys2;
                    if (message.connectStatusList && (keys2 = Object.keys(message.connectStatusList)).length) {
                        object.connectStatusList = {};
                        for (var j = 0; j < keys2.length; ++j)
                            object.connectStatusList[keys2[j]] = $root.api.wireless.v1.ConnectStatus.toObject(message.connectStatusList[keys2[j]], options);
                    }
                    return object;
                };

                /**
                 * Converts this ConnectCheckResponse to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ConnectCheckResponse.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ConnectCheckResponse
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.ConnectCheckResponse
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ConnectCheckResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.ConnectCheckResponse";
                };

                return ConnectCheckResponse;
            })();

            v1.ConnectCreateContext = (function() {

                /**
                 * Properties of a ConnectCreateContext.
                 * @memberof api.wireless.v1
                 * @interface IConnectCreateContext
                 * @property {number|null} [devID] ConnectCreateContext devID
                 * @property {Uint8Array|null} [connectData] ConnectCreateContext connectData
                 */

                /**
                 * Constructs a new ConnectCreateContext.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a ConnectCreateContext.
                 * @implements IConnectCreateContext
                 * @constructor
                 * @param {api.wireless.v1.IConnectCreateContext=} [properties] Properties to set
                 */
                function ConnectCreateContext(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ConnectCreateContext devID.
                 * @member {number} devID
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @instance
                 */
                ConnectCreateContext.prototype.devID = 0;

                /**
                 * ConnectCreateContext connectData.
                 * @member {Uint8Array} connectData
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @instance
                 */
                ConnectCreateContext.prototype.connectData = $util.newBuffer([]);

                /**
                 * Creates a new ConnectCreateContext instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @static
                 * @param {api.wireless.v1.IConnectCreateContext=} [properties] Properties to set
                 * @returns {api.wireless.v1.ConnectCreateContext} ConnectCreateContext instance
                 */
                ConnectCreateContext.create = function create(properties) {
                    return new ConnectCreateContext(properties);
                };

                /**
                 * Encodes the specified ConnectCreateContext message. Does not implicitly {@link api.wireless.v1.ConnectCreateContext.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @static
                 * @param {api.wireless.v1.IConnectCreateContext} message ConnectCreateContext message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConnectCreateContext.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.devID != null && Object.hasOwnProperty.call(message, "devID"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.devID);
                    if (message.connectData != null && Object.hasOwnProperty.call(message, "connectData"))
                        writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.connectData);
                    return writer;
                };

                /**
                 * Encodes the specified ConnectCreateContext message, length delimited. Does not implicitly {@link api.wireless.v1.ConnectCreateContext.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @static
                 * @param {api.wireless.v1.IConnectCreateContext} message ConnectCreateContext message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConnectCreateContext.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ConnectCreateContext message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.ConnectCreateContext} ConnectCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConnectCreateContext.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.ConnectCreateContext();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.devID = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.connectData = reader.bytes();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ConnectCreateContext message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.ConnectCreateContext} ConnectCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConnectCreateContext.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ConnectCreateContext message.
                 * @function verify
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ConnectCreateContext.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.devID != null && message.hasOwnProperty("devID"))
                        if (!$util.isInteger(message.devID))
                            return "devID: integer expected";
                    if (message.connectData != null && message.hasOwnProperty("connectData"))
                        if (!(message.connectData && typeof message.connectData.length === "number" || $util.isString(message.connectData)))
                            return "connectData: buffer expected";
                    return null;
                };

                /**
                 * Creates a ConnectCreateContext message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.ConnectCreateContext} ConnectCreateContext
                 */
                ConnectCreateContext.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.ConnectCreateContext)
                        return object;
                    var message = new $root.api.wireless.v1.ConnectCreateContext();
                    if (object.devID != null)
                        message.devID = object.devID >>> 0;
                    if (object.connectData != null)
                        if (typeof object.connectData === "string")
                            $util.base64.decode(object.connectData, message.connectData = $util.newBuffer($util.base64.length(object.connectData)), 0);
                        else if (object.connectData.length >= 0)
                            message.connectData = object.connectData;
                    return message;
                };

                /**
                 * Creates a plain object from a ConnectCreateContext message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @static
                 * @param {api.wireless.v1.ConnectCreateContext} message ConnectCreateContext
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ConnectCreateContext.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.devID = 0;
                        if (options.bytes === String)
                            object.connectData = "";
                        else {
                            object.connectData = [];
                            if (options.bytes !== Array)
                                object.connectData = $util.newBuffer(object.connectData);
                        }
                    }
                    if (message.devID != null && message.hasOwnProperty("devID"))
                        object.devID = message.devID;
                    if (message.connectData != null && message.hasOwnProperty("connectData"))
                        object.connectData = options.bytes === String ? $util.base64.encode(message.connectData, 0, message.connectData.length) : options.bytes === Array ? Array.prototype.slice.call(message.connectData) : message.connectData;
                    return object;
                };

                /**
                 * Converts this ConnectCreateContext to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ConnectCreateContext.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ConnectCreateContext
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.ConnectCreateContext
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ConnectCreateContext.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.ConnectCreateContext";
                };

                return ConnectCreateContext;
            })();

            v1.ConnectDestroyContext = (function() {

                /**
                 * Properties of a ConnectDestroyContext.
                 * @memberof api.wireless.v1
                 * @interface IConnectDestroyContext
                 * @property {number|null} [devID] ConnectDestroyContext devID
                 * @property {number|null} [connID] ConnectDestroyContext connID
                 */

                /**
                 * Constructs a new ConnectDestroyContext.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a ConnectDestroyContext.
                 * @implements IConnectDestroyContext
                 * @constructor
                 * @param {api.wireless.v1.IConnectDestroyContext=} [properties] Properties to set
                 */
                function ConnectDestroyContext(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ConnectDestroyContext devID.
                 * @member {number} devID
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @instance
                 */
                ConnectDestroyContext.prototype.devID = 0;

                /**
                 * ConnectDestroyContext connID.
                 * @member {number} connID
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @instance
                 */
                ConnectDestroyContext.prototype.connID = 0;

                /**
                 * Creates a new ConnectDestroyContext instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @static
                 * @param {api.wireless.v1.IConnectDestroyContext=} [properties] Properties to set
                 * @returns {api.wireless.v1.ConnectDestroyContext} ConnectDestroyContext instance
                 */
                ConnectDestroyContext.create = function create(properties) {
                    return new ConnectDestroyContext(properties);
                };

                /**
                 * Encodes the specified ConnectDestroyContext message. Does not implicitly {@link api.wireless.v1.ConnectDestroyContext.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @static
                 * @param {api.wireless.v1.IConnectDestroyContext} message ConnectDestroyContext message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConnectDestroyContext.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.devID != null && Object.hasOwnProperty.call(message, "devID"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.devID);
                    if (message.connID != null && Object.hasOwnProperty.call(message, "connID"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.connID);
                    return writer;
                };

                /**
                 * Encodes the specified ConnectDestroyContext message, length delimited. Does not implicitly {@link api.wireless.v1.ConnectDestroyContext.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @static
                 * @param {api.wireless.v1.IConnectDestroyContext} message ConnectDestroyContext message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConnectDestroyContext.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ConnectDestroyContext message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.ConnectDestroyContext} ConnectDestroyContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConnectDestroyContext.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.ConnectDestroyContext();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.devID = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.connID = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ConnectDestroyContext message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.ConnectDestroyContext} ConnectDestroyContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConnectDestroyContext.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ConnectDestroyContext message.
                 * @function verify
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ConnectDestroyContext.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.devID != null && message.hasOwnProperty("devID"))
                        if (!$util.isInteger(message.devID))
                            return "devID: integer expected";
                    if (message.connID != null && message.hasOwnProperty("connID"))
                        if (!$util.isInteger(message.connID))
                            return "connID: integer expected";
                    return null;
                };

                /**
                 * Creates a ConnectDestroyContext message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.ConnectDestroyContext} ConnectDestroyContext
                 */
                ConnectDestroyContext.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.ConnectDestroyContext)
                        return object;
                    var message = new $root.api.wireless.v1.ConnectDestroyContext();
                    if (object.devID != null)
                        message.devID = object.devID >>> 0;
                    if (object.connID != null)
                        message.connID = object.connID >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ConnectDestroyContext message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @static
                 * @param {api.wireless.v1.ConnectDestroyContext} message ConnectDestroyContext
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ConnectDestroyContext.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.devID = 0;
                        object.connID = 0;
                    }
                    if (message.devID != null && message.hasOwnProperty("devID"))
                        object.devID = message.devID;
                    if (message.connID != null && message.hasOwnProperty("connID"))
                        object.connID = message.connID;
                    return object;
                };

                /**
                 * Converts this ConnectDestroyContext to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ConnectDestroyContext.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ConnectDestroyContext
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.ConnectDestroyContext
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ConnectDestroyContext.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.ConnectDestroyContext";
                };

                return ConnectDestroyContext;
            })();

            v1.ConnectID = (function() {

                /**
                 * Properties of a ConnectID.
                 * @memberof api.wireless.v1
                 * @interface IConnectID
                 * @property {number|null} [ID] ConnectID ID
                 */

                /**
                 * Constructs a new ConnectID.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a ConnectID.
                 * @implements IConnectID
                 * @constructor
                 * @param {api.wireless.v1.IConnectID=} [properties] Properties to set
                 */
                function ConnectID(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ConnectID ID.
                 * @member {number} ID
                 * @memberof api.wireless.v1.ConnectID
                 * @instance
                 */
                ConnectID.prototype.ID = 0;

                /**
                 * Creates a new ConnectID instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.ConnectID
                 * @static
                 * @param {api.wireless.v1.IConnectID=} [properties] Properties to set
                 * @returns {api.wireless.v1.ConnectID} ConnectID instance
                 */
                ConnectID.create = function create(properties) {
                    return new ConnectID(properties);
                };

                /**
                 * Encodes the specified ConnectID message. Does not implicitly {@link api.wireless.v1.ConnectID.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.ConnectID
                 * @static
                 * @param {api.wireless.v1.IConnectID} message ConnectID message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConnectID.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ID);
                    return writer;
                };

                /**
                 * Encodes the specified ConnectID message, length delimited. Does not implicitly {@link api.wireless.v1.ConnectID.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.ConnectID
                 * @static
                 * @param {api.wireless.v1.IConnectID} message ConnectID message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ConnectID.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ConnectID message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.ConnectID
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.ConnectID} ConnectID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConnectID.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.ConnectID();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.ID = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ConnectID message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.ConnectID
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.ConnectID} ConnectID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ConnectID.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ConnectID message.
                 * @function verify
                 * @memberof api.wireless.v1.ConnectID
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ConnectID.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.ID != null && message.hasOwnProperty("ID"))
                        if (!$util.isInteger(message.ID))
                            return "ID: integer expected";
                    return null;
                };

                /**
                 * Creates a ConnectID message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.ConnectID
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.ConnectID} ConnectID
                 */
                ConnectID.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.ConnectID)
                        return object;
                    var message = new $root.api.wireless.v1.ConnectID();
                    if (object.ID != null)
                        message.ID = object.ID >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ConnectID message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.ConnectID
                 * @static
                 * @param {api.wireless.v1.ConnectID} message ConnectID
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ConnectID.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.ID = 0;
                    if (message.ID != null && message.hasOwnProperty("ID"))
                        object.ID = message.ID;
                    return object;
                };

                /**
                 * Converts this ConnectID to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.ConnectID
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ConnectID.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ConnectID
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.ConnectID
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ConnectID.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.ConnectID";
                };

                return ConnectID;
            })();

            /**
             * ChannelType enum.
             * @name api.wireless.v1.ChannelType
             * @enum {number}
             * @property {number} Channel_TYPE_UP=0 Channel_TYPE_UP value
             * @property {number} Channel_TYPE_DOWN=1 Channel_TYPE_DOWN value
             */
            v1.ChannelType = (function() {
                var valuesById = {}, values = Object.create(valuesById);
                values[valuesById[0] = "Channel_TYPE_UP"] = 0;
                values[valuesById[1] = "Channel_TYPE_DOWN"] = 1;
                return values;
            })();

            v1.ChannelCreateContext = (function() {

                /**
                 * Properties of a ChannelCreateContext.
                 * @memberof api.wireless.v1
                 * @interface IChannelCreateContext
                 * @property {string|null} [topic] ChannelCreateContext topic
                 * @property {api.wireless.v1.ChannelType|null} [type] ChannelCreateContext type
                 */

                /**
                 * Constructs a new ChannelCreateContext.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a ChannelCreateContext.
                 * @implements IChannelCreateContext
                 * @constructor
                 * @param {api.wireless.v1.IChannelCreateContext=} [properties] Properties to set
                 */
                function ChannelCreateContext(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChannelCreateContext topic.
                 * @member {string} topic
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @instance
                 */
                ChannelCreateContext.prototype.topic = "";

                /**
                 * ChannelCreateContext type.
                 * @member {api.wireless.v1.ChannelType} type
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @instance
                 */
                ChannelCreateContext.prototype.type = 0;

                /**
                 * Creates a new ChannelCreateContext instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @static
                 * @param {api.wireless.v1.IChannelCreateContext=} [properties] Properties to set
                 * @returns {api.wireless.v1.ChannelCreateContext} ChannelCreateContext instance
                 */
                ChannelCreateContext.create = function create(properties) {
                    return new ChannelCreateContext(properties);
                };

                /**
                 * Encodes the specified ChannelCreateContext message. Does not implicitly {@link api.wireless.v1.ChannelCreateContext.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @static
                 * @param {api.wireless.v1.IChannelCreateContext} message ChannelCreateContext message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChannelCreateContext.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.topic != null && Object.hasOwnProperty.call(message, "topic"))
                        writer.uint32(/* id 1, wireType 2 =*/10).string(message.topic);
                    if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                        writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
                    return writer;
                };

                /**
                 * Encodes the specified ChannelCreateContext message, length delimited. Does not implicitly {@link api.wireless.v1.ChannelCreateContext.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @static
                 * @param {api.wireless.v1.IChannelCreateContext} message ChannelCreateContext message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChannelCreateContext.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChannelCreateContext message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.ChannelCreateContext} ChannelCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChannelCreateContext.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.ChannelCreateContext();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.topic = reader.string();
                                break;
                            }
                        case 2: {
                                message.type = reader.int32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ChannelCreateContext message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.ChannelCreateContext} ChannelCreateContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChannelCreateContext.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChannelCreateContext message.
                 * @function verify
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChannelCreateContext.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.topic != null && message.hasOwnProperty("topic"))
                        if (!$util.isString(message.topic))
                            return "topic: string expected";
                    if (message.type != null && message.hasOwnProperty("type"))
                        switch (message.type) {
                        default:
                            return "type: enum value expected";
                        case 0:
                        case 1:
                            break;
                        }
                    return null;
                };

                /**
                 * Creates a ChannelCreateContext message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.ChannelCreateContext} ChannelCreateContext
                 */
                ChannelCreateContext.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.ChannelCreateContext)
                        return object;
                    var message = new $root.api.wireless.v1.ChannelCreateContext();
                    if (object.topic != null)
                        message.topic = String(object.topic);
                    switch (object.type) {
                    default:
                        if (typeof object.type === "number") {
                            message.type = object.type;
                            break;
                        }
                        break;
                    case "Channel_TYPE_UP":
                    case 0:
                        message.type = 0;
                        break;
                    case "Channel_TYPE_DOWN":
                    case 1:
                        message.type = 1;
                        break;
                    }
                    return message;
                };

                /**
                 * Creates a plain object from a ChannelCreateContext message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @static
                 * @param {api.wireless.v1.ChannelCreateContext} message ChannelCreateContext
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChannelCreateContext.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.topic = "";
                        object.type = options.enums === String ? "Channel_TYPE_UP" : 0;
                    }
                    if (message.topic != null && message.hasOwnProperty("topic"))
                        object.topic = message.topic;
                    if (message.type != null && message.hasOwnProperty("type"))
                        object.type = options.enums === String ? $root.api.wireless.v1.ChannelType[message.type] === undefined ? message.type : $root.api.wireless.v1.ChannelType[message.type] : message.type;
                    return object;
                };

                /**
                 * Converts this ChannelCreateContext to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChannelCreateContext.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ChannelCreateContext
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.ChannelCreateContext
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ChannelCreateContext.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.ChannelCreateContext";
                };

                return ChannelCreateContext;
            })();

            v1.ChannelBindContext = (function() {

                /**
                 * Properties of a ChannelBindContext.
                 * @memberof api.wireless.v1
                 * @interface IChannelBindContext
                 * @property {number|null} [chanId] ChannelBindContext chanId
                 * @property {number|null} [devID] ChannelBindContext devID
                 * @property {number|null} [connID] ChannelBindContext connID
                 */

                /**
                 * Constructs a new ChannelBindContext.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a ChannelBindContext.
                 * @implements IChannelBindContext
                 * @constructor
                 * @param {api.wireless.v1.IChannelBindContext=} [properties] Properties to set
                 */
                function ChannelBindContext(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChannelBindContext chanId.
                 * @member {number} chanId
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @instance
                 */
                ChannelBindContext.prototype.chanId = 0;

                /**
                 * ChannelBindContext devID.
                 * @member {number} devID
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @instance
                 */
                ChannelBindContext.prototype.devID = 0;

                /**
                 * ChannelBindContext connID.
                 * @member {number} connID
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @instance
                 */
                ChannelBindContext.prototype.connID = 0;

                /**
                 * Creates a new ChannelBindContext instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @static
                 * @param {api.wireless.v1.IChannelBindContext=} [properties] Properties to set
                 * @returns {api.wireless.v1.ChannelBindContext} ChannelBindContext instance
                 */
                ChannelBindContext.create = function create(properties) {
                    return new ChannelBindContext(properties);
                };

                /**
                 * Encodes the specified ChannelBindContext message. Does not implicitly {@link api.wireless.v1.ChannelBindContext.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @static
                 * @param {api.wireless.v1.IChannelBindContext} message ChannelBindContext message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChannelBindContext.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.chanId != null && Object.hasOwnProperty.call(message, "chanId"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.chanId);
                    if (message.devID != null && Object.hasOwnProperty.call(message, "devID"))
                        writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.devID);
                    if (message.connID != null && Object.hasOwnProperty.call(message, "connID"))
                        writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.connID);
                    return writer;
                };

                /**
                 * Encodes the specified ChannelBindContext message, length delimited. Does not implicitly {@link api.wireless.v1.ChannelBindContext.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @static
                 * @param {api.wireless.v1.IChannelBindContext} message ChannelBindContext message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChannelBindContext.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChannelBindContext message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.ChannelBindContext} ChannelBindContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChannelBindContext.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.ChannelBindContext();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.chanId = reader.uint32();
                                break;
                            }
                        case 2: {
                                message.devID = reader.uint32();
                                break;
                            }
                        case 3: {
                                message.connID = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ChannelBindContext message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.ChannelBindContext} ChannelBindContext
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChannelBindContext.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChannelBindContext message.
                 * @function verify
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChannelBindContext.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.chanId != null && message.hasOwnProperty("chanId"))
                        if (!$util.isInteger(message.chanId))
                            return "chanId: integer expected";
                    if (message.devID != null && message.hasOwnProperty("devID"))
                        if (!$util.isInteger(message.devID))
                            return "devID: integer expected";
                    if (message.connID != null && message.hasOwnProperty("connID"))
                        if (!$util.isInteger(message.connID))
                            return "connID: integer expected";
                    return null;
                };

                /**
                 * Creates a ChannelBindContext message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.ChannelBindContext} ChannelBindContext
                 */
                ChannelBindContext.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.ChannelBindContext)
                        return object;
                    var message = new $root.api.wireless.v1.ChannelBindContext();
                    if (object.chanId != null)
                        message.chanId = object.chanId >>> 0;
                    if (object.devID != null)
                        message.devID = object.devID >>> 0;
                    if (object.connID != null)
                        message.connID = object.connID >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ChannelBindContext message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @static
                 * @param {api.wireless.v1.ChannelBindContext} message ChannelBindContext
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChannelBindContext.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults) {
                        object.chanId = 0;
                        object.devID = 0;
                        object.connID = 0;
                    }
                    if (message.chanId != null && message.hasOwnProperty("chanId"))
                        object.chanId = message.chanId;
                    if (message.devID != null && message.hasOwnProperty("devID"))
                        object.devID = message.devID;
                    if (message.connID != null && message.hasOwnProperty("connID"))
                        object.connID = message.connID;
                    return object;
                };

                /**
                 * Converts this ChannelBindContext to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChannelBindContext.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ChannelBindContext
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.ChannelBindContext
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ChannelBindContext.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.ChannelBindContext";
                };

                return ChannelBindContext;
            })();

            v1.ChannelID = (function() {

                /**
                 * Properties of a ChannelID.
                 * @memberof api.wireless.v1
                 * @interface IChannelID
                 * @property {number|null} [ID] ChannelID ID
                 */

                /**
                 * Constructs a new ChannelID.
                 * @memberof api.wireless.v1
                 * @classdesc Represents a ChannelID.
                 * @implements IChannelID
                 * @constructor
                 * @param {api.wireless.v1.IChannelID=} [properties] Properties to set
                 */
                function ChannelID(properties) {
                    if (properties)
                        for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                            if (properties[keys[i]] != null)
                                this[keys[i]] = properties[keys[i]];
                }

                /**
                 * ChannelID ID.
                 * @member {number} ID
                 * @memberof api.wireless.v1.ChannelID
                 * @instance
                 */
                ChannelID.prototype.ID = 0;

                /**
                 * Creates a new ChannelID instance using the specified properties.
                 * @function create
                 * @memberof api.wireless.v1.ChannelID
                 * @static
                 * @param {api.wireless.v1.IChannelID=} [properties] Properties to set
                 * @returns {api.wireless.v1.ChannelID} ChannelID instance
                 */
                ChannelID.create = function create(properties) {
                    return new ChannelID(properties);
                };

                /**
                 * Encodes the specified ChannelID message. Does not implicitly {@link api.wireless.v1.ChannelID.verify|verify} messages.
                 * @function encode
                 * @memberof api.wireless.v1.ChannelID
                 * @static
                 * @param {api.wireless.v1.IChannelID} message ChannelID message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChannelID.encode = function encode(message, writer) {
                    if (!writer)
                        writer = $Writer.create();
                    if (message.ID != null && Object.hasOwnProperty.call(message, "ID"))
                        writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.ID);
                    return writer;
                };

                /**
                 * Encodes the specified ChannelID message, length delimited. Does not implicitly {@link api.wireless.v1.ChannelID.verify|verify} messages.
                 * @function encodeDelimited
                 * @memberof api.wireless.v1.ChannelID
                 * @static
                 * @param {api.wireless.v1.IChannelID} message ChannelID message or plain object to encode
                 * @param {$protobuf.Writer} [writer] Writer to encode to
                 * @returns {$protobuf.Writer} Writer
                 */
                ChannelID.encodeDelimited = function encodeDelimited(message, writer) {
                    return this.encode(message, writer).ldelim();
                };

                /**
                 * Decodes a ChannelID message from the specified reader or buffer.
                 * @function decode
                 * @memberof api.wireless.v1.ChannelID
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @param {number} [length] Message length if known beforehand
                 * @returns {api.wireless.v1.ChannelID} ChannelID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChannelID.decode = function decode(reader, length) {
                    if (!(reader instanceof $Reader))
                        reader = $Reader.create(reader);
                    var end = length === undefined ? reader.len : reader.pos + length, message = new $root.api.wireless.v1.ChannelID();
                    while (reader.pos < end) {
                        var tag = reader.uint32();
                        switch (tag >>> 3) {
                        case 1: {
                                message.ID = reader.uint32();
                                break;
                            }
                        default:
                            reader.skipType(tag & 7);
                            break;
                        }
                    }
                    return message;
                };

                /**
                 * Decodes a ChannelID message from the specified reader or buffer, length delimited.
                 * @function decodeDelimited
                 * @memberof api.wireless.v1.ChannelID
                 * @static
                 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                 * @returns {api.wireless.v1.ChannelID} ChannelID
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                ChannelID.decodeDelimited = function decodeDelimited(reader) {
                    if (!(reader instanceof $Reader))
                        reader = new $Reader(reader);
                    return this.decode(reader, reader.uint32());
                };

                /**
                 * Verifies a ChannelID message.
                 * @function verify
                 * @memberof api.wireless.v1.ChannelID
                 * @static
                 * @param {Object.<string,*>} message Plain object to verify
                 * @returns {string|null} `null` if valid, otherwise the reason why it is not
                 */
                ChannelID.verify = function verify(message) {
                    if (typeof message !== "object" || message === null)
                        return "object expected";
                    if (message.ID != null && message.hasOwnProperty("ID"))
                        if (!$util.isInteger(message.ID))
                            return "ID: integer expected";
                    return null;
                };

                /**
                 * Creates a ChannelID message from a plain object. Also converts values to their respective internal types.
                 * @function fromObject
                 * @memberof api.wireless.v1.ChannelID
                 * @static
                 * @param {Object.<string,*>} object Plain object
                 * @returns {api.wireless.v1.ChannelID} ChannelID
                 */
                ChannelID.fromObject = function fromObject(object) {
                    if (object instanceof $root.api.wireless.v1.ChannelID)
                        return object;
                    var message = new $root.api.wireless.v1.ChannelID();
                    if (object.ID != null)
                        message.ID = object.ID >>> 0;
                    return message;
                };

                /**
                 * Creates a plain object from a ChannelID message. Also converts values to other types if specified.
                 * @function toObject
                 * @memberof api.wireless.v1.ChannelID
                 * @static
                 * @param {api.wireless.v1.ChannelID} message ChannelID
                 * @param {$protobuf.IConversionOptions} [options] Conversion options
                 * @returns {Object.<string,*>} Plain object
                 */
                ChannelID.toObject = function toObject(message, options) {
                    if (!options)
                        options = {};
                    var object = {};
                    if (options.defaults)
                        object.ID = 0;
                    if (message.ID != null && message.hasOwnProperty("ID"))
                        object.ID = message.ID;
                    return object;
                };

                /**
                 * Converts this ChannelID to JSON.
                 * @function toJSON
                 * @memberof api.wireless.v1.ChannelID
                 * @instance
                 * @returns {Object.<string,*>} JSON object
                 */
                ChannelID.prototype.toJSON = function toJSON() {
                    return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                };

                /**
                 * Gets the default type url for ChannelID
                 * @function getTypeUrl
                 * @memberof api.wireless.v1.ChannelID
                 * @static
                 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                 * @returns {string} The default type url
                 */
                ChannelID.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                    if (typeUrlPrefix === undefined) {
                        typeUrlPrefix = "type.googleapis.com";
                    }
                    return typeUrlPrefix + "/api.wireless.v1.ChannelID";
                };

                return ChannelID;
            })();

            return v1;
        })();

        return wireless;
    })();

    return api;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Empty = (function() {

            /**
             * Properties of an Empty.
             * @memberof google.protobuf
             * @interface IEmpty
             */

            /**
             * Constructs a new Empty.
             * @memberof google.protobuf
             * @classdesc Represents an Empty.
             * @implements IEmpty
             * @constructor
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             */
            function Empty(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Empty instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty=} [properties] Properties to set
             * @returns {google.protobuf.Empty} Empty instance
             */
            Empty.create = function create(properties) {
                return new Empty(properties);
            };

            /**
             * Encodes the specified Empty message. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Empty message, length delimited. Does not implicitly {@link google.protobuf.Empty.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.IEmpty} message Empty message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Empty.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Empty message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Empty.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Empty();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Empty message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Empty
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Empty} Empty
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Empty.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Empty message.
             * @function verify
             * @memberof google.protobuf.Empty
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Empty.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates an Empty message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Empty
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Empty} Empty
             */
            Empty.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Empty)
                    return object;
                return new $root.google.protobuf.Empty();
            };

            /**
             * Creates a plain object from an Empty message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Empty
             * @static
             * @param {google.protobuf.Empty} message Empty
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Empty.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Empty to JSON.
             * @function toJSON
             * @memberof google.protobuf.Empty
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Empty.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Empty
             * @function getTypeUrl
             * @memberof google.protobuf.Empty
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Empty.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Empty";
            };

            return Empty;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
