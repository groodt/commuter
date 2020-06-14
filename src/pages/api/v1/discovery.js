
let discoveryProvider;
switch (config.discoveryBackend) {
  case "elasticsearch":
    // we only provide the elasticsearch storage currently
    discoveryProvider = require("../discovery-providers/elasticsearch");
    break;
    // Otherwise, we provide a dummy router for now
  default:
    discoveryProvider = require("../discovery-providers/none");
}

const handler = discoveryProvider.createDiscoveryHandler(config.discovery);

export default handler;
