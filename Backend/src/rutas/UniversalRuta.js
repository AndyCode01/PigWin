//obtenemos el modelo TipDocModel con toda la funcionalidad
var UniversalModelo = require("../modelos/UniversalModelo");
var express = require("express");
var router = express.Router();

//creamos el ruteo de la clase

  //---------------------------------------------------------------
  //Muestra el método CRUL Listar que muestra todos los tipos de documentos
  router.get("/", function (req, res) {
    UniversalModelo.getUniversales(function (error, data) {
      res.status(200).json(data);
    });
  });

  //---------------------------------------------------------------
  //Muestra el método CRUL read(listar ), que muestra solo un tipo de catalogo
  router.get("/:tip", function (req, res) {
    var tip = req.params.tip;

    //solo actualizamos si el tip es un número
    if (!isNaN(tip)) {
      UniversalModelo.getUniversalTipo(tip, function (error, data) {
        //si el tipo de catalogo existe lo mostramos en formato json
        if (typeof data !== "undefined" && data.length > 0) {
          res.status(200).json(data);
        }
        //en otro caso mostramos una respuesta conforme no existe
        else {
          res.json(404, { msg: "Registro no Existe" });
        }
      });
    } //si hay algún error
    else {
      res.status(500).json({ msg: "error" });
    }
  });

  //---------------------------------------------------------------
  //Muestra el método CRUL read(leer), que muestra el catalogo universal solicitado
  router.get("/id/:id", function (req, res) {
    var id = req.params.id;

    //solo actualizamos si la id es un número
    if (!isNaN(id)) {
      UniversalModelo.getUniversal(id, function (error, data) {
        //si el tipo de documento existe lo mostramos en formato json
        if (typeof data !== "undefined" && data.length > 0) {
          res.status(200).json(data);
        }
        //en otro caso mostramos una respuesta conforme no existe
        else {
          res.json(404, { msg: "Registro no Existe" });
        }
      });
    } //si hay algún error
    else {
      res.status(500).json({ msg: "error" });
    }
  });

  
  // Por tipo y por id
  router.get("/:tipcat/:id", function (req, res) {
    var tipcat = req.params.tipcat;
    var id = req.params.id;

    //solo actualizamos si la id es un número
    if (!isNaN(id)) {
      UniversalModelo.getUniversalByTipAndId(tipcat, id, function (error, data) {
        //si el tipo de documento existe lo mostramos en formato json
        if (typeof data !== "undefined" && data.length > 0) {
          res.status(200).json(data);
        }
        //en otro caso mostramos una respuesta conforme no existe
        else {
          res.json(404, { msg: "Registro no Existe" });
        }
      });
    } //si hay algún error
    else {
      res.status(500).json({ msg: "error" });
    }
  });

  //---------------------------------------------------------------
  //Muestra y captura los datos del método CRUL crear, usando el verbo post
  router.post("/", function (req, res) {
    //creamos un objeto Json con los datos del Catalogo Universal
    var UniversalData = {
      id_catalogo_universal: null,
      NombreCatalogo: req.body.NombreCatalogo,
      TipoCatalogo : req.body.TipoCatalogo ,
    };

    //usamos la funcion para insertar
    UniversalModelo.insertUniversal(UniversalData, function (error, data) {
      //console.log(" 44 tipo doc " +TipDocData.tipo_documento+"  ini  "+TipDocData.iniciales_tip_doc);
      //se muestra el mensaje correspondiente
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });

  //---------------------------------------------------------------
  //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
  router.put("/", function (req, res) {
    //almacenamos los datos de la petición en un objeto son Catalogo Universal

    var UniversalData = {
      id_catalogo_universal : req.body.id_catalogo_universal ,
      NombreCatalogo: req.body.NombreCatalogo,
      TipoCatalogo : req.body.TipoCatalogo ,
    };

    //usamos la funcion para actualizar
    UniversalModelo.updateUniversal(UniversalData, function (error, data) {
      //se muestra el mensaje correspondiente
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });

  router.delete("/", function (req, res) {
    var UniversalData = {
      id_catalogo_universal  : req.body.id_catalogo_universal  ,
      NombreCatalogo: req.body.NombreCatalogo,
      TipoCatalogo  : req.body.TipoCatalogo ,
    };
    
    UniversalModelo.deleteUniversal(UniversalData, function (error, data) {
      //se muestra el mensaje correspondiente
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });

  //exportamos el objeto para tenerlo disponible en EL APP
module.exports = router;

