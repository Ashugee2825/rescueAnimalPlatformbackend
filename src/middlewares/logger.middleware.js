

module.exports = (req, res, next) => {
  console.log("--------------");

  console.log("METHOD:", req.method);
  console.log("URL:", req.originalUrl);

  console.log("BODY:", req.body);

  console.log("PARAMS:", req.params);

  console.log("QUERY:", req.query);

  console.log("--------------");

  next();
};
