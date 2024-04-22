const jwt = require("jsonwebtoken");

const helpers = {
  safeAsync: async (fn, handleError) => {
    try {
      await fn();
    } catch (error) {
      if (handleError instanceof Function)
        handleError(error);
      else console.error(err);
    }
  },
  validateToken: (req, res, next) => {
    const fail = () => res.status(401).send("Unauthorized engineer.");

    const [prefix, token] = (req.headers?.authorization ?? "").split(" ");
    if (prefix !== "Bearer" || !token) return fail();

    try {
      req.user = jwt.verify(token, process.env.JWT);
    } catch (err) {
      return fail();
    }

    next();
  },
  unwrapObj: (obj, keys) => {
    if (typeof (obj) !== "object" || !Array.isArray(keys)) return {};
    const result = {};
    keys.forEach(k => result[k] = obj[k]);
    return result;
  }
}

module.exports = helpers;