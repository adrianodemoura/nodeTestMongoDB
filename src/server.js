const mongoose = require('mongoose');

mongoose.connect(
  "mongodb://localhost/nodejs",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) throw error

    const app = require("./app");
    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => {
      console.log(`App listen on port : ${PORT}`);
    });
  }
);
