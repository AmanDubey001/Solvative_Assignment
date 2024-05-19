const express = require("express");
const mongoose = require("mongoose");
const main = require("./db");
const { User, TransactionHistory } = require("./model");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const corsOptions = {
  origin: 'http://127.0.0.1:5173', 
  optionsSuccessStatus: 200
};

// Enable CORS for a specific route
app.options('*', cors(corsOptions));
// app.use('/transaction', cors(corsOptions));

main();
app.use(express.json());

app.post("/user", async (req, res) => {
  const newUser = new User({ ...req.body });
  const response = await newUser.save().catch((err) => {
    res.send(err.message);
  });
  res.send(response?.username ? { created: true } : { created: false });
});

app.put("/user", async (req, res) => {
  const { username, newUserName } = req.body;
  const response = await User.updateOne(
    { username: username },
    { username: newUserName }
  ).catch((err) => {
    res.send(err.message);
  });
  res.send(response?.acknowledged ? { updated: true } : { updated: false });
});
//all
app.get("/user", async (req, res) => {
    let response= await User.find({ }).catch((err) => {
        res.send(err.message);
      });
    res.send(response);
  });
  //with id
app.get("/user", async (req, res) => {
  const response = await User.find({ _id: req.query.id }).catch((err) => {
    res.send(err.message);
  });
  res.send(response);
});
//all
app.get("/transaction", async (req, res) => {
  const response = await TransactionHistory.find({}).catch((err) => {
    res.send(err.message);
  });
  res.send(response);
});



app.post("/transaction", async (req, res) => {
  const { sender, reciever, transfered, recieved } = req.body;

  const senderBody = await User.findOne({ username: sender }).catch((err) => {
    res.status(404).json({ error: err });
    res.send(err);
  });
  const recieverBody = await User.findOne({ username: reciever }).catch(
    (err) => {
      res.status(404).json({ error: err });
      res.send(err);
    }
  );
  senderBody.p5balance -= transfered;
  recieverBody.rewards += recieved;


  const debited = await User.updateOne(
    { username: sender },
    { $set: senderBody }
  ).catch((err) => {
    res.status(404).json({ error: err });
    res.send(err);
  });

  const credited = await User.updateOne(
    { username: reciever },
    { $set: recieverBody }
  ).catch((err) => {
    res.status(404).json({ error: err });
    res.send(err);
  });

  let response;
    const newHistory = new TransactionHistory({ ...req.body });
    response = await newHistory.save().catch((err) => {
      res.status(404).json({ error: err });
      res.send(err);
    });
    res.send(response);
})

app.delete("/transaction", async (req, res) => {
    const { sender, reciever, transfered, recieved } = req.body;
  
    const senderBody = await User.findOne({ username: sender }).catch((err) => {
      res.status(404).json({ error: err });
      res.send(err);
      throw err;
    });
    const recieverBody = await User.findOne({ username: reciever }).catch(
      (err) => {
        res.status(404).json({ error: err });
        res.send(err);
        throw err;
      }
    );
    senderBody.p5balance += transfered;
    recieverBody.rewards  -= recieved;
  
  
    const debited = await User.updateOne(
      { username: sender },
      { $set: senderBody }
    ).catch((err) => {
      res.status(404).json({ error: err });
      res.send(err);
      throw err;
    });
  
    const credited = await User.updateOne(
      { username: reciever },
      { $set: recieverBody }
    ).catch((err) => {
      res.status(404).json({ error: err });
      res.send(err);
      throw err;
    });
  
    let response;
      response = await TransactionHistory.deleteOne({id:req.body.id}).catch((err) => {
        res.status(404).json({ error: err });
        res.send(err);
          throw err;
      });
      res.send(response);
  })
  

app.listen(5050);
