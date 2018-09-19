let usuario = obtenerDatoLocal('usuario');
let listaRepartidores = obtenerListaDB('all_users_by_type?type=5');
let listaPaquetes = obtenerListaPaquetesDB('Recibido en el centro de distribución');

document.getElementById('guardarRepartidor').addEventListener('click', cambiarEstado);
console.log(listaRepartidores);
agregarRepartidores();
agregarPaquetes();

function obtenerListaPaquetesDB(estado){
    let paquetes = [];

    let peticion = $.ajax({
      url: 'http://localhost:4000/api/get_all_paquetes',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data: {}
    });
  
    peticion.done(function(paquetesInfo){
      for(let i = 0; i < paquetesInfo.data.length; i++){
        var paquete = [];
        for (var key in paquetesInfo.data[i]) {
          if (key != '__v' && key != '_id') {
            paquete.push(paquetesInfo.data[i][key]);
          };
        }

        if (paquete[12] === estado && paquete[3] === usuario[15]) {
            paquetes.push(paquete);
        }
      }
    });
  
    peticion.fail(function(){
      paquetes = [];
      console.log('Ocurrió un error');
    });
  
    return paquetes;
};


function agregarRepartidores() {
    for(let i = 0; i < listaRepartidores.length; i++) {
        let opcion = document.createElement('option');
        opcion.value = listaRepartidores[i][5];
        opcion.innerText = listaRepartidores[i][0] + ' ' + listaRepartidores[i][2];
        document.getElementById('sltRepartidor').appendChild(opcion);
    }
};

function agregarPaquetes() {
    for(let i = 0; i < listaPaquetes.length; i++) {
        let opcion = document.createElement('option');
        opcion.value = listaPaquetes[i][0];
        opcion.innerText = listaPaquetes[i][0];
        document.getElementById('sltPaquete').appendChild(opcion);
    }
};

function cambiarEstado() {
    let inputs = document.querySelectorAll('input:required, select');
    let error = validarInputsRequeridos(inputs);

    if(error == true ) {
      mostrarMensajeModal('error formulario');
      return false;
    }

    var idPaquete = document.getElementById('sltPaquete').value;
    var newRepartidor = document.getElementById('sltRepartidor').value;
    var distancia = document.getElementById('distancia').value;
    var newEstado = 'Tránsito a destino';

    var peticion = $.ajax({
      url: 'http://localhost:4000/api/update_paquete',
      type: 'put',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async: false,
      data: {
        numero_tracking: idPaquete,
        estado: newEstado,
        repartidor: newRepartidor,
        distancia_kilometro: distancia,
      }
    });

    peticion.done(function(response) {
        document.getElementById('formAsignar').reset();
    });
}

function mostrarTabla() {
    let listaPaquetes1 = obtenerListaPaquetesDB('Tránsito a destino');
    let listaPaquetes2 = obtenerListaPaquetesDB('Entregado');

    let listaPaquetes = listaPaquetes1.concat(listaPaquetes2); 
    let tbody = document.querySelector('#paquetesListaTabla tbody');

    listaPaquetes.forEach(paquete => {
        let fila = tbody.insertRow();
        let number = fila.insertCell();
        let repartidor = fila.insertCell();
        let repartidorEmail = fila.insertCell();
        let estado = fila.insertCell();
        let repartidorUsuario = listaRepartidores.find(function(repartidor) {
            return repartidor[5] === paquete[13];
        })

        number.appendChild(document.createTextNode(paquete[0]));
        repartidor.appendChild(document.createTextNode(repartidorUsuario[0]+' '+repartidorUsuario[2]));
        repartidorEmail.appendChild(document.createTextNode(paquete[13]));
        estado.appendChild(document.createTextNode(paquete[12]));
    });
}

mostrarTabla();


