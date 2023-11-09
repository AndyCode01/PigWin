var connection = require("../conexion");
var EquipoModelo = {};

EquipoModelo.getEquipos = function (callback) {
  if (connection) {
    var sql =
      "SELECT e.id_equipos, " +
      "e.NombreEquipo, " +
      "cu.NombreCatalogo AS 'Deporte' FROM equipos AS e " +
      "INNER JOIN catalogo_universal AS cu ON e.Deporte = cu.id_catalogo_universal;";
    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

EquipoModelo.getEquipoById = function (id, callback) {
  if (connection) {
    var sql =
      "SELECT e.id_equipos, " +
      "e.NombreEquipo, " +
      "cu.NombreCatalogo FROM equipos AS e " +
      "INNER JOIN catalogo_universal AS cu ON e.Deporte = cu.id_catalogo_universal WHERE e.id_equipos = " +
      connection.escape(id) +
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

EquipoModelo.insertEquipo = function (EquipoData, callback) {
  if (connection) {
    var sql = "INSERT INTO equipos SET ?";

    connection.query(sql, EquipoData, function (error, result) {
      if (error) {
        callback(null, { msg: "Se presento un error" });
        throw error;
      } else {
        callback(null, { msg: "Registro Insertado" });
      }
    });
  }
};

EquipoModelo.updateEquipo = function (EquipoData, callback) {
  if (connection) {
    var sql =
      "UPDATE equipos SET NombreEquipo = " +
      connection.escape(EquipoData.NombreEquipo) +
      ", Deporte = " +
      connection.escape(EquipoData.Deporte) +
      " WHERE id_equipos  = " +
      connection.escape(EquipoData.id_equipos) +
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

EquipoModelo.deleteEquipo = function (EquipoData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM equipos WHERE id_equipos = " +
      connection.escape(EquipoData.id_equipos) +
      ";";
    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Eliminado" });
      }
    });
  }
};
module.exports = EquipoModelo;
