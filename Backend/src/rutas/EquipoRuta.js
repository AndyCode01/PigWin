var EquipoModelo = require("../modelos/EquipoModelo");
express = require("express");
router = express.Router();

router.get("/", function (req, res) {
  EquipoModelo.getEquipos(function (error, data) {
    res.status(200).json(data);
  });
});


router.get("/id/:id", function (req, res) {
  var id = req.params.id;

  if (!isNaN(id)) {
    EquipoModelo.getEquipoById(id, function (error, data) {
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
  var EquipoData = {
    NombreEquipo: req.body.NombreEquipo,
    Deporte: req.body.Deporte,
  };

  //usamos la funcion para insertar
  EquipoModelo.insertEquipo(EquipoData, function (error, data) {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    }
  );
});

router.put("/", function (req, res) {
  var EquipoData = {
    id_equipos: req.body.id_equipos,
    NombreEquipo: req.body.NombreEquipo,
    Deporte: req.body.Deporte,
  };

  EquipoModelo.updateEquipo(EquipoData, function (error, data) {
      
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    }
  );
});

router.delete("/", function (req, res) {
    var EquipoData = {
        id_equipos: req.body.id_equipos,
        NombreEquipo: req.body.NombreEquipo,
        Deporte: req.body.Deporte,
  };
  
  EquipoModelo.deleteEquipo(EquipoData, function (error, data) {
    
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boo:(" });
    }
  });
});


module.exports = router;
