var connection = require("../conexion");
var EstadisticaEquipoModelo = {};

EstadisticaEquipoModelo.getEstadisticas = function (callback) {
  if (connection) {
    var sql =
      "SELECT ee.id_estadisticas_equipos, " +
      "e.NombreEquipo AS 'Equipo Estadisticas', " +
      "cu.NombreCatalogo AS 'Apartado Importante', " +
      "ee.ValorApartado AS 'Valor Apartado' FROM estadisticas_equipos AS ee " +
      "INNER JOIN equipos AS e ON ee.EquipoEstadisticas = e.id_equipos " +
      "INNER JOIN catalogo_universal AS cu ON ee.ApartadoImportante = cu.id_catalogo_universal;";
    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

EstadisticaEquipoModelo.getEstadisticasByTip = function (tip, callback) {
  if (connection) {
    var sql =
      "SELECT ee.id_estadisticas_equipos, " +
      "e.NombreEquipo AS 'Equipo Estadisticas', " +
      "cu.NombreCatalogo AS 'Apartado Importante', " +
      "ee.ValorApartado AS 'Valor Apartado' FROM estadisticas_equipos AS ee " +
      "INNER JOIN equipos AS e ON ee.EquipoEstadisticas = e.id_equipos " +
      "INNER JOIN catalogo_universal AS cu ON ee.ApartadoImportante = cu.id_catalogo_universal WHERE e.id_equipos = " +
      connection.escape(tip) + ";";
    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

EstadisticaEquipoModelo.getEstadisticasById = function (id, callback) {
  if (connection) {
    var sql =
      "SELECT ee.id_estadisticas_equipos, " +
      "e.NombreEquipo AS 'Equipo Estadisticas', " +
      "cu.NombreCatalogo AS 'Apartado Importante', " +
      "ee.ValorApartado AS 'Valor Apartado' FROM estadisticas_equipos AS ee " +
      "INNER JOIN equipos AS e ON ee.EquipoEstadisticas = e.id_equipos " +
      "INNER JOIN catalogo_universal AS cu ON ee.ApartadoImportante = cu.id_catalogo_universal WHERE ee.id_estadisticas_equipos = " +
      connection.escape(id) + ";";
    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

EstadisticaEquipoModelo.insertEstadisticaEquipo = function (EstadisticaEquipoData, callback) {
    if (connection) {
      var sql = "INSERT INTO estadisticas_equipos SET ?";
  
      connection.query(sql, EstadisticaEquipoData, function (error, result) {
        if (error) {
          callback(null, { msg: "Se presento un error" });
          throw error;
        } else {
          callback(null, { msg: "Registro Insertado" });
        }
      });
    }
};

EstadisticaEquipoModelo.updateEstadisticaEquipo = function (EstadisticaEquipoData, callback) {
    if (connection) {
      var sql =
        "UPDATE estadisticas_equipos SET EquipoEstadisticas = " +
        connection.escape(EstadisticaEquipoData.EquipoEstadisticas) +
        ", ApartadoImportante = " +
        connection.escape(EstadisticaEquipoData.ApartadoImportante) +
        ", ValorApartado = " +
        connection.escape(EstadisticaEquipoData.ValorApartado) +
        " WHERE id_estadisticas_equipos = " +
        connection.escape(EstadisticaEquipoData.id_estadisticas_equipos) +";";
  
      connection.query(sql, function (error, result) {
        if (error) {
          throw error;
        } else {
          callback(null, { msg: "Registro Actualizado" });
        }
      });
    }
  };
  
EstadisticaEquipoModelo.deleteEstadisticaEquipo = function (EstadisticaEquipoData, callback) {
    if (connection) {
      var sql =
        "DELETE FROM estadisticas_equipos WHERE id_estadisticas_equipos = " + connection.escape(EstadisticaEquipoData.id_estadisticas_equipos) +";";
      connection.query(sql, function (error, result) {
        if (error) {
          throw error;
        } else {
          callback(null, { msg: "Registro Eliminado" });
        }
      });
    }
  };

module.exports = EstadisticaEquipoModelo;