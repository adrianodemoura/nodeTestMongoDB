const mongoose = require("mongoose");

class Connection {

    constructor() {

        this.dataBaseConnectionMongoDB();
    }

    async dataBaseConnectionMongoDB() {
        this.mongoDBConnection = await mongoose.connect( "mongodb://localhost/nodejs", {

            useNewUrlParser: true, 
            useUnifiedTopology: true
        }).then( () => {

            //console.log( "conexão estabelecida com o MongoDB com sucesso.");
            this.close()
        }).catch( (error) => {

            console.log(`Erro ao estabelecer conexão com MongoDB: ${error}`);
        })
    }
}

module.exports = new Connection()