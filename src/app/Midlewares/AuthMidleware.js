const jwt = require("jsonwebtoken");
const config = require("../../config/auth");
const { promisify } = require("util");
const { throws } = require("assert");

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "Token de autenticação não existe!",
    });
  }

  const [bearer, token] = auth.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, config.secret);

    if (!decoded) {
      throw "O Token está expirado!";
    }

    req.user_id = decoded.user_id;
    next();
  } catch (e) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: e.message,
    });
  }
};
