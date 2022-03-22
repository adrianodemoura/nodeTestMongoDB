require("dotenv").config({
  path: ".env_" + process.env.ENVIRONMENT.toLocaleLowerCase(),
})

const jwt = require("jsonwebtoken")
const { promisify } = require("util")
const { throws } = require("assert")

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization

  if (!auth) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: "Token de autenticação não existe!",
    })
  }

  const [bearer, token] = auth.split(" ")

  try {
    const decoded = await promisify(jwt.verify)(token, {
      secret: process.env.APP_SECRET,
      expireIn: process.env.APP_SECRET_EXPIRE_IN,
    })

    if (!decoded) {
      throw "O Token está expirado!"
    }

    req.user_id = decoded.user_id
    next()
  } catch (e) {
    return res.status(401).json({
      error: true,
      code: 130,
      message: e.message,
    })
  }
}
