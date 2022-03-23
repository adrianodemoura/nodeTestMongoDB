const { default: mongoose } = require("mongoose")

require("dotenv").config({
  path: ".env_" + process.env.ENVIRONMENT.toLocaleLowerCase(),
})

mongoose
  .connect(`mongodb://${process.env.DB_CONNECT_PATH}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      if (process.env.ENVIRONMENT !== "test") {
        console.log(
          `conectei no mongoDB no ambiente ${process.env.ENVIRONMENT} ...`
        )
      }
    },
    (err) => {
      console.log(err)
    }
  )

module.exports = mongoose
