// @flow
import type { DiskProviderOptions } from "./fs";

const fs = require("./fs");

type ErrorResponse = {
  message: string
};

function createDiscoveryHandler(options: DiskProviderOptions) {
  if (!options.local.baseDirectory) {
    throw new Error("Base directory must be specified for the local provider");
  }
  const handler = (req, res) => {
    const {
      query: { path },
    } = req;

    if (req.method === "GET") {
      fs.get(options, path)
        .then(content => {
          res.json(content);
        })
        .catch((err: ErrnoError) => {
          const errorResponse: ErrorResponse = {
            message: `${err.message}: ${path}`
          };

          if (err.code === "ENOENT") {
            res.status(404).json(errorResponse);
            return;
          }
          if (err.code === "EACCES") {
            // When unable to access a file, assume 404 in the GitHub security style
            // Even though we're providing all the information in the response...
            res.status(404).json(errorResponse);
            return;
          }

          res.status(500).json(errorResponse);
        });
    } else if (req.method === "POST") {
      fs.post(options, path, req.body)
        .then(() => res.status(201).send())
        .catch((err: ErrnoError) => {
          const errorResponse: ErrorResponse = {
            message: `${err.message}: ${path}`
          };
          res.status(500).json(errorResponse);
        });
    } else {
      res.status(404);
    }

  };
  return handler;
}

export { createDiscoveryHandler };
