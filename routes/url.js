const express = require("express");
const validUrl = require("valid-url");
const shortid = require("shortid");

const router = express.Router();
const Url = require("../models/Url");

const baseUrl = "http:localhost:5000";

router.post("/encurtar", async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json(`Variavel de url base (baseURL: ${baseUrl}) inválida.`);
  }

  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({
        longUrl,
      });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }

    } catch (err) {
      console.log(err);
      res.status(500).json("Ocorreu um erro ao processasr a URL.");
    }
  } else {
    res.status(401).json("A URL informada está em um formato inválido.");
  }
});

module.exports = router;
