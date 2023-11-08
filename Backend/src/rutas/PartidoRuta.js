var PartidoModelo = require("../modelos/PartidoModelo");
express = require("express");
router = express.Router();

router.get("/", function (req, res){
    PartidoModelo.getPartidos(function (error, data){
        res.status(200).json(data);
    });
});

router.get("/:tip", function (req, res){
    var tip = req.params.tip;

    if(!isNaN(tip)){
        PartidoModelo.getPartidoByTip(tip, function (error, data){
            if(typeof data !== "undefined" && data.length > 0){
                res.status(200).json(data);
            }else{
                res.json(404, {msg: "Registro no existe"});
            }
        });
    }else{
        res.status(500).json({msg: "error"});
    }
});

router.get("/id/:id", function (req, res){
    var id = req.params.id;

    if(!isNaN(id)){
        PartidoModelo.getPartidoById(id, function (error, data){
            if(typeof data !== "undefined" && data.length > 0){
                res.status(200).json(data);
            }else{
                res.json(404, {msg: "Registro no existe"});
            }
        });
    }else{
        res.status(500).json({msg: "error"});
    }
});

router.post("/", function (req, res){
    var PartidoData = {
        EquipoLocal: req.body.EquipoLocal ,
        EquipoVisitante: req.body.EquipoVisitante,
        FechaPartido: req.body.FechaPartido,
        Deporte: req.body.Deporte,
        GanadorPartido: req.body.GanadorPartido,
    };

    PartidoModelo.insertPartido(PartidoData, function(error, data){
        if(data){
            res.status(200).json(data);
        }else if(error){
            res.status(500).send({ error: "boo:(" });
        }
    });
});

router.put("/", function (req, res){
    var PartidoData = {
        id_partidos : req.body.id_partidos,
        EquipoLocal : req.body.EquipoLocal,
        EquipoVisitante : req.body.EquipoVisitante,
        FechaPartido: req.body.FechaPartido,
        Deporte: req.body.Deporte,
        GanadorPartido: req.body.GanadorPartido,
    };

    PartidoModelo.updatePartido(PartidoData, function (error, data){
        if(data && data.msg){
            res.status(200).json(data);
        }else{
            res.status(500).send({error: "boo:("});
        }
    });
});

router.delete("/", function (req, res) {
    var PartidoData = {
      id_partidos : req.body.id_partidos,
      EquipoLocal: req.body.EquipoLocal,
      EquipoVisitante: req.body.EquipoVisitante,
      FechaPartido: req.body.FechaPartido,
      Deporte: req.body.Deporte,
      GanadorPartido: req.body.GanadorPartido,

    };
    
    PartidoModelo.deletePartido(PartidoData, function (error, data) {
      //se muestra el mensaje correspondiente
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });

module.exports = router;