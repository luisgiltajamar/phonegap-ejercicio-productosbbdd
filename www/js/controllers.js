angular.module('starter.controllers', [])
    .controller("RegistroCtrl",function($scope,$state,Bbdd){

        $scope.producto={};

        $scope.guardar=function(){

            Bbdd.addProducto($scope.producto);

            alert("Guardado");

         /*   $scope.producto.nombre="";
            $scope.producto.precio=0;
*/

        };

        $scope.buscar=function(){

            if($scope.producto.nombre !=""){

                Bbdd.setBusqueda($scope.producto.nombre);

                //sessionStorage.busqueda=$scope.producto.nombre;

                $state.go("productos.busqueda");
            }
            else{

                alert("Indica el criterio de busqueda");
            }

        };



    })
    .controller("BuscarCtrl", function ($scope,Bbdd) {

        $scope.productos=[];

        Bbdd.buscarProducto(Bbdd.getBusqueda()).then(
            function (res) {
                $scope.productos=res;
            },
            function(err){

                alert(err);
            }

        );

    });
