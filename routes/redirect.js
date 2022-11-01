const express = require("express");

const router = express.Router();
const Url = require("../models/Url");

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({
      urlCode: req.params.code,
    });
    
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("URL não encontrada");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Ocorreu um erro ao processar a requisição.");
  }
});

module.exports = router;
