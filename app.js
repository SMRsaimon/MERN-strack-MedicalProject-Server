const express = require("express");
const app = express();
const cors = require('cors');
const ObjectID = require("mongodb").ObjectID
app.use(cors());
app.use(express.json())
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.736kg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



// database add
client.connect(err => {
  const appoinmentCollection = client.db(`${process.env.DB_NAME}`).collection("UserBookingAppoinment");
  const doctorCollection = client.db(`${process.env.DB_NAME}`).collection("DoctorInfo");


  app.post("/appoinment", (req, res) => {

    console.log(req.body)

    appoinmentCollection.insertOne(req.body)
      .then((result) => {
        res.send(result.insertedCount > 0)
        console.log(result.insertedCount)

      })
  });

  // user appoinment
  app.get("/singlePersonAppoinment", (req, res) => {

    appoinmentCollection.find({})
      .toArray((err, collection) => {

        res.json(collection)
      })
  });

  // delete iTeam 
  app.delete("/deleteAppoinment/:id", (req, res) => {

    appoinmentCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(respons => {
        res.send(respons.deletedCount > 0)
      })
  });


});





module.exports = app