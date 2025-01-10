
let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextEncoder, TextDecoder } = require(`util`);

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_4.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_4.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachedUint16ArrayMemory0 = null;

function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

function passArray16ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 2, 2) >>> 0;
    getUint16ArrayMemory0().set(arg, ptr / 2);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
 * @param {MessageType} message_type
 * @param {any} signed_messages
 * @param {Uint16Array} signer_indices
 * @returns {any}
 */
module.exports.from_signed_messages_and_indices = function(message_type, signed_messages, signer_indices) {
    const ptr0 = passArray16ToWasm0(signer_indices, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.from_signed_messages_and_indices(message_type, signed_messages, ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
};

/**
 * @param {Uint8Array} signature
 * @param {Uint8Array} public_key
 * @param {Uint8Array} msg
 * @returns {boolean}
 */
module.exports.bls12381_min_pk_verify = function(signature, public_key, msg) {
    const ptr0 = passArray8ToWasm0(signature, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(public_key, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArray8ToWasm0(msg, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ret = wasm.bls12381_min_pk_verify(ptr0, len0, ptr1, len1, ptr2, len2);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] !== 0;
};

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
 * Aggregate a list of signatures.
 * The signatures must be of the type Vec<Vec<u8>> with each signature being a 96 bytes long serialized signature.
 * @param {any} signatures
 * @returns {Uint8Array}
 */
module.exports.bls12381_min_pk_aggregate = function(signatures) {
    const ret = wasm.bls12381_min_pk_aggregate(signatures);
    if (ret[3]) {
        throw takeFromExternrefTable0(ret[2]);
    }
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
};

/**
 * Verify an aggregate signature.
 * @param {any} public_keys
 * @param {Uint8Array} msg
 * @param {Uint8Array} signature
 * @returns {boolean}
 */
module.exports.bls12381_min_pk_verify_aggregate = function(public_keys, msg, signature) {
    const ptr0 = passArray8ToWasm0(msg, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArray8ToWasm0(signature, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.bls12381_min_pk_verify_aggregate(public_keys, ptr0, len0, ptr1, len1);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] !== 0;
};

/**
 * @param {Uint8Array} msg
 * @returns {Uint8Array}
 */
module.exports.blake2b256 = function(msg) {
    const ptr0 = passArray8ToWasm0(msg, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.blake2b256(ptr0, len0);
    var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v2;
};

/**
 * The message type for the [ProtocolMessageCertificate].
 * @enum {0 | 1}
 */
module.exports.MessageType = Object.freeze({
    /**
     * Corresponds to [Confirmation]
     */
    Confirmation: 0, "0": "Confirmation",
    /**
     * Corresponds to [InvalidBlobIdMsg]
     */
    InvalidBlobIdMsg: 1, "1": "InvalidBlobIdMsg",
});

const BlobEncoderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blobencoder_free(ptr >>> 0, 1));

class BlobEncoder {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BlobEncoderFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blobencoder_free(ptr, 0);
    }
    /**
     * @param {number} n_shards
     */
    constructor(n_shards) {
        const ret = wasm.blobencoder_new(n_shards);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        BlobEncoderFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * WASM wrapper for [walrus_core::encoding::blob_encoding::BlobEncoder::encode].
     * Returns a vector of [walrus_core::encoding::slivers::SliverPair]´s.
     * @param {Uint8Array} data
     * @returns {any}
     */
    encode(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blobencoder_encode(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * WASM wrapper for [walrus_core::encoding::blob_encoding::BlobEncoder::encode_with_metadata].
     * Returns a tuple with a vector of [walrus_core::encoding::slivers::SliverPair]´s and a [walrus_core::metadata::VerifiedBlobMetadataWithId]`.
     * @param {Uint8Array} data
     * @returns {any}
     */
    encode_with_metadata(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blobencoder_encode_with_metadata(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * WASM wrapper for [walrus_core::encoding::blob_encoding::BlobEncoder::compute_metadata].
     * Returns [walrus_core::metadata::VerifiedBlobMetadataWithId].
     * @param {Uint8Array} data
     * @returns {any}
     */
    compute_metadata(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blobencoder_compute_metadata(this.__wbg_ptr, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * WASM wrapper for [walrus_core::encoding::blob_encoding::BlobEncoder::decode].
     * The input `slivers` is expected to be a `Vec<SliverData<Primary>>`.
     * See also [BlobEncoder::decode_secondary].
     * Returns `Vec<u8>`.
     * @param {bigint} blob_size
     * @param {any} slivers
     * @returns {any}
     */
    decode_primary(blob_size, slivers) {
        const ret = wasm.blobencoder_decode_primary(this.__wbg_ptr, blob_size, slivers);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * WASM wrapper for [walrus_core::encoding::blob_encoding::BlobEncoder::decode].
     * The input `slivers` is expected to be a `Vec<SliverData<Secondary>>`.
     * See also [BlobEncoder::decode_primary].
     * Returns `Vec<u8>`.
     * @param {bigint} blob_size
     * @param {any} slivers
     * @returns {any}
     */
    decode_secondary(blob_size, slivers) {
        const ret = wasm.blobencoder_decode_secondary(this.__wbg_ptr, blob_size, slivers);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
}
module.exports.BlobEncoder = BlobEncoder;

module.exports.__wbg_String_fed4d24b68977888 = function(arg0, arg1) {
    const ret = String(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

module.exports.__wbg_buffer_61b7ce01341d7f88 = function(arg0) {
    const ret = arg0.buffer;
    return ret;
};

module.exports.__wbg_call_b0d8e36992d9900d = function() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };

module.exports.__wbg_done_f22c1561fa919baa = function(arg0) {
    const ret = arg0.done;
    return ret;
};

module.exports.__wbg_get_9aa3dff3f0266054 = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
};

module.exports.__wbg_get_bbccf8970793c087 = function() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments) };

module.exports.__wbg_getwithrefkey_bb8f74a92cb2e784 = function(arg0, arg1) {
    const ret = arg0[arg1];
    return ret;
};

module.exports.__wbg_instanceof_ArrayBuffer_670ddde44cdb2602 = function(arg0) {
    let result;
    try {
        result = arg0 instanceof ArrayBuffer;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_instanceof_Uint8Array_28af5bc19d6acad8 = function(arg0) {
    let result;
    try {
        result = arg0 instanceof Uint8Array;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
};

module.exports.__wbg_isArray_1ba11a930108ec51 = function(arg0) {
    const ret = Array.isArray(arg0);
    return ret;
};

module.exports.__wbg_isSafeInteger_12f5549b2fca23f4 = function(arg0) {
    const ret = Number.isSafeInteger(arg0);
    return ret;
};

module.exports.__wbg_iterator_23604bb983791576 = function() {
    const ret = Symbol.iterator;
    return ret;
};

module.exports.__wbg_length_65d1cd11729ced11 = function(arg0) {
    const ret = arg0.length;
    return ret;
};

module.exports.__wbg_length_d65cf0786bfc5739 = function(arg0) {
    const ret = arg0.length;
    return ret;
};

module.exports.__wbg_new_254fa9eac11932ae = function() {
    const ret = new Array();
    return ret;
};

module.exports.__wbg_new_3ff5b33b1ce712df = function(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};

module.exports.__wbg_new_688846f374351c92 = function() {
    const ret = new Object();
    return ret;
};

module.exports.__wbg_next_01dd9234a5bf6d05 = function() { return handleError(function (arg0) {
    const ret = arg0.next();
    return ret;
}, arguments) };

module.exports.__wbg_next_137428deb98342b0 = function(arg0) {
    const ret = arg0.next;
    return ret;
};

module.exports.__wbg_set_1d80752d0d5f0b21 = function(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
};

module.exports.__wbg_set_23d69db4e5c66a6e = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};

module.exports.__wbg_set_3fda3bac07393de4 = function(arg0, arg1, arg2) {
    arg0[arg1] = arg2;
};

module.exports.__wbg_value_4c32fd138a88eee2 = function(arg0) {
    const ret = arg0.value;
    return ret;
};

module.exports.__wbindgen_bigint_from_u64 = function(arg0) {
    const ret = BigInt.asUintN(64, arg0);
    return ret;
};

module.exports.__wbindgen_boolean_get = function(arg0) {
    const v = arg0;
    const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
    return ret;
};

module.exports.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

module.exports.__wbindgen_error_new = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return ret;
};

module.exports.__wbindgen_in = function(arg0, arg1) {
    const ret = arg0 in arg1;
    return ret;
};

module.exports.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_4;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

module.exports.__wbindgen_is_function = function(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
};

module.exports.__wbindgen_is_object = function(arg0) {
    const val = arg0;
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
};

module.exports.__wbindgen_is_undefined = function(arg0) {
    const ret = arg0 === undefined;
    return ret;
};

module.exports.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
    const ret = arg0 == arg1;
    return ret;
};

module.exports.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return ret;
};

module.exports.__wbindgen_number_get = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
};

module.exports.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return ret;
};

module.exports.__wbindgen_string_get = function(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};

module.exports.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

const path = require('path').join(__dirname, 'walrus_wasm_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

wasm.__wbindgen_start();

