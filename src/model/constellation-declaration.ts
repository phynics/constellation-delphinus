
export type ConstellationValueType = "string" | "number" | "boolean";

export interface ConstellationServiceContextType {
    list?: [ConstellationServiceContext];
    item?: ConstellationValueType;
}

export interface ConstellationServiceContext {
    displayName: string;
    contextName: string;
    type: ConstellationServiceContextType;
}
