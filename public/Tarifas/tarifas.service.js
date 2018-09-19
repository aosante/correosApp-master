function guardarTarifaDB(datos) {
    let mensaje = false;

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_tarifa',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            peso: datos[0],
            sucursal: datos[1],
            kilometro: datos[2],
            activo: datos[3],
        }
    });

    peticion.done(function (response) {
        mensaje = 'Se registró con éxito';
    });

    peticion.fail(function () {
        mensaje = false;
    });

    return mensaje;
}

function obtenerListaTarifaDB() {
    let lista = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_tarifa',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {}
    });

    peticion.done(function (tiposArticulos) {
        for (let i = 0; i < tiposArticulos.length; i++) {
            var dato = [];
            for (var key in tiposArticulos[i]) {
                if (key != '__v') {
                    dato.push(tiposArticulos[i][key]);
                };
            }
            lista.push(dato);
        }
        console.log('Petición realizada con éxito');
    });

    peticion.fail(function () {
        lista = [];
        console.log('Ocurrió un error');
    });

    return lista;
};

function obtenerTarifaDB(id) {
    let usuario = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_tarifa',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            id: id
        }
    });

    peticion.done(function (usuarioInfo) {
        for (var key in usuarioInfo.dato) {
            if (key != '__v') {
                usuario.push(usuarioInfo.dato[key]);
            };
        };
        console.log('Petición realizada con éxito');
    });

    peticion.fail(function () {
        usuario = false;
        console.log('Ocurrió un error');
    });

    return usuario;
};

function actualizarTarifaDB(datos) {
    let esValido = false;

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/update_tarifa',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: datos[0],
            peso: datos[1],
            sucursal: datos[2],
            kilometro: datos[3],
            activo: datos[4],
        }
    });

    peticion.done(function () {
        esValido = true;
    });

    peticion.fail(function () {
        esValido = false;
    });

    return esValido;
};