var connection = require("../conexion");

var ApuestaModelo = {};

ApuestaModelo.getApuestas = function (callback) {
  if (connection) {
    var sql =
      "SELECT a.id_apuestas, " +
      "CONCAT(c.PrimerNombre, ' ', c.SegundoNombre, ' ', c.PrimerApellido, ' ', c.SegundoApellido) AS 'Cliente', " +
      "CONCAT(e1.NombreEquipo, ' vs ', e2.NombreEquipo) AS 'Partido Apuesta', " +
      "e3.NombreEquipo AS 'Equipo Apuesta', " +
      "a.MontoApuesta AS 'Monto Apuesta' " +
      "FROM apuestas AS a " +
      "INNER JOIN tickets AS t ON a.TicketApuesta = t.id_tickets " +
      "INNER JOIN clientes AS c ON t.ClienteTicket = c.id_clientes " +
      "INNER JOIN partidos AS p ON a.PartidoApuesta = p.id_partidos " +
      "INNER JOIN equipos AS e1 ON p.EquipoLocal = e1.id_equipos " +
      "INNER JOIN equipos AS e2 ON p.EquipoVisitante = e2.id_equipos " +
      "INNER JOIN equipos AS e3 ON a.EquipoApuesta = e3.id_equipos " +
      "ORDER BY id_apuestas;";

    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

ApuestaModelo.getApuestabyTip = function (tip, callback) {
  if (connection) {
    var sql =
    "SELECT a.id_apuestas, " +
    "CONCAT(c.PrimerNombre, ' ', c.SegundoNombre, ' ', c.PrimerApellido, ' ', c.SegundoApellido) AS 'Cliente', " +
    "CONCAT(e1.NombreEquipo, ' vs ', e2.NombreEquipo) AS 'Partido Apuesta', " +
    "e3.NombreEquipo AS 'Equipo Apuesta', " +
    "a.MontoApuesta AS 'Monto Apuesta' " +
    "FROM apuestas AS a " +
    "INNER JOIN tickets AS t ON a.TicketApuesta = t.id_tickets " +
    "INNER JOIN clientes AS c ON t.ClienteTicket = c.id_clientes " +
    "INNER JOIN partidos AS p ON a.PartidoApuesta = p.id_partidos " +
    "INNER JOIN equipos AS e1 ON p.EquipoLocal = e1.id_equipos " +
    "INNER JOIN equipos AS e2 ON p.EquipoVisitante = e2.id_equipos " +
    "INNER JOIN equipos AS e3 ON a.EquipoApuesta = e3.id_equipos  WHERE c.id_clientes = " + connection.escape(tip) + ";"; 
    connection.query(sql, function (error, rows) {
      
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

ApuestaModelo.getApuestaById = function (id, callback) {
  if (connection) {
    var sql =
    "SELECT a.id_apuestas, " +
    "CONCAT(c.PrimerNombre, ' ', c.SegundoNombre, ' ', c.PrimerApellido, ' ', c.SegundoApellido) AS 'Cliente', " +
    "CONCAT(e1.NombreEquipo, ' vs ', e2.NombreEquipo) AS 'Partido Apuesta', " +
    "e3.NombreEquipo AS 'Equipo Apuesta', " +
    "a.MontoApuesta AS 'Monto Apuesta' " +
    "FROM apuestas AS a " +
    "INNER JOIN tickets AS t ON a.TicketApuesta = t.id_tickets " +
    "INNER JOIN clientes AS c ON t.ClienteTicket = c.id_clientes " +
    "INNER JOIN partidos AS p ON a.PartidoApuesta = p.id_partidos " +
    "INNER JOIN equipos AS e1 ON p.EquipoLocal = e1.id_equipos " +
    "INNER JOIN equipos AS e2 ON p.EquipoVisitante = e2.id_equipos " +
    "INNER JOIN equipos AS e3 ON a.EquipoApuesta = e3.id_equipos  WHERE a.id_apuestas = " + connection.escape(id) + ";"; 
    connection.query(sql, function (error, rows) {
      
      if (error) {
        throw error;
      } else {
        callback(null, rows);
        
      }
    });
  }
};

ApuestaModelo.insertApuesta = function (ApuestaData, callback) {
  if (connection) {
    var sql = "INSERT INTO apuestas SET ?";

    connection.query(sql, ApuestaData, function (error, result) {
      
      if (error) {
        callback(null, { msg: "Se presento un error" });
        throw error;
      } else {
        callback(null, { msg: "Registro Insertado" });
      }
    });
  }
};

ApuestaModelo.updateApuesta = function (ApuestaData, callback) {
  if (connection) {
    var sql =
      "UPDATE apuestas SET TicketApuesta = " +
      connection.escape(ApuestaData.TicketApuesta ) +
      ", PartidoApuesta   = " +
      connection.escape(ApuestaData.PartidoApuesta ) +
      ", EquipoApuesta = " +
      connection.escape(ApuestaData.EquipoApuesta) +
      ", MontoApuesta = " +
      connection.escape(ApuestaData.MontoApuesta) +
      " WHERE id_apuestas = " +
      connection.escape(ApuestaData.id_apuestas) +";";

    connection.query(sql, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Actualizado" });
      }
    });
  }
};

ApuestaModelo.deleteApuesta = function (ApuestaData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM apuestas WHERE id_apuestas = " + connection.escape(ApuestaData.id_apuestas) +";";
    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Eliminado" });
      }
    });
  }
};

module.exports = ApuestaModelo;
