let contentsProvider;
switch (config.storageBackend) {
  case "s3":
    contentsProvider = require("../content-providers/s3");
    break;
  case "gcs":
    contentsProvider = require("../content-providers/gcs");
    break;
  case "local":
  default:
    contentsProvider = require("../content-providers/local");
}

const handler = contentsProvider.createDiscoveryHandler(config.storage);

export default handler;
