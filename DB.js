class DB {

    constructor(url,nameDB) {
      const MongoClient = require("mongodb").MongoClient;
      let _url = url;
      let _nameDB = nameDB;
    
      this.getURL = function() {
        return _url;
      }
      this.getNameDB = function() {
        return _nameDB;
      }
      this.setURL = function(url) {
        if (typeof url === "string") { _url = url;}
      }
      this.setNameDB = function(nameDB) {
        if(typeof nameDB === "string") { _nameDB = nameDB;}
      }

      this.mongoClient = new MongoClient(this.getURL(),{useNewUrlParser: true});
    }



    getConnect() {
      return this.mongoClient;
    }


  

    /*
    connect(obj,collection,operation) {
      this.mongoClient.connect(function(err, client) {
        let db = client.db(this.getNameDB());
        //let col = db.collection(collection);

        switch (operation) {
          case "insert":
            col.insertOne(obj,function(err, result) {
              if(err) console.log(err);
              console.log(result.ops); 
            });
            break;

            case "update":
              col.findOneAndUpdate()
              break;

            case "delete":
              break;
        
          default:
            break;
        }
        /*
        const clients = db.collection("clients");
        const orders = db.collection("orders");
        const drivers = db.collection("drivers");
        
        
        if (err) console.log(err);
        client.close();
      });
    }
*/

}

module.exports = DB;
