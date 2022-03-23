const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is mandatory']
    },
    email: {
      type: String,
      required: [true, 'The email is mandatory'],
      required: true,
      unique: true,
      lowercase: true,
      validate: (value) => {
        return validator.isEmail(value)
      },
    },
    password: {
      type: String,
      required: [true, 'The password is mandatory']
    },
    municipio: {
      type: String,
      min: 3,
      max: 100
    },
    uf: {
      type: String,
      minlength: [2, 'The uf must to have min of the 2 characters'],
      maxlength: [2, 'The uf must to have max of the 2 characters'],
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

userSchema.pre('save', async (next) => {
  if ( !!this.password ) {
    this.password = await bcrypt.hash(this.password, 8)
  }

  next()
})

userSchema.methods.generateToken = function() {

    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
};

module.exports = mongoose.model("User", userSchema)
