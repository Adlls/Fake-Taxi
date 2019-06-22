module.exports = class User {



    constructor(name, phone,rating, age) {
      const MAX_RATING = 5;
      const COUNT_PHONE = 11;
      const MAX_AGE = 150;
      let _name = name;
      let _phone = phone;
      let _rating = rating;
      let _age = age;
      
      this.getName = function() {
        return _name;
      }
      this.getPhone = function() {
        return _phone;
      }
      this.getRating = function() {
        return _rating;
      }
      this.getAge = function() {
        return _age;
      }

      this.setName = function(name) {
        if(typeof name === "string") { _name = name;}
      }
      this.setPhone = function(phone) {
        if(typeof phone === "string" && 
        (phone.length == COUNT_PHONE || (phone.length == COUNT_PHONE+1 
         && phone.charAt(0) === "+" && phone.charAt(1) === "7"))) {
             _phone = phone;
          }
      }
      this.setRating = function(rating) {
        if(typeof rating === "number" 
        && rating <= MAX_RATING 
        && rating >= 0) {
            _rating = rating;
        }
      }
      this.setAge = function(age) {
        if(typeof age === "number" && age <= MAX_AGE && age > 0) {
            _age = age;
        }
      }
    
    }

    
  getX(min, max) {
    return Math.random() * (max - min) + min;
  }
  getY(min, max) {
    return Math.random() * (max - min) + min;
  }

};