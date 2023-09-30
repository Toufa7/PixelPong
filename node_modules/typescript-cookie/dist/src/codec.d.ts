import { Decoder, Encoder } from '../types/index';
export declare const encodeName: Encoder<string>;
export declare const encodeValue: Encoder<string | number | boolean | undefined | null>;
export declare const decodeName: Decoder<string>;
export declare const decodeValue: Decoder<string>;
