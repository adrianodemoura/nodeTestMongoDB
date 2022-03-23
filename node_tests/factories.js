const faker = require("faker")
const { User } = require("../src/app/Models/User")

//const factory = require('factory-girl').factory;
//const factory = require('factory-girl').factory;
const factory = require("factory-girl").MongooseAdapter

// const FactoryGirl = require('factory-girl');
// const factory = FactoryGirl.factory;
// const adapter = new FactoryGirl.MongooseAdapter();
// factory.setAdapter(adapter);

factory.define("User", User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
})

module.exports = FactoryGirl
