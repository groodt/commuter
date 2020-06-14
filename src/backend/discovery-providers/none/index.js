// @flow

// eslint-disable-next-line no-unused-vars
function createDiscoveryHandler(options?: Object) {
  const handler = (req, res) => {
    res.json({
      results: []
    });
  };
  return handler;
}

export { createDiscoveryHandler };
