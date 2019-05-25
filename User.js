class User {

    constructor(name, phone,rating, age) {
      const MAX_RATING = 5;
      const COUNT_PHONE = 11;
      const MAX_AGE = 150;
      let _name = name;
      let _phone = phone;
      let _rating = rating;
      let _age = age;
    }

    getName() {return _name;}
    getPhone() {return _phone;}
    getRating() {return _rating;}
    getAge() {return _age;}

    setRating(rating) {
      if(typeof rating === "number" 
        && rating <= MAX_RATING 
        && rating >= 0) {
            _rating = rating;
      }
  }

  setPhone(phone) {
    if(typeof phone === "string" && 
       (phone.length == COUNT_PHONE || (phone.length == COUNT_PHONE+1 
        && phone.charAt(0) === "+" && phone.charAt(1)!== "8"))) {
            _phone = phone;
    }
  }

  setName(name) {
    if(typeof name === "string") { _name = name;}
  }
  setAge(age) {
    if(typeof age === "number" && age <= MAX_AGE && age > 0) {

    }
  }

  insert(client, obj) {
      client.insertOne(obj,function(err, result) {
          if(err) return console.log(err);
          console.log(result.ops);
      });
  }

  delete(client, obj) {

  }
  
  update(client, obj) {

  }

}