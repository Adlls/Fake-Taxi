const User = require('./User');

module.exports = class Driver extends User {

    constructor(name, phone, rating, age) {
      super(name, phone, rating, age);
    }


}