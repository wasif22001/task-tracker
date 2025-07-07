const clients = new Map();

const customRateLimiter = (req, res, next) => {
  debugger;

  const clientIp = req.ip || req.connection.remoteAddress;

  const currentTime = Date.now();

  if (!clients.has(clientIp)) {
    clients.set(clientIp, { count: 1, lastRequestTime: currentTime });
    return next();
  }

  console.log("Client IP:", clientIp);
  console.log("clients:", clients);

  const client = clients.get(clientIp);

  if (currentTime - client.lastRequestTime < 5000) {
    if (client.count > 1) {
      res.set({
        "X-RateLimit": "5",
        "Retry-After": "3",
      });

      return res.status(429).json({
        message: "Too many requests, please try again later.",
        status: "error",
      });
    } else {
      client.count += 1;
      client.lastRequestTime = currentTime;
      clients.set(clientIp, client);
      return next();
    }
  } else {
    client.count = 1;
    client.lastRequestTime = currentTime;
    clients.set(clientIp, client);
    return next();
  }
};

module.exports = customRateLimiter;
