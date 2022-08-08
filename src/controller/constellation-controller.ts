import { AdvertiseEvent, ObjectLifecycleController, ResolveEvent } from "@coaty/core";
import { NodeUtils } from "@coaty/core/runtime-node";
import { Subscription } from "rxjs";
import { filter } from "rxjs/operators";
import { ConstellationManifest } from "../model/constellation-manifest";

export class ConstellationController extends ObjectLifecycleController {
    public readonly constellationManifest: ConstellationManifest = {
        displayName: "Constellation Service Name",
        serviceIdentity: "Information regarding the instance, for when multiple instances of the same service is running.",
        serviceContext: [],
        objectType: "constellation.manifest",
        coreType: "CoatyObject",
        objectId: "8e5e4dca-88f7-4870-a04a-bf8476e8d7a0",
        parentObjectId: this.container.identity.objectId,
        name: "ConstellationManifest",
    };

    private _discoverSubscription: Subscription;

    onCommunicationManagerStarting() {
        super.onCommunicationManagerStarting();

        NodeUtils.logInfo("ConstellationController.onCommunicationManagerStarting ");
        NodeUtils.logInfo("Manifest: " +  JSON.stringify(this.constellationManifest));

        this.advertiseDiscoverableObject(this.constellationManifest);
    }

    onCommunicationManagerStopping() {
        super.onCommunicationManagerStopping();
        NodeUtils.logInfo("DelphinusController.onCommunicationManagerStopping");
    }
}
