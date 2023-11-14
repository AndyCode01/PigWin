var TicketModelo = require("../modelos/TicketModelo");
express = require("express");
router = express.Router();

router.get("/", function (req, res) {
  TicketModelo.getTickets(function (error, data) {
    res.status(200).json(data);
  });
});

router.get("/:tip", function (req, res) {
  var tip = req.params.tip;

  if (!isNaN(tip)) {
    TicketModelo.getTicketByTip(tip, function (error, data) {
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
    TicketModelo.getTicketById(id, function (error, data) {
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
  var TicketData = {
    FechaTicket: req.body.FechaTicket,
    PuntoVentaTicket: req.body.NombrePuntoVenta,
    ClienteTicket: req.body.cliente,
  };

  //usamos la funcion para insertar
  TicketModelo.insertTicket(TicketData, function (error, data) {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    }
  );
});

router.put("/", function (req, res) {
  var TicketData = {
    id_tickets: req.body.id_tickets,
    FechaTicket: req.body.FechaTicket,
    PuntoVentaTicket: req.body.NombrePuntoVenta,
    ClienteTicket: req.body.cliente,
  };

  TicketModelo.updateTicket(TicketData, function (error, data) {
      //se muestra el mensaje correspondiente
      if (data && data.msg) {
        res.status(200).json(data);
      } else {
        res.status(500).send({ error: "boo:(" });
      }
    }
  );
});

router.delete("/", function (req, res) {
  var TicketData = {
    id_tickets: req.body.id_tickets,
    FechaTicket: req.body.FechaTicket,
    PuntoVentaTicket: req.body.PuntoVentaTicket,
    ClienteTicket: req.body.ClienteTicket,
  };
  
  TicketModelo.deleteUniversal(TicketData, function (error, data) {
    //se muestra el mensaje correspondiente
    if (data && data.msg) {
      res.status(200).json(data);
    } else {
      res.status(500).send({ error: "boo:(" });
    }
  });
});


module.exports = router;
