var connection = require("../conexion");
//creamos un objeto para ir almacenandotodo lo que necesitemos
var UniversalModelo = {};


//obtenemos todos los Catalogos Universales
UniversalModelo.getUniversales = function (callback) {
  if (connection) {
    var sql =
      "SELECT cu.id_catalogo_universal, " +
      "cu.NombreCatalogo, " +
      "cu.TipoCatalogo " +
      "FROM catalogo_universal cu;";
    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

//---------------------------------------------------------------
//obtenemos un tipo de Catalogo Universal
UniversalModelo.getUniversalTipo = function (tip, callback) {
  if (connection) {
    var sql =
      "SELECT cu.id_catalogo_universal, " +
      "cu.NombreCatalogo, " +
      "cu.TipoCatalogo " +
      "FROM catalogo_universal cu WHERE cu.TipoCatalogo  = " + connection.escape(tip) +";";

    connection.query(sql, function (error, rows) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

//obtenemos un Catalogo Universal por su id
UniversalModelo.getUniversal = function (id, callback) {
  if (connection) {
    var sql =
      "SELECT cu.id_catalogo_universal, " +
      "cu.NombreCatalogo , " +
      "cu.TipoCatalogo " +
      "FROM catalogo_universal cu WHERE cu.id_catalogo_universal = " + connection.escape(id) +";";

    connection.query(sql, function (error, rows) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};


//obtenemos un Catalogo Universal por su tipo y por id
UniversalModelo.getUniversalByTipAndId = function (tipcat, id, callback) {
  if (connection) {
    var sql =
      "SELECT cu.id_catalogo_universal, " +
      "cu.NombreCatalogo, " +
      "cu.TipoCatalogo " +
      "FROM catalogo_universal cu " +
      "WHERE cu.TipoCatalogo  = " + connection.escape(tipcat) +
      "AND cu.id_catalogo_universal = " + connection.escape(id) + ";";

    connection.query(sql, function (error, rows) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, rows);
        //callback(null, JSON.stringify(rows));
      }
    });
  }
};

//---------------------------------------------------------------
//añadir un nuevo Catalogo Universal

UniversalModelo.insertUniversal = function (UniversalData, callback) {
  if (connection) {
    var sql = "INSERT INTO catalogo_universal SET ?";

    connection.query(sql, UniversalData, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        callback(null, { msg: "Se presento un error" });
        throw error;
      } else {
        callback(null, { msg: "Registro Insertado" });
      }
    });
  }
};

//---------------------------------------------------------------
//actualizar un Catalogo Universal
UniversalModelo.updateUniversal = function (UniversalData, callback) {
  if (connection) {
    var sql =
      "UPDATE catalogo_universal SET NombreCatalogo = " +
      connection.escape(UniversalData.NombreCatalogo) +
      ", TipoCatalogo  = " +
      connection.escape(UniversalData.TipoCatalogo ) +
      " WHERE id_catalogo_universal  = " +
      connection.escape(UniversalData.id_catalogo_universal ) +
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

UniversalModelo.deleteUniversal = function (UniversalData, callback) {
  if (connection) {
    var sql = "DELETE FROM catalogo_universal WHERE id_catalogo_universal = " + connection.escape(UniversalData.id_catalogo_universal) + ";";
    connection.query(sql, function (error, result) {
      //se muestra el mensaje correspondiente
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Eliminado" });
      }
    });
  }
};

//---------------------------------------------------------------
//exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = UniversalModelo;
