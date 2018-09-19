function guardarCourier(pDatosCourier) {
    let peticion = $.ajax({
        //los urls tiene que llamarse igual que la ruta en el archivo route
        url: 'http://localhost:4000/api/registrar_courier',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data:{
            'numero' : pDatosCourier[0],
            'nombre' : pDatosCourier[1],
            'activo' : pDatosCourier[2]
        }
    });

    peticion.done(function(response){

    });

    peticion.fail(function() {

    });
}

function obtenerListaCourier(numero) {
    let listaCouriers = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_todos_couriers',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data:{}
    });

    peticion.done(function(response) {
        listaCouriers = response;
    });

    peticion.fail(function() {
        
    });

    return listaCouriers;
}


function buscarCourierPorId(pid) {
    let courier = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_courier_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data: {
            'numero' : pid
        }
    });

    peticion.done(function(response) {
        courier = response;
    });

    peticion.fail(function() {

    });

    return courier;
}



function setTemp(numero) {
    localStorage.setItem('tempCourier', numero);
}

function getTemp() {
    return localStorage.getItem('tempCourier');
}

function removeTemp() {
    localStorage.removeItem('tempCourier');
}

function actualizarCourier(pDatosCourier) {
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizar_courier',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data:{
            'numero' : pDatosCourier[0],
            'nombre' : pDatosCourier[1],
            'activo' : pDatosCourier[2]
        }
    });

    peticion.done(function(response) {

    });

    peticion.fail(function() {

    });
}

