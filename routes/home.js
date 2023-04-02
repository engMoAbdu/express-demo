const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "My Express Demo App", message: "Hello" });
});

module.exports = router;
