import { CookieAttributes, CookieAttributesConfig, CookieCodecConfig, CookieDecoding, CookieEncoding } from '../types/index';
export declare const DEFAULT_CODEC: CookieCodecConfig<string | number | boolean | undefined | null, string>;
export declare const DEFAULT_ATTRIBUTES: CookieAttributesConfig;
export declare function setCookie<T extends string | number | boolean | undefined | null>(name: string, value: T): string;
export declare function setCookie<T extends string | number | boolean | undefined | null>(name: string, value: T, attributes: CookieAttributes): string;
export declare function setCookie<T extends {}>(name: string, value: T, attributes: CookieAttributes | undefined, { encodeValue, encodeName }: CookieEncoding<T>): string;
export declare function getCookie(name: string): string | undefined;
export declare function getCookie<T extends {}>(name: string, { decodeValue, decodeName }: CookieDecoding<T>): T | undefined;
export declare function getCookies(): {
    [property: string]: string;
};
export declare function getCookies<T extends {}>({ decodeValue, decodeName }: CookieDecoding<T>): {
    [property: string]: T;
};
export declare function removeCookie(name: string, attributes?: CookieAttributes): void;
