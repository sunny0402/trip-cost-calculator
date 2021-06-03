const express = require("express");
const mongo = require("mongodb").MongoClient;
const app = express();
app.use(express.json());

// windows: services start MongoDB Server
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

let db, trips, expenses;

mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
      return;
    }
    db = client.db("tripcost");
    trips = db.collection("trips");
    expenses = db.collection("expenses");
  }
);

app.post("/trip", (req, res) => {
  /*
  add trips. endpoint expects one param 
  expect data as JSON via Content-Type: application/json
  */
  const name = req.body.name;
  console.log(trips);
  trips.insertOne({ trip_name: name }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ the_error: err });
      return;
    }
    console.log("result: ", result);
    res.status(200).json({ ok: true });
  });
});
app.get("/trips", (req, res) => {
  /* */
});
app.post("/expense", (req, res) => {
  /* */
});
app.get("/expenses", (req, res) => {
  /* */
});

app.listen(3000, () => console.log("Server ready"));
