var EstadisticaEquipoModelo = require("../modelos/EstadisticaEquipoModelo");
express = require("express");
router = express.Router();

router.get("/", function (req, res) {
  EstadisticaEquipoModelo.getEstadisticas(function(error, data) {
    res.status(200).json(data);
  });
});

router.get("/:tip", function (req, res) {
  var tip = req.params.tip;

  if (!isNaN(tip)) {
    EstadisticaEquipoModelo.getEstadisticasByTip(tip, function (error, data) {
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
    EstadisticaEquipoModelo.getEstadisticasById(id, function (error, data) {
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
  var EstadisticaEquipoData = {
    EquipoEstadisticas: req.body.EquipoEstadisticas,
    ApartadoImportante: req.body.ApartadoImportante,
    ValorApartado: req.body.ValorApartado,
  };

  EstadisticaEquipoModelo.insertEstadisticaEquipo(EstadisticaEquipoData,function (error, data) {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    }
  );
});

router.put("/", function (req, res) {
  var EstadisticaEquipoData = {
    id_estadisticas_equipos: req.body.id_estadisticas_equipos,
    EquipoEstadisticas: req.body.EquipoEstadisticas,
    ApartadoImportante: req.body.ApartadoImportante,
    ValorApartado: req.body.ValorApartado,
  };

  EstadisticaEquipoModelo.updateEstadisticaEquipo(EstadisticaEquipoData,function (error, data) {
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    }
  );
});

router.delete("/", function (req, res) {
    var EstadisticaEquipoData = {
      id_estadisticas_equipos: req.body.id_estadisticas_equipos,
      EquipoEstadisticas: req.body.EquipoEstadisticas,
      ApartadoImportante: req.body.ApartadoImportante,
      ValorApartado: req.body.ValorApartado,
    };
    
    EstadisticaEquipoModelo.deleteEstadisticaEquipo(EstadisticaEquipoData, function (error, data) {
      
      if(data && data.msg) {
        res.status(200).json(data);
      }else {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });

module.exports = router;
