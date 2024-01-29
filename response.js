const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    statusCode: statusCode,
    data: data,
    message: message,
  });
};

module.exports = response;
