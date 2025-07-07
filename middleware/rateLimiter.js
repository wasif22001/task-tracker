const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 3000,
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.set({
      "X-RateLimit": "1",
      "Retry-After": "3",
    });

    res.status(429).json({
      message: "Too many requests, please try again later.",
      status: "error",
    });
  },
});

module.exports = limiter;
