// const csvtojson = require("csvtojson");
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb+srv://noble_oaja:asdUYT23@project1.jit3l.mongodb.net/stockticker?retryWrites=true&w=majority";

// csvtojson()
//   .fromFile("companies.csv")
//   .then(csvData => {
//     console.log(csvData);

//   MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
//   if(err) { return console.log(err); return;}
//
//     var dbo = db.db("stockticker");
// 	var collection = dbo.collection('companies');
//
//     // collection.insertMany(csvData, function(err, res) {
//     //   if (err){
//     //       return console.log(err);
//     //   }
//     //   console.log("Number of documents inserted: " + res.insertedCount);
//     //   db.close();
//     // });
//
// 	console.log("Success!");
// 	db.close();
//
// });



//I used the module csvtojson to read the csv data as a json and the fromFile() function return the JSON-like array.
const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");


let url = "mongodb+srv://noble_oaja:asdUYT23@project1.jit3l.mongodb.net/stockticker?retryWrites=true&w=majority";

csvtojson()
  .fromFile("companies.csv")
  .then(csvData => {
    console.log(csvData);

    mongodb.connect(url,{useUnifiedTopology: true }, function(err, db) {
        if (err) throw err;

        var dbo = db.db("stockticker");
        var collection = dbo.collection("companies");
          collection.insertMany(csvData, (err, res) => {
            if (err) throw err;

            console.log(`Inserted: ${res.insertedCount} rows`);
            db.close();
          });
      }
    );
  });
