const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const yup = require("yup");
const axios = require("axios");

class UserController {
  index(req, res) {
    console.log(req.body);
  }

  show(req, res) {
    var users = ["Kaio", "Larissa", "Danver"];

    return res.status(200).json({
      error: false,
      users,
    });
  }

  async store(req, res) {
    let schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: true,
        message: "Dados inválidos",
      });
    }

    let userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        error: true,
        message: `Este e-mail '${req.body.email}' já existe!`,
        data: userExist,
      });
    }

    const { name, email, password } = req.body;

    const data = { name, email, password };
    data.password = await bcrypt.hash(data.password, 8);

    await User.create(data, (err) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Erro ao tentar inserir usuário no banco do MongoDB.",
        });
      }

      return res
        .status(200)
        .json({ error: false, message: "Usuário cadastrado com sucesso." });
    });
  }
}

module.exports = new UserController();
