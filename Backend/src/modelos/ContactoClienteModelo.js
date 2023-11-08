
var connection = require("../conexion");

var ContactoClienteModelo = {};

ContactoClienteModelo.getContactosCliente = function (callback){
    if(connection){
        var sql = "SELECT cc.id_contacto_cliente, " +
                  "c.PrimerNombre AS 'Primer Nombre', " +
                  "c.SegundoNombre AS 'Segundo Nombre', " +
                  "cc.TipoContacto AS 'Tipo Contacto', " +
                  "cc.ValorContacto AS 'Valor Contacto' " +
                  "FROM contacto_cliente AS cc " +
                  "JOIN clientes AS c ON cc.Cliente = c.id_clientes;";
        connection.query(sql, function (error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
};

ContactoClienteModelo.getContactoClienteByTip = function (tip, callback){
    if(connection){
        var sql = "SELECT cc.id_contacto_cliente, " +
        "c.PrimerNombre AS 'Primer Nombre', " +
        "c.SegundoNombre AS 'Segundo Nombre', " +
        "cc.TipoContacto AS 'Tipo Contacto', " +
        "cc.ValorContacto AS 'Valor Contacto' " +
        "FROM contacto_cliente AS cc " +
        "JOIN clientes AS c ON cc.Cliente = c.id_clientes " +
        "WHERE cc.Cliente = " + connection.escape(tip) + ";";

        connection.query(sql, function (error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
};

ContactoClienteModelo.getContactoClienteById = function (id, callback){
    if(connection){
        var sql = "SELECT cc.id_contacto_cliente, " +
        "c.PrimerNombre AS 'Primer Nombre', " +
        "c.SegundoNombre AS 'Segundo Nombre', " +
        "cc.TipoContacto AS 'Tipo Contacto', " +
        "cc.ValorContacto AS 'Valor Contacto' " +
        "FROM contacto_cliente AS cc " +
        "JOIN clientes AS c ON cc.Cliente = c.id_clientes " +
        "WHERE id_contacto_cliente = " + connection.escape(id) + ";";

        connection.query(sql, function (error, rows){
            if(error){
                throw error;
            }else{
                callback(null, rows);
            }
        });
    }
};

ContactoClienteModelo.insertContactoCliente = function(ContactoClienteData, callback){
    if(connection){
        var sql = "INSERT INTO contacto_cliente SET ?";

        connection.query(sql, ContactoClienteData, function (error, result){
            if(error){
                callback(null, {msg: "Se presento un error"});
                throw error;
            }else{
                callback(null, {msg: "Registro Insertado"});
            }
        });
    }
};

ContactoClienteModelo.updateContactoCliente = function (ContactoClienteData, callback){
    if(connection){
        var sql = 
         "UPDATE contacto_cliente SET Cliente = " +
         connection.escape(ContactoClienteData.Cliente) +
         ", TipoContacto = " +
         connection.escape(ContactoClienteData.TipoContacto) +
         ", ValorContacto = " +
         connection.escape(ContactoClienteData.ValorContacto) +
         " WHERE id_contacto_cliente = " +
         connection.escape(ContactoClienteData.id_contacto_cliente) +
         ";";
        
         connection.query(sql, function (error, result){
            if(error){
                throw error;
            }else{
                callback(null, { msg: "Registro Actualizado"});
            }
         });
    }
};

ContactoClienteModelo.deleteContactoCliente = function (ContactoClienteData, callback) {
    if (connection) {
      var sql =
        "DELETE FROM contacto_cliente WHERE id_contacto_cliente = " + connection.escape(ContactoClienteData.id_contacto_cliente) +";";
      connection.query(sql, function (error, result) {
        if (error) {
          throw error;
        } else {
          callback(null, { msg: "Registro Eliminado" });
        }
      });
    }
  };

module.exports = ContactoClienteModelo;