export interface Region {
    name:         Name;
    tld?:         string[];
    cca2:         string;
    ccn3?:        string;
    cca3:         string;
    independent?: boolean;
    status:       Status;
    unMember:     boolean;
    currencies:   Currencies;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       RegionElement;
    subregion:    Subregion;
    languages:    Languages;
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    car:          Car;
    timezones:    string[];
    continents:   RegionElement[];
    flags:        CoatOfArms;
    coatOfArms:   CoatOfArms;
    startOfWeek:  StartOfWeek;
    capitalInfo:  CapitalInfo;
    postalCode?:  PostalCode;
    cioc?:        string;
    borders?:     string[];
    gini?:        { [key: string]: number };
    fifa?:        string;
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    signs: string[];
    side:  Side;
}

export enum Side {
    Left = "left",
    Right = "right",
}

export interface CoatOfArms {
    png?: string;
    svg?: string;
}

export enum RegionElement {
    Europe = "Europe",
}

export interface Currencies {
    GBP?: All;
    JEP?: All;
    DKK?: All;
    BGN?: All;
    EUR?: All;
    GIP?: All;
    IMP?: All;
    RSD?: All;
    MDL?: All;
    BAM?: BAM;
    NOK?: All;
    FOK?: All;
    CHF?: All;
    UAH?: All;
    CZK?: All;
    RON?: All;
    BYN?: All;
    HRK?: All;
    RUB?: All;
    SEK?: All;
    PLN?: All;
    ALL?: All;
    ISK?: All;
    GGP?: All;
    MKD?: All;
    HUF?: All;
}

export interface All {
    name:   string;
    symbol: string;
}

export interface BAM {
    name: string;
}

export interface Demonyms {
    eng:  Eng;
    fra?: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Languages {
    eng?: string;
    fra?: string;
    nrf?: string;
    dan?: string;
    bul?: string;
    por?: string;
    glv?: string;
    cnr?: string;
    ita?: string;
    srp?: string;
    slk?: string;
    ron?: string;
    sqi?: string;
    lat?: string;
    bos?: string;
    hrv?: string;
    nno?: string;
    nob?: string;
    smi?: string;
    gle?: string;
    fao?: string;
    nor?: string;
    slv?: string;
    gsw?: string;
    roh?: string;
    bar?: string;
    ukr?: string;
    ces?: string;
    lit?: string;
    swe?: string;
    mlt?: string;
    ell?: string;
    tur?: string;
    bel?: string;
    rus?: string;
    fin?: string;
    est?: string;
    pol?: string;
    deu?: string;
    nld?: string;
    isl?: string;
    cat?: string;
    ltz?: string;
    nfr?: string;
    mkd?: string;
    spa?: string;
    lav?: string;
    hun?: string;
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: { [key: string]: Translation };
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: string;
    regex:  string;
}

export enum StartOfWeek {
    Monday = "monday",
}

export enum Status {
    OfficiallyAssigned = "officially-assigned",
    UserAssigned = "user-assigned",
}

export enum Subregion {
    CentralEurope = "Central Europe",
    EasternEurope = "Eastern Europe",
    NorthernEurope = "Northern Europe",
    SoutheastEurope = "Southeast Europe",
    SouthernEurope = "Southern Europe",
    WesternEurope = "Western Europe",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toRegion(json: string): Region[] {
        return cast(JSON.parse(json), a(r("Region")));
    }

