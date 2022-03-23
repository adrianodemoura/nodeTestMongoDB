require("dotenv").config({
  path: ".env_" + process.env.ENVIRONMENT.toLocaleLowerCase(),
})
const mongoose = require("mongoose")

mongoose.connect(
  `mongodb://${process.env.DB_CONNECT_PATH}`,
  { useNewUrlParser: true, useUnifiedTopology: true },

  (error) => {
    if (error) throw error

    const app = require("./app")

    const PORT = process.env.PORT || 8080

    app.listen(PORT, () => {
      console.log(`App listen on port : ${PORT}`)
    })
  }
)
