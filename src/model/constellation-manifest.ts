import { CoatyObject } from "@coaty/core";
import { ConstellationServiceContext } from "./constellation-declaration";

export interface ConstellationManifest extends CoatyObject {
    displayName: string;
    serviceIdentity: string;
    serviceContext: ConstellationServiceContext[];
}
