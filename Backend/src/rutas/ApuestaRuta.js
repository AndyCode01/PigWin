var ApuestaModelo = require("../modelos/ApuestaModelo");

var express = require("express");

var router = express.Router();

router.get("/", function (req, res) {
  ApuestaModelo.getApuestas(function (error, data) {
    res.status(200).json(data);
  });
});

router.get("/:tip", function (req, res) {
  var tip = req.params.tip;

  if (!isNaN(tip)) {
    ApuestaModelo.getApuestabyTip(tip, function (error, data) {
      if (typeof data !== "undefined" && data.length > 0) {
        res.status(200).json(data);
      } else {
        res.json(404, { msg: "Registro no Existe" });
      }
    });
  } else {
    res.status(500).json({ msg: "error" });
  }
});

router.get("/id/:id", function (req, res) {
  var id = req.params.id;

  if (!isNaN(id)) {
    ApuestaModelo.getApuestaById(id, function (error, data) {
      if (typeof data !== "undefined" && data.length > 0) {
        res.status(200).json(data);
      } else {
        res.json(404, { msg: "Registro no Existe" });
      }
    });
  } else {
    res.status(500).json({ msg: "error" });
  }
});

router.post("/", function (req, res) {
  var ApuestaData = {
    TicketApuesta: req.body.TicketApuesta,
    PartidoApuesta: req.body.PartidoApuesta,
    EquipoApuesta: req.body.EquipoApuesta,
    MontoApuesta: req.body.MontoApuesta,
  };

  
  ApuestaModelo.insertApuesta(ApuestaData, function (error, data) {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boo:(" });
    }
  });
});

router.put("/", function (req, res) {
  var ApuestaData = {
    id_apuestas: req.body.id_apuestas,
    TicketApuesta: req.body.TicketApuesta,
    PartidoApuesta: req.body.PartidoApuesta,
    EquipoApuesta: req.body.EquipoApuesta,
    MontoApuesta: req.body.MontoApuesta,
  };

  //usamos la funcion para actualizar
  ApuestaModelo.updateApuesta(ApuestaData, function (error, data) {
    //se muestra el mensaje correspondiente
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boo:(" });
    }
  });
});

router.delete("/", function (req, res) {
  var ApuestaData = {
    id_apuestas: req.body.id_apuestas,
    TicketApuesta: req.body.TicketApuesta,
    PartidoApuesta: req.body.PartidoApuesta,
    EquipoApuesta: req.body.EquipoApuesta,
    MontoApuesta: req.body.MontoApuesta,
  };
  
  ApuestaModelo.deleteApuesta(ApuestaData, function (error, data) {

    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boo:(" });
    }
  });
});

module.exports = router;
