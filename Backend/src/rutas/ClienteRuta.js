var ClienteModelo = require("../modelos/ClienteModelo");
var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  ClienteModelo.getClientes(function (error, data) {
    res.status(200).json(data);
  });
});

router.get("/:tip", function (req, res) {
  var tip = req.params.tip;

  if (!isNaN(tip)) {
    ClienteModelo.getClienteByTip(tip, function (error, data) {
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
    ClienteModelo.getClienteById(id, function (error, data) {
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
  var ClienteData = {
    TipoDocumento: req.body.TipoDocumento,
    NumeroDocumento: req.body.NumeroDocumento,
    MetodoDePago: req.body.MetodoDePago,
    Sexo: req.body.Sexo,
    PrimerNombre: req.body.PrimerNombre,
    SegundoNombre: req.body.SegundoNombre,
    PrimerApellido: req.body.PrimerApellido,
    SegundoApellido: req.body.SegundoApellido,
  };

  ClienteModelo.insertCliente(ClienteData, function (error, data) {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boo:(" });
    }
  });
});

router.put("/", function (req, res) {
  //almacenamos los datos de la petición en un objeto son Catalogo Universal

  var ClienteData = {
    id_clientes: req.body.id_clientes,
    TipoDocumento: req.body.TipoDocumento,
    NumeroDocumento: req.body.NumeroDocumento,
    MetodoDePago: req.body.MetodoDePago,
    Sexo: req.body.Sexo,
    PrimerNombre: req.body.PrimerNombre,
    SegundoNombre: req.body.SegundoNombre,
    PrimerApellido: req.body.PrimerApellido,
    SegundoApellido: req.body.SegundoApellido,
  };

  //usamos la funcion para actualizar
  ClienteModelo.updateCliente(ClienteData, function (error, data) {
    //se muestra el mensaje correspondiente
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boo:(" });
    }
  });
});

router.delete("/", function (req, res) {
  var ClienteData = {
    id_clientes: req.body.id_clientes,
    TipoDocumento: req.body.TipoDocumento,
    NumeroDocumento: req.body.NumeroDocumento,
    MetodoDePago: req.body.MetodoDePago,
    Sexo: req.body.Sexo,
    PrimerNombre: req.body.PrimerNombre,
    SegundoNombre: req.body.SegundoNombre,
    PrimerApellido: req.body.PrimerApellido,
    SegundoApellido: req.body.SegundoApellido,
  };
  
  ClienteModelo.deleteCliente(ClienteData, function (error, data) {
    //se muestra el mensaje correspondiente
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boo:(" });
    }
  });
});

module.exports = router;
