const authorizeHeader = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Invalid or missing API key" });
  }
};

module.exports = authorizeHeader;
