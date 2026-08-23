import proxy from 'express-http-proxy';

export const proxyWithHeaders = (target) =>
  proxy(target, {
    proxyReqOptDecorator(opts, req) {
      opts.headers = opts.headers || {};

      if (req.headers.cookie) {
        opts.headers.cookie = req.headers.cookie;
      }

      if (req.headers.authorization) {
        opts.headers.authorization = req.headers.authorization;
      }

      return opts;
    },
  });
