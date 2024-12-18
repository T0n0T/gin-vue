/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const netctrl = $root.netctrl = (() => {

    /**
     * Namespace netctrl.
     * @exports netctrl
     * @namespace
     */
    const netctrl = {};

    netctrl.DeviceSpec = (function() {

        /**
         * Properties of a DeviceSpec.
         * @memberof netctrl
         * @interface IDeviceSpec
         * @property {string|null} [name] DeviceSpec name
         * @property {string|null} [mac] DeviceSpec mac
         * @property {netctrl.INetworkConfig|null} [config] DeviceSpec config
         */

        /**
         * Constructs a new DeviceSpec.
         * @memberof netctrl
         * @classdesc Represents a DeviceSpec.
         * @implements IDeviceSpec
         * @constructor
         * @param {netctrl.IDeviceSpec=} [properties] Properties to set
         */
        function DeviceSpec(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeviceSpec name.
         * @member {string} name
         * @memberof netctrl.DeviceSpec
         * @instance
         */
        DeviceSpec.prototype.name = "";

        /**
         * DeviceSpec mac.
         * @member {string} mac
         * @memberof netctrl.DeviceSpec
         * @instance
         */
        DeviceSpec.prototype.mac = "";

        /**
         * DeviceSpec config.
         * @member {netctrl.INetworkConfig|null|undefined} config
         * @memberof netctrl.DeviceSpec
         * @instance
         */
        DeviceSpec.prototype.config = null;

        /**
         * Creates a new DeviceSpec instance using the specified properties.
         * @function create
         * @memberof netctrl.DeviceSpec
         * @static
         * @param {netctrl.IDeviceSpec=} [properties] Properties to set
         * @returns {netctrl.DeviceSpec} DeviceSpec instance
         */
        DeviceSpec.create = function create(properties) {
            return new DeviceSpec(properties);
        };

        /**
         * Encodes the specified DeviceSpec message. Does not implicitly {@link netctrl.DeviceSpec.verify|verify} messages.
         * @function encode
         * @memberof netctrl.DeviceSpec
         * @static
         * @param {netctrl.IDeviceSpec} message DeviceSpec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceSpec.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
            if (message.mac != null && Object.hasOwnProperty.call(message, "mac"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.mac);
            if (message.config != null && Object.hasOwnProperty.call(message, "config"))
                $root.netctrl.NetworkConfig.encode(message.config, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DeviceSpec message, length delimited. Does not implicitly {@link netctrl.DeviceSpec.verify|verify} messages.
         * @function encodeDelimited
         * @memberof netctrl.DeviceSpec
         * @static
         * @param {netctrl.IDeviceSpec} message DeviceSpec message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceSpec.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeviceSpec message from the specified reader or buffer.
         * @function decode
         * @memberof netctrl.DeviceSpec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {netctrl.DeviceSpec} DeviceSpec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceSpec.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.netctrl.DeviceSpec();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.name = reader.string();
                        break;
                    }
                case 2: {
                        message.mac = reader.string();
                        break;
                    }
                case 3: {
                        message.config = $root.netctrl.NetworkConfig.decode(reader, reader.uint32());
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
         * Decodes a DeviceSpec message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof netctrl.DeviceSpec
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {netctrl.DeviceSpec} DeviceSpec
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceSpec.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeviceSpec message.
         * @function verify
         * @memberof netctrl.DeviceSpec
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeviceSpec.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            if (message.mac != null && message.hasOwnProperty("mac"))
                if (!$util.isString(message.mac))
                    return "mac: string expected";
            if (message.config != null && message.hasOwnProperty("config")) {
                let error = $root.netctrl.NetworkConfig.verify(message.config);
                if (error)
                    return "config." + error;
            }
            return null;
        };

        /**
         * Creates a DeviceSpec message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof netctrl.DeviceSpec
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {netctrl.DeviceSpec} DeviceSpec
         */
        DeviceSpec.fromObject = function fromObject(object) {
            if (object instanceof $root.netctrl.DeviceSpec)
                return object;
            let message = new $root.netctrl.DeviceSpec();
            if (object.name != null)
                message.name = String(object.name);
            if (object.mac != null)
                message.mac = String(object.mac);
            if (object.config != null) {
                if (typeof object.config !== "object")
                    throw TypeError(".netctrl.DeviceSpec.config: object expected");
                message.config = $root.netctrl.NetworkConfig.fromObject(object.config);
            }
            return message;
        };

        /**
         * Creates a plain object from a DeviceSpec message. Also converts values to other types if specified.
         * @function toObject
         * @memberof netctrl.DeviceSpec
         * @static
         * @param {netctrl.DeviceSpec} message DeviceSpec
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeviceSpec.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.name = "";
                object.mac = "";
                object.config = null;
            }
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            if (message.mac != null && message.hasOwnProperty("mac"))
                object.mac = message.mac;
            if (message.config != null && message.hasOwnProperty("config"))
                object.config = $root.netctrl.NetworkConfig.toObject(message.config, options);
            return object;
        };

        /**
         * Converts this DeviceSpec to JSON.
         * @function toJSON
         * @memberof netctrl.DeviceSpec
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeviceSpec.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DeviceSpec
         * @function getTypeUrl
         * @memberof netctrl.DeviceSpec
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DeviceSpec.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/netctrl.DeviceSpec";
        };

        return DeviceSpec;
    })();

    netctrl.NetworkConfig = (function() {

        /**
         * Properties of a NetworkConfig.
         * @memberof netctrl
         * @interface INetworkConfig
         * @property {boolean|null} [useDhcp] NetworkConfig useDhcp
         * @property {string|null} [gateway] NetworkConfig gateway
         * @property {string|null} [mask] NetworkConfig mask
         * @property {string|null} [ipAddress] NetworkConfig ipAddress
         */

        /**
         * Constructs a new NetworkConfig.
         * @memberof netctrl
         * @classdesc Represents a NetworkConfig.
         * @implements INetworkConfig
         * @constructor
         * @param {netctrl.INetworkConfig=} [properties] Properties to set
         */
        function NetworkConfig(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * NetworkConfig useDhcp.
         * @member {boolean} useDhcp
         * @memberof netctrl.NetworkConfig
         * @instance
         */
        NetworkConfig.prototype.useDhcp = false;

        /**
         * NetworkConfig gateway.
         * @member {string} gateway
         * @memberof netctrl.NetworkConfig
         * @instance
         */
        NetworkConfig.prototype.gateway = "";

        /**
         * NetworkConfig mask.
         * @member {string} mask
         * @memberof netctrl.NetworkConfig
         * @instance
         */
        NetworkConfig.prototype.mask = "";

        /**
         * NetworkConfig ipAddress.
         * @member {string} ipAddress
         * @memberof netctrl.NetworkConfig
         * @instance
         */
        NetworkConfig.prototype.ipAddress = "";

        /**
         * Creates a new NetworkConfig instance using the specified properties.
         * @function create
         * @memberof netctrl.NetworkConfig
         * @static
         * @param {netctrl.INetworkConfig=} [properties] Properties to set
         * @returns {netctrl.NetworkConfig} NetworkConfig instance
         */
        NetworkConfig.create = function create(properties) {
            return new NetworkConfig(properties);
        };

        /**
         * Encodes the specified NetworkConfig message. Does not implicitly {@link netctrl.NetworkConfig.verify|verify} messages.
         * @function encode
         * @memberof netctrl.NetworkConfig
         * @static
         * @param {netctrl.INetworkConfig} message NetworkConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NetworkConfig.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.useDhcp != null && Object.hasOwnProperty.call(message, "useDhcp"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.useDhcp);
            if (message.gateway != null && Object.hasOwnProperty.call(message, "gateway"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.gateway);
            if (message.mask != null && Object.hasOwnProperty.call(message, "mask"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.mask);
            if (message.ipAddress != null && Object.hasOwnProperty.call(message, "ipAddress"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.ipAddress);
            return writer;
        };

        /**
         * Encodes the specified NetworkConfig message, length delimited. Does not implicitly {@link netctrl.NetworkConfig.verify|verify} messages.
         * @function encodeDelimited
         * @memberof netctrl.NetworkConfig
         * @static
         * @param {netctrl.INetworkConfig} message NetworkConfig message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        NetworkConfig.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a NetworkConfig message from the specified reader or buffer.
         * @function decode
         * @memberof netctrl.NetworkConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {netctrl.NetworkConfig} NetworkConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NetworkConfig.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.netctrl.NetworkConfig();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.useDhcp = reader.bool();
                        break;
                    }
                case 2: {
                        message.gateway = reader.string();
                        break;
                    }
                case 3: {
                        message.mask = reader.string();
                        break;
                    }
                case 4: {
                        message.ipAddress = reader.string();
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
         * Decodes a NetworkConfig message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof netctrl.NetworkConfig
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {netctrl.NetworkConfig} NetworkConfig
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        NetworkConfig.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a NetworkConfig message.
         * @function verify
         * @memberof netctrl.NetworkConfig
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        NetworkConfig.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.useDhcp != null && message.hasOwnProperty("useDhcp"))
                if (typeof message.useDhcp !== "boolean")
                    return "useDhcp: boolean expected";
            if (message.gateway != null && message.hasOwnProperty("gateway"))
                if (!$util.isString(message.gateway))
                    return "gateway: string expected";
            if (message.mask != null && message.hasOwnProperty("mask"))
                if (!$util.isString(message.mask))
                    return "mask: string expected";
            if (message.ipAddress != null && message.hasOwnProperty("ipAddress"))
                if (!$util.isString(message.ipAddress))
                    return "ipAddress: string expected";
            return null;
        };

        /**
         * Creates a NetworkConfig message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof netctrl.NetworkConfig
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {netctrl.NetworkConfig} NetworkConfig
         */
        NetworkConfig.fromObject = function fromObject(object) {
            if (object instanceof $root.netctrl.NetworkConfig)
                return object;
            let message = new $root.netctrl.NetworkConfig();
            if (object.useDhcp != null)
                message.useDhcp = Boolean(object.useDhcp);
            if (object.gateway != null)
                message.gateway = String(object.gateway);
            if (object.mask != null)
                message.mask = String(object.mask);
            if (object.ipAddress != null)
                message.ipAddress = String(object.ipAddress);
            return message;
        };

        /**
         * Creates a plain object from a NetworkConfig message. Also converts values to other types if specified.
         * @function toObject
         * @memberof netctrl.NetworkConfig
         * @static
         * @param {netctrl.NetworkConfig} message NetworkConfig
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        NetworkConfig.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.useDhcp = false;
                object.gateway = "";
                object.mask = "";
                object.ipAddress = "";
            }
            if (message.useDhcp != null && message.hasOwnProperty("useDhcp"))
                object.useDhcp = message.useDhcp;
            if (message.gateway != null && message.hasOwnProperty("gateway"))
                object.gateway = message.gateway;
            if (message.mask != null && message.hasOwnProperty("mask"))
                object.mask = message.mask;
            if (message.ipAddress != null && message.hasOwnProperty("ipAddress"))
                object.ipAddress = message.ipAddress;
            return object;
        };

        /**
         * Converts this NetworkConfig to JSON.
         * @function toJSON
         * @memberof netctrl.NetworkConfig
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        NetworkConfig.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for NetworkConfig
         * @function getTypeUrl
         * @memberof netctrl.NetworkConfig
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        NetworkConfig.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/netctrl.NetworkConfig";
        };

        return NetworkConfig;
    })();

    netctrl.DeviceHandle = (function() {

        /**
         * Properties of a DeviceHandle.
         * @memberof netctrl
         * @interface IDeviceHandle
         * @property {string|null} [mac] DeviceHandle mac
         */

        /**
         * Constructs a new DeviceHandle.
         * @memberof netctrl
         * @classdesc Represents a DeviceHandle.
         * @implements IDeviceHandle
         * @constructor
         * @param {netctrl.IDeviceHandle=} [properties] Properties to set
         */
        function DeviceHandle(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeviceHandle mac.
         * @member {string} mac
         * @memberof netctrl.DeviceHandle
         * @instance
         */
        DeviceHandle.prototype.mac = "";

        /**
         * Creates a new DeviceHandle instance using the specified properties.
         * @function create
         * @memberof netctrl.DeviceHandle
         * @static
         * @param {netctrl.IDeviceHandle=} [properties] Properties to set
         * @returns {netctrl.DeviceHandle} DeviceHandle instance
         */
        DeviceHandle.create = function create(properties) {
            return new DeviceHandle(properties);
        };

        /**
         * Encodes the specified DeviceHandle message. Does not implicitly {@link netctrl.DeviceHandle.verify|verify} messages.
         * @function encode
         * @memberof netctrl.DeviceHandle
         * @static
         * @param {netctrl.IDeviceHandle} message DeviceHandle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceHandle.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mac != null && Object.hasOwnProperty.call(message, "mac"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.mac);
            return writer;
        };

        /**
         * Encodes the specified DeviceHandle message, length delimited. Does not implicitly {@link netctrl.DeviceHandle.verify|verify} messages.
         * @function encodeDelimited
         * @memberof netctrl.DeviceHandle
         * @static
         * @param {netctrl.IDeviceHandle} message DeviceHandle message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceHandle.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeviceHandle message from the specified reader or buffer.
         * @function decode
         * @memberof netctrl.DeviceHandle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {netctrl.DeviceHandle} DeviceHandle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceHandle.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.netctrl.DeviceHandle();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.mac = reader.string();
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
         * Decodes a DeviceHandle message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof netctrl.DeviceHandle
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {netctrl.DeviceHandle} DeviceHandle
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceHandle.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeviceHandle message.
         * @function verify
         * @memberof netctrl.DeviceHandle
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeviceHandle.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mac != null && message.hasOwnProperty("mac"))
                if (!$util.isString(message.mac))
                    return "mac: string expected";
            return null;
        };

        /**
         * Creates a DeviceHandle message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof netctrl.DeviceHandle
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {netctrl.DeviceHandle} DeviceHandle
         */
        DeviceHandle.fromObject = function fromObject(object) {
            if (object instanceof $root.netctrl.DeviceHandle)
                return object;
            let message = new $root.netctrl.DeviceHandle();
            if (object.mac != null)
                message.mac = String(object.mac);
            return message;
        };

        /**
         * Creates a plain object from a DeviceHandle message. Also converts values to other types if specified.
         * @function toObject
         * @memberof netctrl.DeviceHandle
         * @static
         * @param {netctrl.DeviceHandle} message DeviceHandle
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeviceHandle.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.mac = "";
            if (message.mac != null && message.hasOwnProperty("mac"))
                object.mac = message.mac;
            return object;
        };

        /**
         * Converts this DeviceHandle to JSON.
         * @function toJSON
         * @memberof netctrl.DeviceHandle
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeviceHandle.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for DeviceHandle
         * @function getTypeUrl
         * @memberof netctrl.DeviceHandle
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        DeviceHandle.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/netctrl.DeviceHandle";
        };

        return DeviceHandle;
    })();

    netctrl.ConnectData = (function() {

        /**
         * Properties of a ConnectData.
         * @memberof netctrl
         * @interface IConnectData
         * @property {string|null} [url] ConnectData url
         * @property {string|null} [proxyUrl] ConnectData proxyUrl
         * @property {string|null} [spec] ConnectData spec
         */

        /**
         * Constructs a new ConnectData.
         * @memberof netctrl
         * @classdesc Represents a ConnectData.
         * @implements IConnectData
         * @constructor
         * @param {netctrl.IConnectData=} [properties] Properties to set
         */
        function ConnectData(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ConnectData url.
         * @member {string} url
         * @memberof netctrl.ConnectData
         * @instance
         */
        ConnectData.prototype.url = "";

        /**
         * ConnectData proxyUrl.
         * @member {string} proxyUrl
         * @memberof netctrl.ConnectData
         * @instance
         */
        ConnectData.prototype.proxyUrl = "";

        /**
         * ConnectData spec.
         * @member {string} spec
         * @memberof netctrl.ConnectData
         * @instance
         */
        ConnectData.prototype.spec = "";

        /**
         * Creates a new ConnectData instance using the specified properties.
         * @function create
         * @memberof netctrl.ConnectData
         * @static
         * @param {netctrl.IConnectData=} [properties] Properties to set
         * @returns {netctrl.ConnectData} ConnectData instance
         */
        ConnectData.create = function create(properties) {
            return new ConnectData(properties);
        };

        /**
         * Encodes the specified ConnectData message. Does not implicitly {@link netctrl.ConnectData.verify|verify} messages.
         * @function encode
         * @memberof netctrl.ConnectData
         * @static
         * @param {netctrl.IConnectData} message ConnectData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConnectData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.url);
            if (message.proxyUrl != null && Object.hasOwnProperty.call(message, "proxyUrl"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.proxyUrl);
            if (message.spec != null && Object.hasOwnProperty.call(message, "spec"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.spec);
            return writer;
        };

        /**
         * Encodes the specified ConnectData message, length delimited. Does not implicitly {@link netctrl.ConnectData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof netctrl.ConnectData
         * @static
         * @param {netctrl.IConnectData} message ConnectData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ConnectData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ConnectData message from the specified reader or buffer.
         * @function decode
         * @memberof netctrl.ConnectData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {netctrl.ConnectData} ConnectData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConnectData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.netctrl.ConnectData();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.url = reader.string();
                        break;
                    }
                case 2: {
                        message.proxyUrl = reader.string();
                        break;
                    }
                case 3: {
                        message.spec = reader.string();
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
         * Decodes a ConnectData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof netctrl.ConnectData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {netctrl.ConnectData} ConnectData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ConnectData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ConnectData message.
         * @function verify
         * @memberof netctrl.ConnectData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ConnectData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.proxyUrl != null && message.hasOwnProperty("proxyUrl"))
                if (!$util.isString(message.proxyUrl))
                    return "proxyUrl: string expected";
            if (message.spec != null && message.hasOwnProperty("spec"))
                if (!$util.isString(message.spec))
                    return "spec: string expected";
            return null;
        };

        /**
         * Creates a ConnectData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof netctrl.ConnectData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {netctrl.ConnectData} ConnectData
         */
        ConnectData.fromObject = function fromObject(object) {
            if (object instanceof $root.netctrl.ConnectData)
                return object;
            let message = new $root.netctrl.ConnectData();
            if (object.url != null)
                message.url = String(object.url);
            if (object.proxyUrl != null)
                message.proxyUrl = String(object.proxyUrl);
            if (object.spec != null)
                message.spec = String(object.spec);
            return message;
        };

        /**
         * Creates a plain object from a ConnectData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof netctrl.ConnectData
         * @static
         * @param {netctrl.ConnectData} message ConnectData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ConnectData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.url = "";
                object.proxyUrl = "";
                object.spec = "";
            }
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            if (message.proxyUrl != null && message.hasOwnProperty("proxyUrl"))
                object.proxyUrl = message.proxyUrl;
            if (message.spec != null && message.hasOwnProperty("spec"))
                object.spec = message.spec;
            return object;
        };

        /**
         * Converts this ConnectData to JSON.
         * @function toJSON
         * @memberof netctrl.ConnectData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ConnectData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ConnectData
         * @function getTypeUrl
         * @memberof netctrl.ConnectData
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ConnectData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/netctrl.ConnectData";
        };

        return ConnectData;
    })();

    return netctrl;
})();

export { $root as default };
