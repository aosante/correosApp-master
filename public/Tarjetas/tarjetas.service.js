function guardarTarjeta(pDatosTarjeta) {
    let peticion = $.ajax({
        //los urls tiene que llamarse igual que la ruta en el archivo route
        url: 'http://localhost:4000/api/registrar_tarjeta',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            'id': pDatosTarjeta[0],
            'nombre': pDatosTarjeta[1],
            'numero': pDatosTarjeta[2],
            'year': pDatosTarjeta[3],
            'month': pDatosTarjeta[4],
            'cvv': pDatosTarjeta[5],
            'correo': pDatosTarjeta[6],
            'activo': pDatosTarjeta[7]
            
        }
    });

    peticion.done(function (response) {

    });

    peticion.fail(function () {

    });
}




function obtenerListaTarjeta(numero) {
    let listaTarjetas = [];
    let peticion = $.ajax({
        //los urls tiene que llamarse igual que la ruta en el archivo route
        url: 'http://localhost:4000/api/listar_todas_tarjetas',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data:{}
    });

    peticion.done(function(response) {
        listaTarjetas = response;
    });

    peticion.fail(function() {
        
    });

    return listaTarjetas;
}

function setTemp(numero) {
    localStorage.setItem('tempTarjeta', numero);
}

function getTemp() {
    return localStorage.getItem('tempTarjeta');
}

function removeTemp() {
    localStorage.removeItem('tempTarjeta');
}

function buscarTarjetaPorId(pid) {
    let tarjeta = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/buscar_tarjeta_id',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data: {
            'id' : pid
        }
    });

    peticion.done(function(response) {
        tarjeta = response;
    });

    peticion.fail(function() {

    });

    return tarjeta;
}

function actualizarTarjeta(pDatosTarjeta) {
    console.log(pDatosTarjeta);
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/actualizar_tarjeta',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data:{
            'id': pDatosTarjeta[0],
            'nombre': pDatosTarjeta[1],
            'numero': pDatosTarjeta[2],
            'year': pDatosTarjeta[3],
            'month': pDatosTarjeta[4],
            'cvv': pDatosTarjeta[5],
            'correo': pDatosTarjeta[6],
            'activo': pDatosTarjeta[7]
        }
    });

    peticion.done(function(response) {

    });

    peticion.fail(function() {

    });
}