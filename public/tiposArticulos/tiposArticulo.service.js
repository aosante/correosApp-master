function guardarTipoArticuloDB(datos) {
    let mensaje = false;

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_article',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            categoria: datos[0],
            impuesto: datos[1],
            activo: datos[2]
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

function obtenerListaTipoArticuloDB() {
    let lista = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_article',
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

function obtenerTipoArticuloDB(id) {
    let usuario = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_article',
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

function actualizarTipoArticuloDB(datos) {
    let esValido = false;

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/update_article',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: datos[0],
            categoria: datos[1],
            impuesto: datos[2],
            activo: datos[3]
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