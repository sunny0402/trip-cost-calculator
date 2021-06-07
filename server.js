const express = require("express");
const app = express();
app.use(express.json());

// windows: services start MongoDB Server
//"C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
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
  add trips endpoint expects one param 
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
  /* list of trips in the trips collection */
  trips.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ the_error: err });
      return;
    }
    res.status(500).json({ trips: items });
  });
});

// POST /expense { trip, date, amount, category, description }
// trip is the _id of one of the trips we previously added
app.post("/expense", (req, res) => {
  expenses.insertOne(
    {
      trip: req.body.trip,
      date: req.body.date,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
    },
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ err: err });
        return;
      }
      res.status(200).json({ ok: true });
    }
  );
});

//accepts 1 parameter: _id property of a trip
app.get("/expenses", (req, res) => {
  expenses.find({ trip: req.body.trip }).toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return;
    }
    res.status(200).json({ expenses: items });
  });
});

app.listen(3000, () => console.log("Server ready"));
