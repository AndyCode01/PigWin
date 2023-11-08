var connection = require("../conexion");

var PuntoVentaModelo = {};

PuntoVentaModelo.getPuntosVenta = function (callback) {
  if (connection) {
    var sql = "SELECT id_punto_venta, " +
                     "NombrePuntoVenta, " +
                     "AdministradorPuntoVenta " +
                     "FROM punto_venta;";
    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

PuntoVentaModelo.getPuntoVentaById = function (id, callback) {
  if (connection) {
    var sql ="SELECT id_punto_venta, " +
             "NombrePuntoVenta, " +
             "AdministradorPuntoVenta " +
             "FROM punto_venta " +
             "WHERE id_punto_venta = " + connection.escape(id) +";";

    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

PuntoVentaModelo.insertPuntoVenta = function (PuntoVentaData, callback) {
  if (connection) {
    var sql = "INSERT INTO punto_venta SET ?";

    connection.query(sql, PuntoVentaData, function (error, result) {
      if (error) {
        callback(null, { msg: "Se presento un error" });
        throw error;
      } else {
        callback(null, { msg: "Registro Insertado" });
      }
    });
  }
};

PuntoVentaModelo.updatePuntoVenta = function (PuntoVentaData, callback) {
  if (connection) {
    var sql =
      "UPDATE punto_venta SET NombrePuntoVenta = " +
      connection.escape(PuntoVentaData.NombrePuntoVenta) +
      ", AdministradorPuntoVenta = " +
      connection.escape(PuntoVentaData.AdministradorPuntoVenta) +
      " WHERE id_punto_venta = " +
      connection.escape(PuntoVentaData.id_punto_venta) +
      ";";

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

PuntoVentaModelo.deletePuntoVenta = function (PuntoVentaData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM punto_venta WHERE id_punto_venta  = " + connection.escape(PuntoVentaData.id_punto_venta) +";";
    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Eliminado" });
      }
    });
  }
};

module.exports = PuntoVentaModelo;
