const axios = require("axios")
const Yup = requrie("yup")
const Contact = require("../Models/Contact")
const { hapikey } = require("../../config/config")

class ContactController {
  async show(req, res) {
    console.log("função show acessada em contact")
  }

  async update(req, res) {
    console.log("Função update acessada em contact")
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required().min(3),
      email: Yup.string().email().required(),
      phone: Yup.string().required().min(10),
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(402).json({
        error: true,
        message: "Dados inválidos",
      })
    }

    const { name, email, phone } = req.body

    axios({
      method: "post",
      url: `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${email}/?hapikey=${hapikey}`,
      data: {
        properties: [
          { property: "firstname", value: name },
          { property: "email", value: email },
          { property: "mobilephone", value: phone },
        ],
      },
    })
      .then((response) => {
        console.log("contato cadastrado com sucesso")
      })
      .catch((error) => {
        console.log("Erro ao cadastrar usuário")
        console.log(error)
      })

    const dados = { name, email, phone }

    const contact = await Contact.create(dados, (err) => {
      if (err) {
        return res.status(402).json({
          error: true,
          message: "Não foi possível cadastrar o contato",
        })
      }

      return res.status(200).json({
        error: false,
        message: "Contato cadastrado com sucesso",
        contact,
      })
    })
  }

  async remove(req, res) {
    console.log("Função remove acessada em contact")
  }
}

module.exports = new ContactController()
