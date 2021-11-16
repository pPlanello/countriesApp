export interface Col {
    field: string;
    title: string;
    type: ColType
    placeholder?: string;
    disabled?: boolean;
    isIndex?: boolean;
    router?: string;
    subField?: string;
}

export enum ColType {
    DATE,
    NUMBER,
    TEXT,
    ARRAY, // [{ any: string }, ...]
    BOOL,
    INDEX,
    IMAGE,
    ROUTER
  }