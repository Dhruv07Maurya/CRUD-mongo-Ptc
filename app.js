  const express = require("express");
  const app = express();
  const mongoose = require("mongoose");
  const path = require("path");

  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, "public")));

  mongoose.connect(
    "mongodb+srv://2022dhruvmaurya:HonFRfkHu9Gj2ARS@test.g2ino.mongodb.net/?retryWrites=true&w=majority&appName=test"
  );

  const user = require("./models/user.model.js");

  // async function insert() {
  //   await user.create({
  //     name: "dhruv",
  //     email: "dddm@mail.com",
  //   });
  // }
  // // insert();

  // async function update() {
  //   await user.findOneAndUpdate(
  //     { name: "dhruv" },
  //     { email: "mad@mail.com" },
  //     { new: true }
  //   );
  // }

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/read", async function (req, res) {
    let users = await user.find();
    res.render("read", { users });
  });

  app.post("/create", async function (req, res) {
    let { name, email, imagee } = req.body;
    await user.create({
      name,
      email,
      imagee,
    });
    res.redirect("/read");
  });

  app.post("/delete/:id", async (req, res) => {
    let users = await user.findOneAndDelete({ _id: req.params.id });
    res.redirect("/read");
  });

  app.get("/update/:id", async (req, res) => {
    const userToUpdate = await user.findById(req.params.id);
    res.render("update", { userToUpdate });
});

app.post("/update/:id", async (req, res) => {
    let { name, email, imagee } = req.body;
    let updatedUser = await user.findOneAndUpdate(
        { _id: req.params.id },
        { name, email, imagee },
        { new: true }
    );
    res.redirect("/read");
});


  app.listen(3000, function () {
    console.log("app is running");
  });
