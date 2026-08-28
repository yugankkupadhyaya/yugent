import proxy from 'express-http-proxy';

export const proxyWithHeaders = (target, pathResolver, { includeGatewayAuth = false } = {}) =>
  proxy(target, {
    proxyReqPathResolver: pathResolver,
    proxyReqOptDecorator(opts, req) {
      opts.headers = opts.headers || {};

      // Identity headers are gateway-owned. Never pass through values supplied
      // by the browser.
      delete opts.headers['x-user-id'];
      delete opts.headers['x-clerk-user-id'];
      delete opts.headers['x-clerk-email'];
      delete opts.headers['x-clerk-name'];
      opts.headers['x-clerk-user-id'] = req.userId;
      opts.headers['x-clerk-email'] = req.clerkIdentity?.email || '';
      opts.headers['x-clerk-name'] = req.clerkIdentity?.name || '';
      if (includeGatewayAuth) {
        opts.headers['x-gateway-auth'] = process.env.AUTH_SERVICE_SECRET || '';
      } else {
        delete opts.headers['x-gateway-auth'];
      }

      return opts;
    },
  });
