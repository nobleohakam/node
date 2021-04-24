//I used the module csvtojson to read the csv data as a json and the fromFile() function return the JSON-like array.
const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
var port = procress.env.PORT || 3000;

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
      }.listen(port);
    );
});