    public static regionToJson(value: Region[]): string {
        return JSON.stringify(uncast(value, a(r("Region"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Region": o([
        { json: "name", js: "name", typ: r("Name") },
        { json: "tld", js: "tld", typ: u(undefined, a("")) },
        { json: "cca2", js: "cca2", typ: "" },
        { json: "ccn3", js: "ccn3", typ: u(undefined, "") },
        { json: "cca3", js: "cca3", typ: "" },
        { json: "independent", js: "independent", typ: u(undefined, true) },
        { json: "status", js: "status", typ: r("Status") },
        { json: "unMember", js: "unMember", typ: true },
        { json: "currencies", js: "currencies", typ: r("Currencies") },
        { json: "idd", js: "idd", typ: r("Idd") },
        { json: "capital", js: "capital", typ: a("") },
        { json: "altSpellings", js: "altSpellings", typ: a("") },
        { json: "region", js: "region", typ: r("RegionElement") },
        { json: "subregion", js: "subregion", typ: r("Subregion") },
        { json: "languages", js: "languages", typ: r("Languages") },
        { json: "translations", js: "translations", typ: m(r("Translation")) },
        { json: "latlng", js: "latlng", typ: a(3.14) },
        { json: "landlocked", js: "landlocked", typ: true },
        { json: "area", js: "area", typ: 3.14 },
        { json: "demonyms", js: "demonyms", typ: r("Demonyms") },
        { json: "flag", js: "flag", typ: "" },
        { json: "maps", js: "maps", typ: r("Maps") },
        { json: "population", js: "population", typ: 0 },
        { json: "car", js: "car", typ: r("Car") },
        { json: "timezones", js: "timezones", typ: a("") },
        { json: "continents", js: "continents", typ: a(r("RegionElement")) },
        { json: "flags", js: "flags", typ: r("CoatOfArms") },
        { json: "coatOfArms", js: "coatOfArms", typ: r("CoatOfArms") },
        { json: "startOfWeek", js: "startOfWeek", typ: r("StartOfWeek") },
        { json: "capitalInfo", js: "capitalInfo", typ: r("CapitalInfo") },
        { json: "postalCode", js: "postalCode", typ: u(undefined, r("PostalCode")) },
        { json: "cioc", js: "cioc", typ: u(undefined, "") },
        { json: "borders", js: "borders", typ: u(undefined, a("")) },
        { json: "gini", js: "gini", typ: u(undefined, m(3.14)) },
        { json: "fifa", js: "fifa", typ: u(undefined, "") },
    ], false),
    "CapitalInfo": o([
        { json: "latlng", js: "latlng", typ: a(3.14) },
    ], false),
    "Car": o([
        { json: "signs", js: "signs", typ: a("") },
        { json: "side", js: "side", typ: r("Side") },
    ], false),
    "CoatOfArms": o([
        { json: "png", js: "png", typ: u(undefined, "") },
        { json: "svg", js: "svg", typ: u(undefined, "") },
    ], false),
    "Currencies": o([
        { json: "GBP", js: "GBP", typ: u(undefined, r("All")) },
        { json: "JEP", js: "JEP", typ: u(undefined, r("All")) },
        { json: "DKK", js: "DKK", typ: u(undefined, r("All")) },
        { json: "BGN", js: "BGN", typ: u(undefined, r("All")) },
        { json: "EUR", js: "EUR", typ: u(undefined, r("All")) },
        { json: "GIP", js: "GIP", typ: u(undefined, r("All")) },
        { json: "IMP", js: "IMP", typ: u(undefined, r("All")) },
        { json: "RSD", js: "RSD", typ: u(undefined, r("All")) },
        { json: "MDL", js: "MDL", typ: u(undefined, r("All")) },
        { json: "BAM", js: "BAM", typ: u(undefined, r("BAM")) },
        { json: "NOK", js: "NOK", typ: u(undefined, r("All")) },
        { json: "FOK", js: "FOK", typ: u(undefined, r("All")) },
        { json: "CHF", js: "CHF", typ: u(undefined, r("All")) },
        { json: "UAH", js: "UAH", typ: u(undefined, r("All")) },
        { json: "CZK", js: "CZK", typ: u(undefined, r("All")) },
        { json: "RON", js: "RON", typ: u(undefined, r("All")) },
        { json: "BYN", js: "BYN", typ: u(undefined, r("All")) },
        { json: "HRK", js: "HRK", typ: u(undefined, r("All")) },
        { json: "RUB", js: "RUB", typ: u(undefined, r("All")) },
        { json: "SEK", js: "SEK", typ: u(undefined, r("All")) },
        { json: "PLN", js: "PLN", typ: u(undefined, r("All")) },
        { json: "ALL", js: "ALL", typ: u(undefined, r("All")) },
        { json: "ISK", js: "ISK", typ: u(undefined, r("All")) },
        { json: "GGP", js: "GGP", typ: u(undefined, r("All")) },
        { json: "MKD", js: "MKD", typ: u(undefined, r("All")) },
        { json: "HUF", js: "HUF", typ: u(undefined, r("All")) },
    ], false),
    "All": o([
        { json: "name", js: "name", typ: "" },
        { json: "symbol", js: "symbol", typ: "" },
    ], false),
    "BAM": o([
        { json: "name", js: "name", typ: "" },
    ], false),
    "Demonyms": o([
        { json: "eng", js: "eng", typ: r("Eng") },
        { json: "fra", js: "fra", typ: u(undefined, r("Eng")) },
    ], false),
    "Eng": o([
        { json: "f", js: "f", typ: "" },
        { json: "m", js: "m", typ: "" },
    ], false),
    "Idd": o([
        { json: "root", js: "root", typ: "" },
        { json: "suffixes", js: "suffixes", typ: a("") },
    ], false),
    "Languages": o([
        { json: "eng", js: "eng", typ: u(undefined, "") },
        { json: "fra", js: "fra", typ: u(undefined, "") },
        { json: "nrf", js: "nrf", typ: u(undefined, "") },
        { json: "dan", js: "dan", typ: u(undefined, "") },
        { json: "bul", js: "bul", typ: u(undefined, "") },
        { json: "por", js: "por", typ: u(undefined, "") },
        { json: "glv", js: "glv", typ: u(undefined, "") },
        { json: "cnr", js: "cnr", typ: u(undefined, "") },
        { json: "ita", js: "ita", typ: u(undefined, "") },
        { json: "srp", js: "srp", typ: u(undefined, "") },
        { json: "slk", js: "slk", typ: u(undefined, "") },
        { json: "ron", js: "ron", typ: u(undefined, "") },
        { json: "sqi", js: "sqi", typ: u(undefined, "") },
        { json: "lat", js: "lat", typ: u(undefined, "") },
        { json: "bos", js: "bos", typ: u(undefined, "") },
        { json: "hrv", js: "hrv", typ: u(undefined, "") },
        { json: "nno", js: "nno", typ: u(undefined, "") },
        { json: "nob", js: "nob", typ: u(undefined, "") },
        { json: "smi", js: "smi", typ: u(undefined, "") },
        { json: "gle", js: "gle", typ: u(undefined, "") },
        { json: "fao", js: "fao", typ: u(undefined, "") },
        { json: "nor", js: "nor", typ: u(undefined, "") },
        { json: "slv", js: "slv", typ: u(undefined, "") },
        { json: "gsw", js: "gsw", typ: u(undefined, "") },
        { json: "roh", js: "roh", typ: u(undefined, "") },
        { json: "bar", js: "bar", typ: u(undefined, "") },
        { json: "ukr", js: "ukr", typ: u(undefined, "") },
        { json: "ces", js: "ces", typ: u(undefined, "") },
        { json: "lit", js: "lit", typ: u(undefined, "") },
        { json: "swe", js: "swe", typ: u(undefined, "") },
        { json: "mlt", js: "mlt", typ: u(undefined, "") },
        { json: "ell", js: "ell", typ: u(undefined, "") },
        { json: "tur", js: "tur", typ: u(undefined, "") },
        { json: "bel", js: "bel", typ: u(undefined, "") },
        { json: "rus", js: "rus", typ: u(undefined, "") },
        { json: "fin", js: "fin", typ: u(undefined, "") },
        { json: "est", js: "est", typ: u(undefined, "") },
        { json: "pol", js: "pol", typ: u(undefined, "") },
        { json: "deu", js: "deu", typ: u(undefined, "") },
        { json: "nld", js: "nld", typ: u(undefined, "") },
        { json: "isl", js: "isl", typ: u(undefined, "") },
        { json: "cat", js: "cat", typ: u(undefined, "") },
        { json: "ltz", js: "ltz", typ: u(undefined, "") },
        { json: "nfr", js: "nfr", typ: u(undefined, "") },
        { json: "mkd", js: "mkd", typ: u(undefined, "") },
        { json: "spa", js: "spa", typ: u(undefined, "") },
        { json: "lav", js: "lav", typ: u(undefined, "") },
        { json: "hun", js: "hun", typ: u(undefined, "") },
    ], false),
    "Maps": o([
        { json: "googleMaps", js: "googleMaps", typ: "" },
        { json: "openStreetMaps", js: "openStreetMaps", typ: "" },
    ], false),
    "Name": o([
        { json: "common", js: "common", typ: "" },
        { json: "official", js: "official", typ: "" },
        { json: "nativeName", js: "nativeName", typ: m(r("Translation")) },
    ], false),
    "Translation": o([
        { json: "official", js: "official", typ: "" },
        { json: "common", js: "common", typ: "" },
    ], false),
    "PostalCode": o([
        { json: "format", js: "format", typ: "" },
        { json: "regex", js: "regex", typ: "" },
    ], false),
    "Side": [
        "left",
        "right",
    ],
    "RegionElement": [
        "Europe",
    ],
    "StartOfWeek": [
        "monday",
    ],
    "Status": [
        "officially-assigned",
        "user-assigned",
    ],
    "Subregion": [
        "Central Europe",
        "Eastern Europe",
        "Northern Europe",
        "Southeast Europe",
        "Southern Europe",
        "Western Europe",
    ],
};
