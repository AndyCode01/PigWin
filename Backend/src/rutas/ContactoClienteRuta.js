var ContactoClienteModelo = require("../modelos/ContactoClienteModelo");
express = require("express");
router = express.Router();

router.get("/", function (req, res){
    ContactoClienteModelo.getContactosCliente(function (error, data) {
       res.status(200).json(data);
    });
});

router.get("/:tip", function (req, res){
    var tip = req.params.tip;

    if(!isNaN(tip)){
        ContactoClienteModelo.getContactoClienteByTip(tip, function (error, data) {
            if(typeof data !== "undefined" && data.length > 0){
                res.status(200).json(data);
            }else{
                res.json(404, {msg: "Registro no existe"});
            }
        });
    }else{
        res.status(500).json({ msg: "error"});
    }
});

router.get("/id/:id", function (req, res){
    var id = req.params.id;

    if(!isNaN(id)){
        ContactoClienteModelo.getContactoClienteById(id, function (error, data) {
            if(typeof data !== "undefined" && data.length > 0){
                res.status(200).json(data);
            }else{
                res.json(404, {msg: "Registro no existe"});
            }
        });
    }else{
        res.status(500).json({ msg: "error"});
    }
});

router.post("/", function (req, res){
    var ContactoClienteData = {
        Cliente: req.body.Cliente,
        TipoContacto: req.body.TipoContacto,
        ValorContacto: req.body.ValorContacto,
    };

    ContactoClienteModelo.insertContactoCliente(ContactoClienteData, function (error, data){
        if(data){
            res.status(200).json(data);
        }else if(error){
            res.status(500).send({ error: "boo:("});
        }
    });
});

router.put("/", function (req, res){
    var ContactoClienteData = {
        id_contacto_cliente: req.body.id_contacto_cliente,
        Cliente: req.body.Cliente,
        TipoContacto: req.body.TipoContacto,
        ValorContacto: req.body.ValorContacto,
    };

    ContactoClienteModelo.updateContactoCliente(ContactoClienteData, function (error, data){
        if(data && data.msg){
            res.status(200).json(data);
        }else{
            res.status(500).send({ error: "boo:( "});
        }
    });
});

router.delete("/", function (req, res) {
    var ContactoClienteData = {
      id_contacto_cliente: req.body.id_contacto_cliente,
      Cliente: req.body.Cliente,
      TipoContacto: req.body.TipoContacto,
      ValorContacto: req.body.ValorContacto,
    };
    
    ContactoClienteModelo.deleteContactoCliente(ContactoClienteData, function (error, data) {
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    });
  });
  

module.exports = router;