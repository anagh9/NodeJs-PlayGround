const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const Book = require("./models");

app.use(morgan("dev"));
mongoose
  .connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connection Successfull"))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/book", async (req, res) => {
  try {
    let query = await Book.find({});
    res.json(query);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/book", async (req, res) => {
  try {
    let newBook = new Book(req.body);
    newBook.save((book) => {
      res.send({ message: "Book added succesfully!", book });
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get('/book/:id',async(req,res)=>{
    try{
        let query = await Book.findById(req.params.id);
        res.status(202).json(query);
    }catch(err){
        console.log(err.message);
    }
})

app.delete('/book/:id',async(req,res)=>{
    try{
        let result = await Book.findByIdAndDelete({ _id: req.params.id });
        res.status(302).json({message: "Book deleted Succesfully",result});
    }catch(err){
        res.status(500).send(err.message);
    }
})

app.patch('/book/:id',async(req,res)=>{
    try{
        let _id = req.params.id;
        let query = await Book.findByIdAndUpdate(_id,req.body,{
            new : true,
        });
        res.send(query);
    }catch(err){
        res.status(500).send(err.message);
    }
});

app.listen(8080, () => {
  console.log("App Running on 8080");
});
