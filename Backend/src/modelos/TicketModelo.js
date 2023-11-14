var connection = require("../conexion");
var TicketModelo = {};

TicketModelo.getTickets = function (callback) {
  if (connection) {
    var sql =
      "SELECT t.id_tickets, " +
      "t.FechaTicket , " +
      "pv.NombrePuntoVenta, " + 
      "CONCAT (c.PrimerNombre, ' ', c.SegundoNombre, ' ' , c.PrimerApellido, ' ',c.SegundoApellido) AS 'cliente'" +
      "FROM Tickets AS t " +
      "LEFT JOIN punto_venta AS pv ON t.PuntoVentaTicket = pv.id_punto_venta " +
      "LEFT JOIN clientes AS c ON t.ClienteTicket = c.id_clientes;";
    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

TicketModelo.getTicketByTip = function (tip, callback) {
  if (connection) {
    var sql =
      "SELECT t.id_tickets, " +
      "DATE_FORMAT(t.FechaTicket, '  %d/%m/%Y %H:%i ') AS 'FechaTicket', " +
      "pv.NombrePuntoVenta, " +
      "c.PrimerNombre, " +
      "c.PrimerApellido, " +
      "c.SegundoApellido " +
      "FROM Tickets AS t " +
      "LEFT JOIN punto_venta AS pv ON t.PuntoVentaTicket = pv.id_punto_venta " +
      "LEFT JOIN clientes AS c ON t.ClienteTicket = c.id_clientes WHERE t.PuntoVentaTicket = " +
      connection.escape(tip) +
      ";";

    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

TicketModelo.getTicketById = function (id, callback) {
  if (connection) {
    var sql =
      "SELECT t.id_tickets, " +
      "t.FechaTicket , " +
      "pv.NombrePuntoVenta, " + 
      "CONCAT (c.PrimerNombre, ' ', c.SegundoNombre, ' ' , c.PrimerApellido, ' ',c.SegundoApellido) AS 'cliente'" +
      "FROM Tickets AS t " +
      "LEFT JOIN punto_venta AS pv ON t.PuntoVentaTicket = pv.id_punto_venta " +
      "LEFT JOIN clientes AS c ON t.ClienteTicket = c.id_clientes WHERE t.id_tickets = " +
      connection.escape(id) +";";

    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

TicketModelo.insertTicket = function (TicketData, callback) {
  if (connection) {
    var sql = "INSERT INTO tickets SET ?";

    connection.query(sql, TicketData, function (error, result) {
      if (error) {
        callback(null, { msg: "Se presento un error" });
        throw error;
      } else {
        callback(null, { msg: "Registro Insertado" });
      }
    });
  }
};

TicketModelo.updateTicket = function (TicketData, callback) {
  if (connection) {
    var sql =
      "UPDATE tickets SET FechaTicket  = " +
      connection.escape(TicketData.FechaTicket) +
      ", PuntoVentaTicket  = " +
      connection.escape(TicketData.PuntoVentaTicket) +
      ", ClienteTicket  = " +
      connection.escape(TicketData.ClienteTicket) +
      " WHERE id_tickets = " +
      connection.escape(TicketData.id_tickets) +
      ";";

    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Actualizado" });
      }
    });
  }
};

TicketModelo.deleteUniversal = function (TicketData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM tickets WHERE id_tickets = " + connection.escape(TicketData.id_tickets) +";";
    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Eliminado" });
      }
    });
  }
};

module.exports = TicketModelo;
