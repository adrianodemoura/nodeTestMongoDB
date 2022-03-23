const User = require("../Models/User")


class UserController {
  index(req, res) {
    console.log(req.body)
  }

  show(req, res) {
    var users = ["Kaio", "Larissa", "Danver"]

    return res.status(200).json({
      error: false,
      users,
    })
  }

  async store(req, res) {

    //const { name, email, password } = req.body

    return res.status(200).json({
      error: false,
      message: 'Usuário criado com sucesso.'
    })
  }
}

module.exports = new UserController()
