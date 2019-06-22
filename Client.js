const User = require('./User');

module.exports = class Client extends User {

    constructor(name, phone, rating) {
      super(name, phone, rating);
    }

}       