var connection = require("../conexion");

var PartidoModelo = {};

PartidoModelo.getPartidos = function (callback){
    if(connection){
        var sql =
          "SELECT p.id_partidos, " +
          "e1.NombreEquipo AS 'Equipo Local', " +
          "e2.NombreEquipo AS 'Equipo Visitante', " +
          "p.FechaPartido AS 'FechaPartido', " +
          "cu.NombreCatalogo AS Deporte " +
          "FROM partidos AS p " +
          "LEFT JOIN equipos AS e1 ON P.EquipoLocal = e1.id_equipos " +
          "LEFT JOIN equipos AS e2 ON P.EquipoVisitante = e2.id_equipos " +
          "LEFT JOIN catalogo_universal AS cu ON p.Deporte = cu.id_catalogo_universal;";

        connection.query(sql, function (error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
};

PartidoModelo.getPartidoByTip = function (tip, callback){
    if(connection){
        var sql =
          "SELECT p.id_partidos, " +
          "e1.NombreEquipo AS 'Equipo Local', " +
          "e2.NombreEquipo AS 'Equipo Visitante', " +
          "p.FechaPartido AS 'FechaPartido', " +
          "cu.NombreCatalogo AS Deporte " +
          "FROM partidos AS p " +
          "LEFT JOIN Equipos AS e1 ON p.EquipoLocal = e1.id_equipos " +
          "LEFT JOIN Equipos AS e2 ON p.EquipoVisitante = e2.id_equipos " +
          "LEFT JOIN catalogo_universal AS cu ON p.Deporte = cu.id_catalogo_universal WHERE p.Deporte = " +
          connection.escape(tip) +
          ";";

        connection.query(sql, function (error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
};

PartidoModelo.getPartidoById = function (id, callback){
    if(connection){
        var sql =
          "SELECT p.id_partidos, " +
          "e1.NombreEquipo AS 'Equipo Local', " +
          "e2.NombreEquipo AS 'Equipo Visitante', " +
          "p.FechaPartido AS 'FechaPartido', " +
          "cu.NombreCatalogo AS 'Deporte' " +
          "FROM partidos AS p " +
          "LEFT JOIN Equipos AS e1 ON p.EquipoLocal = e1.id_equipos " +
          "LEFT JOIN Equipos AS e2 ON p.EquipoVisitante = e2.id_equipos " +
          "LEFT JOIN catalogo_universal AS cu ON p.Deporte = cu.id_catalogo_universal WHERE p.id_partidos = " +
          connection.escape(id) +
          ";";

        connection.query(sql, function (error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
};

PartidoModelo.insertPartido = function (PartidoData, callback){
    if(connection){
        var sql = "INSERT INTO partidos SET ?";

        connection.query(sql, PartidoData, function(error, result){
            if(error){
                callback(null, {msg: "Se presento un error"});
                throw error;
            }else{
                callback(null, {msg: "Registro Insertado"});
            }
        });
    }
};

PartidoModelo.updatePartido = function (PartidoData, callback){
    if(connection){
        var sql = "UPDATE partidos SET EquipoLocal  = " +
        connection.escape(PartidoData.EquipoLocal) +
        ", EquipoVisitante  = " +
        connection.escape(PartidoData.EquipoVisitante) +
        ", FechaPartido = " +
        connection.escape(PartidoData.FechaPartido) +
        ", Deporte  = " +
        connection.escape(PartidoData.Deporte) +
        ", GanadorPartido  = " +
        connection.escape(PartidoData.GanadorPartido) +
        " WHERE id_partidos = " +
        connection.escape(PartidoData.id_partidos) +
        ";";

        connection.query(sql, function (error, result){
            if(error){
                throw error;
            }else{
                callback(null,{msg: "Registro Actualizado"});
            }
        });
    }
};

PartidoModelo.deletePartido = function (PartidoData, callback) {
    if (connection) {
      var sql =
        "DELETE FROM partidos WHERE id_partidos = " + connection.escape(PartidoData.id_partidos ) +";";
      connection.query(sql, function (error, result) {
        if (error) {
          throw error;
        } else {
          callback(null, { msg: "Registro Eliminado" });
        }
      });
    }
  };

module.exports = PartidoModelo;