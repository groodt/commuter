// @flow

const { createDiscoveryService } = require("./elasticSearch");

function createDiscoveryHandler(discoveryOptions: Object) {
  const discoveryService = createDiscoveryService(
    discoveryOptions.elasticsearch
  );

  const handler = (req, res) => {
    const successCb = data => res.json(data);

    const errorCb = err =>
      res.status(err.statusCode).json({ message: err.message });

    discoveryService.list(successCb, errorCb);
  };
  return handler;
}

export { createDiscoveryHandler };
