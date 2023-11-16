var connection = require("../conexion");

var InformeModelo = {};

InformeModelo.getInforme = function (query, callback) {
  if (connection) {
    var sql = "SELECT `id`,`Deporte`,`Equipo Local`,`Equipo Visitante`, DATE_FORMAT(`Fecha del Partido`, '%H:%i %m-%d') AS `Fecha del Partido`,`Equipo Ganador` FROM reporte_partidos WHERE `Fecha del Partido`BETWEEN " +`'${query.FechaInicio}' AND '${query.FechaFinal}'`; 
    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        console.log(sql);
        callback(null, rows);
      }
    });
  }
};

module.exports = InformeModelo;