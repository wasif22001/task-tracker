const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 3000,
  max: 1,
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
