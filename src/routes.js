const { Router } = require("express")

const AuthMidleware = require("./app/Midlewares/AuthMidleware")
const LoginController = require("./app/Controllers/LoginController")
const UserController = require("./app/Controllers/UserController")

const routes = new Router()

routes.post("/login", LoginController.login)
routes.get("/", LoginController.index)

routes.post("/user_store", AuthMidleware, UserController.store)
routes.get("/user", AuthMidleware, UserController.show)

module.exports = routes
