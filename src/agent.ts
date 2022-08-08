import { Components, Configuration, Container, MqttBinding } from "@coaty/core";
import { IoSourceController, RuleBasedIoRouter } from "@coaty/core/io-routing";
import { NodeUtils } from "@coaty/core/runtime-node";
import { DelphinusTestController } from "./controller/delphinus-test-controller";

import { agentInfo } from "./agent.info";

const components: Components = {
    controllers: {
        DelphinusTestController,
    },
};

const configuration: Configuration = {
    common: {
        agentInfo,
        agentIdentity: { name: "constellation-delphinus" },
    },
    communication: {
        brokerUrl: "mqtt://localhost:1883",
        // Define a unique communication namepace for your application.
        namespace: "me.atkn.constellation",
        shouldAutoStart: true,
    },
    controllers: {
        DelphinusTestController: {
            wsUrl: "ws://192.168.178.22:4455",
            pollInterval: 1000,
        },
    },
};

// Bootstrap a Coaty container with the specified components and autostart its
// communication manager.
const container = Container.resolve(components, configuration);
NodeUtils.logCommunicationState(container);

