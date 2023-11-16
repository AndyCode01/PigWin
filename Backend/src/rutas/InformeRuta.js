var InformeModelo = require("../modelos/InformesModelo");

var express = require("express");

var router = express.Router();
router.get("/", function (req, res) {
    const query = req.query
  InformeModelo.getInforme(query, function (error, data) {
    res.status(200).json(data);
  });
});

module.exports = router;
