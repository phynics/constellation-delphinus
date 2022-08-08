import { Controller, ReturnEvent } from "@coaty/core";
import { NodeUtils } from "@coaty/core/runtime-node";
import { ConstellationManifest } from "../model/constellation-manifest";
import { ConstellationController } from "./constellation-controller";

export class DelphinusTestController extends ConstellationController {

    toggleActionState: boolean = false;

    multipleChoiceActionOptions: string[] = ["red", "blue", "green"];
    multipleChoiceActionState: string;

    override constellationManifest: ConstellationManifest = {
        displayName: "Delphinus Proof of Concept",
        serviceIdentity: "-",
        serviceContext: [
            {
                contextName: "constellation.delphinus.testList",
                displayName: "Delphinus Test List",
                type: {
                    list: [
                    {
                        contextName: "constellation.delphinus.testList.item",
                        displayName: "List item",
                        type: { item: "string" },
                    },
                 ],
                },
            },
        ],
        objectType: "constellation.manifest",
        coreType: "CoatyObject",
        objectId: "5abafee4-37a6-4b46-9b2e-68ac0e1e505b",
        parentObjectId: this.container.identity.objectId,
        name: "TestControllerManifest",
    } as ConstellationManifest;
    
    simpleAction: () => void = () => NodeUtils.logEvent("SimpleActionTriggered");
    toggleAction: (newState: boolean) => boolean = newState => {
        this.toggleActionState = newState;
        return this.toggleActionState;
    }
    multipleChoiceAction: (newState: string) => string = newState => {
        this.multipleChoiceActionState = newState;
        return newState;
    }

    onCommunicationManagerStarting() {
        super.onCommunicationManagerStarting();

        NodeUtils.logInfo("DelphinusTestController.onCommunicationManagerStarting");
    }

    onCommunicationManagerStopping() {
        super.onCommunicationManagerStopping();

        NodeUtils.logInfo("DelphinusTestController.onCommunicationManagerStopping");
    }

    private _observeCommands() {
        this.communicationManager.observeCall("constellation.delphinus.simple")
        .subscribe(callEvent => {
            this.simpleAction();
            callEvent.returnEvent(ReturnEvent.withResult(true));
        });

        this.communicationManager.observeCall("constellation.delphinus.toggle")
        .subscribe(callEvent => {
            const newState: boolean = callEvent.data.getParameterByName("New State") as boolean;
            this.toggleAction(newState);
            callEvent.returnEvent(ReturnEvent.withResult(newState));
        });

        this.communicationManager.observeCall("constellation.delphinus.multipleChoice")
        .subscribe(callEvent => {

        });
    }

}
