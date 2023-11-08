var PuntoVentaModelo = require("../modelos/PuntoVentaModelo");
express = require("express");
router = express.Router();

router.get("/", function (req, res) {
  PuntoVentaModelo.getPuntosVenta(function (error, data) {
    res.status(200).json(data);
  });
});

router.get("/id/:id", function (req, res) {
  var id = req.params.id;

  if (!isNaN(id)) {
    PuntoVentaModelo.getPuntoVentaById(id, function (error, data) {
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
  var PuntoVentaData = {
    NombrePuntoVenta: req.body.NombrePuntoVenta,
    AdministradorPuntoVenta: req.body.AdministradorPuntoVenta,
  };

  PuntoVentaModelo.insertPuntoVenta(PuntoVentaData, function (error, data) {
    if (data) {
      res.status(200).json(data);
    } else if(error) {
      res.status(500).send({ error: "boo:(" });
    }
  });
});

router.put("/", function (req, res) {


  var PuntoVentaData = {
    id_punto_venta: req.body.id_punto_venta,
    NombrePuntoVenta: req.body.NombrePuntoVenta,
    AdministradorPuntoVenta: req.body.AdministradorPuntoVenta,
  };

  PuntoVentaModelo.updatePuntoVenta(PuntoVentaData, function (error, data) {
    //se muestra el mensaje correspondiente
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boo:(" });
    }
  });
});

router.delete("/", function (req, res) {
  var PuntoVentaData = {
    id_punto_venta: req.body.id_punto_venta,
    NombrePuntoVenta: req.body.NombrePuntoVenta,
    AdministradorPuntoVenta: req.body.AdministradorPuntoVenta,
  };
  
  PuntoVentaModelo.deletePuntoVenta(PuntoVentaData, function (error, data) {
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boo:(" });
    }
  });
});

module.exports = router;
