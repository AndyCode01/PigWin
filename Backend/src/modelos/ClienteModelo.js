var connection = require("../conexion");

var ClienteModelo = {};

ClienteModelo.getClientes = function (callback) {
  if (connection) {
    var sql =
      "SELECT c.id_clientes, " +
      "cu1.NombreCatalogo AS 'Tipo Documento', " +
      "c.NumeroDocumento AS 'Numero Documento', " +
      "cu2.NombreCatalogo AS 'Metodo De Pago', " +
      "cu3.NombreCatalogo AS 'Sexo', " +
      "c.PrimerNombre AS 'Primer Nombre', " +
      "c.SegundoNombre AS 'Segundo Nombre', " +
      "c.PrimerApellido AS 'Primer Apellido', " +
      "c.SegundoApellido AS 'Segundo Apellido' " +
      "FROM Clientes AS c " +
      "LEFT JOIN catalogo_universal AS cu1 ON c.TipoDocumento = cu1.id_catalogo_universal " +
      "LEFT JOIN catalogo_universal AS cu2 ON C.MetodoDePago = cu2.id_catalogo_universal " +
      "LEFT JOIN catalogo_universal AS cu3 ON c.Sexo = cu3.id_catalogo_universal;";

    connection.query(sql, function (error, rows) {
      if (error) {
        throw error;
      } else {
        callback(null, rows);
      }
    });
  }
};

ClienteModelo.getClienteByTip = function (tip, callback) {
  if (connection) {
    var sql =
      "SELECT c.id_clientes, " +
      "cu1.NombreCatalogo AS 'Tipo Documento', " +
      "c.NumeroDocumento AS 'Numero Documento', " +
      "cu2.NombreCatalogo AS 'Metodo De Pago', " +
      "cu3.NombreCatalogo AS 'Sexo', " +
      "c.PrimerNombre AS 'Primer Nombre', " +
      "c.SegundoNombre AS 'Segundo Nombre', " +
      "c.PrimerApellido AS 'Primer Apellido', " +
      "c.SegundoApellido AS 'Segundo Apellido'" +
      "FROM Clientes AS c " +
      "LEFT JOIN catalogo_universal AS cu1 ON c.TipoDocumento = cu1.id_catalogo_universal " +
      "LEFT JOIN catalogo_universal AS cu2 ON C.MetodoDePago = cu2.id_catalogo_universal " +
      "LEFT JOIN catalogo_universal AS cu3 ON c.Sexo = cu3.id_catalogo_universal WHERE c.TipoDocumento = " + connection.escape(tip) +";";

    connection.query(sql, function (error, rows) {
    
      if (error) {
        throw error;
      } else {
        callback(null, rows);
        
      }
    });
  }
};

ClienteModelo.getClienteById = function (id, callback) {
  if (connection) {
    var sql =
      "SELECT c.id_clientes, " +
      "cu1.NombreCatalogo AS 'Tipo Documento', " +
      "c.NumeroDocumento AS 'Numero Documento', " +
      "cu2.NombreCatalogo AS 'Metodo De Pago', " +
      "cu3.NombreCatalogo AS 'Sexo', " +
      "c.PrimerNombre AS 'Primer Nombre', " +
      "c.SegundoNombre AS 'Segundo Nombre', " +
      "c.PrimerApellido AS 'Primer Apellido', " +
      "c.SegundoApellido AS 'Segundo Apellido'" +
      "FROM Clientes AS c " +
      "LEFT JOIN catalogo_universal AS cu1 ON c.TipoDocumento = cu1.id_catalogo_universal " +
      "LEFT JOIN catalogo_universal AS cu2 ON C.MetodoDePago = cu2.id_catalogo_universal " +
      "LEFT JOIN catalogo_universal AS cu3 ON c.Sexo = cu3.id_catalogo_universal WHERE c.id_clientes = " + connection.escape(id) +";";

    connection.query(sql, function (error, rows) {
    
      if (error) {
        throw error;
      } else {
        callback(null, rows);
        
      }
    });
  }
};

ClienteModelo.insertCliente = function (ClienteData, callback) {
  if (connection) {
    var sql = "INSERT INTO clientes SET ?";
    connection.query(sql, ClienteData, function (error, result) {
      if (error) {
        callback(null, { msg: "Se presento un error" });
        throw error;
      } else {
        callback(null, { msg: "Registro Insertado" });
      }
    });
  }
};

ClienteModelo.updateCliente = function (ClienteData, callback) {
  if (connection) {
    var sql =
      "UPDATE clientes SET TipoDocumento = " +
      connection.escape(ClienteData.TipoDocumento) +
      ", NumeroDocumento = " +
      connection.escape(ClienteData.NumeroDocumento) +
      ", MetodoDePago  = " +
      connection.escape(ClienteData.MetodoDePago) +
      ", Sexo  = " +
      connection.escape(ClienteData.Sexo) +
      ", PrimerNombre = " +
      connection.escape(ClienteData.PrimerNombre) +
      ", SegundoNombre = " +
      connection.escape(ClienteData.SegundoNombre) +
      ", PrimerApellido = " +
      connection.escape(ClienteData.PrimerApellido) +
      ", SegundoApellido = " +
      connection.escape(ClienteData.SegundoApellido) +
      " WHERE id_clientes = " +
      connection.escape(ClienteData.id_clientes) +
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

ClienteModelo.deleteCliente = function (ClienteData, callback) {
  if (connection) {
    var sql =
      "DELETE FROM clientes WHERE id_clientes = " + connection.escape(ClienteData.id_clientes) +";";
    connection.query(sql, function (error, result) {
      if (error) {
        throw error;
      } else {
        callback(null, { msg: "Registro Eliminado" });
      }
    });
  }
};

module.exports = ClienteModelo;
