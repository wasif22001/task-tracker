const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  //   const statusCode = res.status && res.status !== 200 ? res.status : 500;

  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
