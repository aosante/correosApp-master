(function () {

  var usuario = obtenerDatoLocal('usuario');
  var tipoUsuario = usuario[17];
  var correoUsuario = usuario[5];
  var estados = [];
  var iconosEstados = [];
  var listaEstadosUsuario = [];
  var filtroPaquetes = document.querySelector('#txtFiltro');
  var listaPaquetes = obtenerListaPaquetesDB('get_all_paquetes');
  filtroPaquetes.addEventListener('keyup', mostrarListaPaquetes);

  function obtenerListaPaquetesDB(ruta, esCliente){
    let paquetes = [];
    var typeAjax = esCliente ? 'post' : 'get';
    var datosCliente = esCliente ? { usuario : correoUsuario } : {};

    let peticion = $.ajax({
      url: 'http://localhost:4000/api/'+ruta,
      type: typeAjax,
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data: datosCliente
    });
  
    peticion.done(function(paquetesInfo){
      for(let i = 0; i < paquetesInfo.data.length; i++){
        var paquete = [];
        for (var key in paquetesInfo.data[i]) {
          if (key != '__v' && key != '_id') {
            paquete.push(paquetesInfo.data[i][key]);
          };
        }
        paquetes.push(paquete);
      }
    });
  
    peticion.fail(function(){
      paquetes = [];
      console.log('Ocurrió un error');
    });
  
    return paquetes;
  };
  
  switch (tipoUsuario) {
    case "2":
      listaEstadosUsuario = obtenerListaPaquetesDB('paquetes_by_email', true);
      break;
    case "3":
      estados = ['En transito', 'Proceso de desalmacenaje'];
      iconosEstados = ['fa-shipping-fast', 'fa-people-carry'];
      listaEstadosUsuario = listaPaquetes.filter(function (paquete) {
        return paquete[12] === 'En transito' || paquete[12] === 'Proceso de desalmacenaje';
      });
      break;
    case "4":
      estados = ['Proceso de distribución', 'Recibido en el centro de distribución'];
      iconosEstados = ['fa-dolly', 'fa-box-open'];
      listaEstadosUsuario = listaPaquetes.filter(function (paquete) {
        if (paquete[12] === 'Proceso de desalmacenaje' || paquete[12] === 'Recibido en el centro de distribución') {
          return paquete[3] === usuario[15];
        }
      });
      break;
    case "5":
      estados = ['Tránsito a destino', 'Entregado'];
      iconosEstados = ['fa-truck', 'fa-check-square'];
      listaEstadosUsuario = listaPaquetes.filter(function (paquete) {
        return (paquete[12] === 'Tránsito a destino' || paquete[12] === 'Entregado') && (paquete[13] === usuario[5]);
      });
      break;
  }

  function mostrarListaPaquetes() {
    let tbody = document.querySelector('#paquetesTabla tbody');
    let sFiltro = filtroPaquetes.value;
    tbody.innerHTML = '';

    if(tipoUsuario === '2') {
      document.querySelector('#paquetesTabla .mostrarEstado').style.display = "table-cell";
    } else {
      document.querySelector('#paquetesTabla .mostrarIDCliente').style.display = "table-cell";
      document.querySelector('#paquetesTabla .cambioEstado').style.display = "table-cell";
      document.querySelector('.estadosTitulos').style.display = "block";
      document.querySelector('#estado1').appendChild(document.createTextNode(estados[0]));
      document.querySelector('.estados li:first-child i').classList.add(iconosEstados[0]);
      document.querySelector('.estadosTabla li:first-child i').classList.add(iconosEstados[0]);
      document.querySelector('#estado2').appendChild(document.createTextNode(estados[1]));
      document.querySelector('.estados li:nth-child(2) i').classList.add(iconosEstados[1]);
      document.querySelector('.estadosTabla li:nth-child(2) i').classList.add(iconosEstados[1]);
    }

    for(let i = 0; i < listaEstadosUsuario.length; i++) {
        if(listaEstadosUsuario[i][0].toLowerCase().includes(sFiltro) || listaEstadosUsuario[i][2].toLowerCase().includes(sFiltro) || listaEstadosUsuario[i][6].toLowerCase().includes(sFiltro)) {
          let fila = tbody.insertRow();
          
          if(tipoUsuario != '2') {
            let clienteID = fila.insertCell();
            clienteID.appendChild(document.createTextNode(listaEstadosUsuario[i][8]));
          }
          let numeroTracking = fila.insertCell();
          let courier = fila.insertCell();
          let categoria = fila.insertCell();
          let peso = fila.insertCell();

          if(tipoUsuario === '2') {
            let estadoCliente = fila.insertCell();
            estadoCliente.appendChild(document.createTextNode(listaEstadosUsuario[i][12]));
          }

          if(tipoUsuario != '2') {
            let estadoSwitch = fila.insertCell();
            estadoSwitch.appendChild(crearEstadoSwitch(listaEstadosUsuario[i][0], listaEstadosUsuario[i][12]));
          }

          numeroTracking.appendChild(document.createTextNode(listaEstadosUsuario[i][0]));
          courier.appendChild(document.createTextNode(listaEstadosUsuario[i][2]));
          categoria.appendChild(document.createTextNode(listaEstadosUsuario[i][6]));
          peso.appendChild(document.createTextNode(listaEstadosUsuario[i][1]));

          if (tipoUsuario === '4') {
            let estadoSucursal = fila.insertCell();
            let estadoSucursalTexto = listaEstadosUsuario[i][10] ? listaEstadosUsuario[i][10] : '';
            //estadoSucursal.appendChild(document.createTextNode(estadoSucursalTexto));
          }
        }
    }
  }

  mostrarListaPaquetes();
 
  function crearEstadoSwitch(idPaquete, estado) {
    var onoffswitch = document.createElement('div');
    onoffswitch.classList.add('onoffswitch');

    var inputCheck = document.createElement('input');
    inputCheck.setAttribute('type', 'checkbox');
    inputCheck.setAttribute('name', 'onoffswitch');
    inputCheck.setAttribute('id', 'cambiarEstadoCheck'+idPaquete);

    if (estado === estados[1]) {
      inputCheck.setAttribute('checked', 'checked');
    };
    
    inputCheck.classList.add('onoffswitch-checkbox');
    inputCheck.dataset.paquete = idPaquete;
    inputCheck.addEventListener('change', cambiarEstado);
    
    onoffswitch.appendChild(inputCheck);

    var label = document.createElement('label'); 
    label.setAttribute('for', 'cambiarEstadoCheck'+idPaquete);
    label.classList.add('onoffswitch-label');

    var spanInner = document.createElement('span');
    spanInner.classList.add('onoffswitch-inner');

    var spanSwitch = document.createElement('span');
    spanSwitch.classList.add('onoffswitch-switch');

    label.appendChild(spanSwitch);
    label.prepend(spanInner);
    onoffswitch.appendChild(label);

    return onoffswitch;
  }

  function cambiarEstado() {
    var idPaquete = this.dataset.paquete;
    var newEstado = '';

    if(this.checked) {
      newEstado = estados[1];
    } else {
      newEstado = estados[0];
    }

    $.ajax({
      url: 'http://localhost:4000/api/update_paquete',
      type: 'put',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async: false,
      data: {
        numero_tracking: idPaquete,
        estado: newEstado
      }
    });

    if (newEstado === "Entregado") {
      var paqueteEntregado = listaEstadosUsuario.find(function(paquete) {
        return paquete[0] === idPaquete;
      });

      crearFactura(paqueteEntregado);
    }
  }

  function crearFactura(paqueteEntregado) {
    var cliente =  obtenerUsuarioDB(paqueteEntregado[10]);
    var costoImpuesto = (paqueteEntregado[8]*paqueteEntregado[7])/100;
    var precioFinal = ((paqueteEntregado[5]*paqueteEntregado[14]) + (paqueteEntregado[4]*paqueteEntregado[1]) + (paqueteEntregado[8]+costoImpuesto));

    var data = {
      nombreCliente: cliente[0]+' '+cliente[2],
      numeroFactura: Math.floor(Math.random() * 900) + 100,
      numeroTracking: paqueteEntregado[0],
      fechaEntrega: fechaActual(),
      sucursal: paqueteEntregado[3],
      correo: paqueteEntregado[10],
      direccion: cliente[11]+', '+cliente[12]+', '+cliente[13]+', '+cliente[14],
      precioInicial: paqueteEntregado[8],
      precioFinal: precioFinal,
      costoKilometro: paqueteEntregado[5],
      costoPeso: paqueteEntregado[4],
      distancia: paqueteEntregado[14],
      peso: paqueteEntregado[1],
      impuesto: paqueteEntregado[7] 
    };
    
    swal({
      title: "Factura entregada.",
      button: {
        text: "Cerrar",
        className: "button",
      },
    });

    enviarCorreo('factura', false, false, data);
  }

  function fechaActual() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) dd = '0'+dd

    if(mm<10) mm = '0'+mm;

    return dd + '/' + mm + '/' + yyyy;
  };
})();