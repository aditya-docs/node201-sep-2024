const checkAdminKey = (req, res, next) => {
  const ADMIN_KEY = process.env.ADMIN_KEY;
  if (req.headers["x-api-key"] === ADMIN_KEY) {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized Access!" });
  }
};

module.exports = { checkAdminKey };
