require("dotenv").config({ path: ".env_" + process.env.ENVIRONMENT.toLocaleLowerCase() })
const mongoose = require('mongoose');

//const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }
  const mongooseOptions = JSON.parse(process.env.DB_CONNECT_OPTIONS)

  mongoose.connect(

    `mongodb://${process.env.DB_CONNECT_PATH}`, mongooseOptions ,
  
  (error) => {
    
    if (error) throw error

    const app = require("./app")
  
    const PORT = process.env.PORT || 8080

    app.listen(PORT, () => {
  
      console.log(`App listen on port : ${PORT}`)
    })
  }
)
