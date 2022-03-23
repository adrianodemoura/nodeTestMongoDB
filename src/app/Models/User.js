const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        return validator.isEmail(value)
      },
    },
    password: {
      type: String,
      require: true,
    },
    municipio: {
      type: String,
    },
    uf: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.virtual("cidade").get(() => {
  return this.municipio + "/" + this.uf
})

userSchema.methods.getIniciais = function () {
  return this.name[0] + this.name[1]
}

module.exports = mongoose.model("User", userSchema)
