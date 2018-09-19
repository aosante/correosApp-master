// import { listarConv } from "../../api/components/convenios/convenios.api";


function setTemp(data){
    localStorage.setItem('tempLs', JSON.stringify(data));
}
function getTemp(){
    return JSON.parse(localStorage.getItem('tempLs'));
}
function removeTemp(){
   localStorage.removeItem('tempLs');
}

function buscarConvenio(pId){
    let listaConvenios=obtenerConveniosbd();
    let convenioEncontrado=[];
    for(let i=0;i<listaConvenios.length;i++){
    if(pId == listaConvenios[i]['_id']){
        convenioEncontrado=listaConvenios[i];
        break;
    }
}
    return convenioEncontrado;
}

function actualizarConvenio(pDatosConvenio){
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/update_convenios',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data:{
            '_id' : pDatosConvenio[0],
            'nombre' : pDatosConvenio[1],
            'descripcion' : pDatosConvenio[2],
            'activo' : pDatosConvenio[3]
        }
    });

    peticion.done(function(response){
        console.log('El convenio se registró con éxito');
    });
    
    peticion.fail(function(){
        console.log('El convenio no se pudo registrar');
    })
}

function guardarConvenio(pDatosConvenio){

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_convenio',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async:false,
        data:{
            'nombre' : pDatosConvenio[0],
            'descripcion' : pDatosConvenio[1],
            'activo' : pDatosConvenio[2]
        }
    });

    peticion.done(function(response){
        console.log('El convenio se registró con éxito');
    });
    
    peticion.fail(function(){
        console.log('El convenio no se pudo registrar');
    })
}

function obtenerConveniosbd(){
    let listaConvenios = [];

    let peticion = $.ajax({
      url: 'http://localhost:4000/api/listar_conv',
      type: 'get',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      dataType : 'json',
      async:false,
      data:{}
    });
  
    peticion.done(function(convenios){
  
      for(let i = 0; i < convenios.length; i++){
        listaConvenios.push(convenios[i]);
      }
  
      console.log('Petición realizada con éxito');
    });
  
    peticion.fail(function(){
        listaConvenios = [];
      console.log('Ocurrió un error');
    });
  
    console.log(listaConvenios);
    
    return listaConvenios;
}
