angular.module('starter.services', [])

.factory('Bbdd',function($q){

        var busqueda;

        var db = openDatabase("Productos", "", "Base productos",
                1024 * 1024,
            function (db) {
                db.transaction(function (tx) {
                        tx.executeSql("create table if not exists Producto " +
                        "(id integer primary key autoincrement,"+
                        "nombre,precio float)");



                    },


                    function (err) {

                        alert(err.toString());

                    });
            });

        return{
            setBusqueda:function(bus){

            busqueda=bus;
        },
            getBusqueda:function(){
                return busqueda;

            },


            addProducto:function(producto){

                var db = openDatabase("Productos", "", "Base productos",
                    1024 * 1024);

                db.transaction(function (tx) {

                    tx.executeSql("insert into Producto"+
                            " (nombre,precio) values(?,?)",
                            [producto.nombre, producto.precio]
                        );
                });

            },
            buscarProducto:function(nombre){
                var db = openDatabase("Productos", "", "Base productos",
                    1024 * 1024);

                var deferred=$q.defer();

                db.transaction(function(tx){

                    tx.executeSql("select * from Producto where nombre"+
                        " like ?",["%"+nombre+"%"],

                        function(tran,res){

                            var productos=[];

                            for(var i=0;i<res.rows.length;i++){
                                var o={
                                    id:res.rows.item(i).id,
                                    nombre:res.rows.item(i).nombre,
                                    precio:res.rows.item(i).precio

                                };
                                productos.push(o);

                            }


                            deferred.resolve(productos);

                        },
                        function(tran,err){
                            deferred.reject(err);

                        }
                    );



                });
                return deferred.promise;



            }

        }





    });
